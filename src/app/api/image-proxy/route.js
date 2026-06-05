import { NextResponse } from "next/server";

// Proxies image requests to the Portfolio Manager so the browser
// never makes a cross-origin request.
// Usage: /api/image-proxy?url=<encoded Portfolio Manager image URL>

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url) {
        return new NextResponse("Missing url param", { status: 400 });
    }

    // Only allow requests to the configured Portfolio Manager host
    const allowedHost = process.env.NEXT_PORTFOLIO_MANAGER_IP
        ?.replace(/^https?:\/\//, "")
        .split(":")[0];

    try {
        const parsed = new URL(url);
        if (
            allowedHost &&
            parsed.hostname !== allowedHost &&
            parsed.hostname !== "localhost"
        ) {
            return new NextResponse("Forbidden", { status: 403 });
        }
    } catch {
        return new NextResponse("Invalid url", { status: 400 });
    }

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
        return new NextResponse("Image not found", { status: 404 });
    }

    const buffer = await res.arrayBuffer();
    const contentType = res.headers.get("Content-Type") || "image/jpeg";

    return new NextResponse(buffer, {
        headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=86400",
        },
    });
}