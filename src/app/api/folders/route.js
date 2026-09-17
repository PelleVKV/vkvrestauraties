import { NextResponse } from "next/server";

// Small per-project memory cache. The HTTP cache headers below allow the
// platform CDN to keep this fast across server instances as well.
const folderCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);

        const project = searchParams.get("project");
        const host =
            process.env.PORTFOLIO_MANAGER_URL ||
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

        const cached = folderCache.get(project);
        if (cached && now - cached.timestamp < CACHE_TTL) {
            return NextResponse.json(
                { folders: cached.folders },
                { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } },
            );
        }

        const res = await fetch(`${host}/api/public/${project}?includePolygons=0`, {
            next: { revalidate: 300 },
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
            images: f.images.map((img) => img.url),
            thumbnails: f.images.map((img) => img.thumbnailUrl || img.url),
            metadata: {
                title: f.projectName || f.folder,
                bannerImage: f.bannerImage || null,
                bannerThumbnail: f.bannerThumbnail || null,
                folder: f.folder,
                // Combine lat/lng into the comma-separated string MapClient expects
                ...(f.lat != null && f.lng != null
                    ? { latlng: `${f.lat},${f.lng}` }
                    : {}),
            },
        }));

        folderCache.set(project, { folders: foldersData, timestamp: now });

        return NextResponse.json(
            { folders: foldersData },
            { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } },
        );
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
