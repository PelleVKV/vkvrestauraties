import {
    S3Client,
    ListObjectsV2Command,
    GetObjectCommand,
} from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const s3 = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Simple in-memory cache (works in dev / non-serverless environments)
let folderCache = null;
let cacheTimestamp = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function streamToBuffer(stream) {
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks);
}

async function getFilesInFolder(folderName, bucket) {
    const { Contents } = await s3.send(
        new ListObjectsV2Command({
            Bucket: bucket,
            Prefix: folderName,
        }),
    );

    const images = [];
    let metadata = null;

    Contents?.forEach((file) => {
        const fileName = file.Key.split("/").pop();
        if (!fileName) return;

        if (fileName === "metadata.json") {
            metadata = file;
        } else {
            images.push(file.Key);
        }
    });

    return { images, metadata };
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const bucket = searchParams.get("bucket");

        if (!bucket) {
            return NextResponse.json(
                { error: "Bucket name is required as query parameter." },
                { status: 400 },
            );
        }

        const now = Date.now();

        if (folderCache && now - cacheTimestamp < CACHE_TTL) {
            return NextResponse.json({ folders: folderCache });
        }

        const { CommonPrefixes } = await s3.send(
            new ListObjectsV2Command({
                Bucket: bucket,
                Delimiter: "/",
            }),
        );

        const uniqueFolders =
            CommonPrefixes?.map((prefix) => prefix.Prefix.replace(/\/$/, "")) ||
            [];

        const foldersData = await Promise.all(
            uniqueFolders.map(async (folder) => {
                const { images, metadata } = await getFilesInFolder(
                    folder,
                    bucket,
                );

                let metadataContent = null;

                if (metadata) {
                    const metadataData = await s3.send(
                        new GetObjectCommand({
                            Bucket: bucket,
                            Key: metadata.Key,
                        }),
                    );

                    const metadataBuffer = await streamToBuffer(
                        metadataData.Body,
                    );

                    metadataContent = JSON.parse(metadataBuffer.toString());
                }

                return {
                    folder,
                    title: metadataContent?.title || folder,
                    images,
                    metadata: metadataContent,
                };
            }),
        );

        folderCache = foldersData;
        cacheTimestamp = now;

        return NextResponse.json({ folders: foldersData });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
