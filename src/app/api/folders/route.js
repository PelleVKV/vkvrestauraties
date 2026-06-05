import { NextResponse } from "next/server";

// Simple in-memory cache
let folderCache = null;
let cacheTimestamp = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function proxyUrl(imageUrl) {
    return `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`;
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);

        const project = searchParams.get("project");
        const host =
            process.env.NEXT_PUBLIC_PORTFOLIO_MANAGER_IP ||
            "http://localhost:3000";
        if (!project) {
            return NextResponse.json(
                {
                    error: "Project name is required as query parameter (?project=).",
                },
                { status: 400 },
            );
        }

        const now = Date.now();

        if (folderCache && now - cacheTimestamp < CACHE_TTL) {
            return NextResponse.json({ folders: folderCache });
        }

        const res = await fetch(`${host}/api/public/${project}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            const err = await res
                .json()
                .catch(() => ({ error: res.statusText }));
            return NextResponse.json(
                { error: err.error || "Portfolio Manager request failed" },
                { status: res.status },
            );
        }

        const { folders: pmFolders } = await res.json();

        const foldersData = pmFolders.map((f) => ({
            folder: f.folder,
            title: f.projectName || f.folder,
            images: f.images.map((img) => proxyUrl(img.url)),
            metadata: {
                title: f.projectName || f.folder,
                bannerImage: f.bannerImage ? proxyUrl(f.bannerImage) : null,
                folder: f.folder,
                // Combine lat/lng into the comma-separated string MapClient expects
                ...(f.lat != null && f.lng != null
                    ? { latlng: `${f.lat},${f.lng}` }
                    : {}),
            },
        }));

        folderCache = foldersData;
        cacheTimestamp = now;

        return NextResponse.json({ folders: foldersData });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
