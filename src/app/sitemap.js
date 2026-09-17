export default async function sitemap() {
    const host = process.env.PORTFOLIO_MANAGER_URL || process.env.NEXT_PUBLIC_PORTFOLIO_MANAGER_IP || "http://localhost:3000";
    let projectUrls = [];
    try {
        const res = await fetch(`${host}/api/public/vkvrestauraties?includePolygons=0`, {
            next: { revalidate: 300 },
        });
        if (!res.ok) throw new Error(`Portfolio API returned ${res.status}`);
        const { folders = [] } = await res.json();
        projectUrls = folders
            .filter(f => f.folder !== "banner" && f.folder !== "aboutme")
            .map(f => ({
                url: `https://vkvrestauraties.nl/projectpage/${encodeURIComponent(f.projectName || f.folder)}`,
                lastModified: new Date(),
                changeFrequency: "monthly",
                priority: 0.8,
            }));
    } catch (error) {
        console.warn("Portfolio projects could not be added to the sitemap during this build", error);
    }

    return [
        { url: "https://vkvrestauraties.nl", lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
        { url: "https://vkvrestauraties.nl/projects", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
        { url: "https://vkvrestauraties.nl/about", lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
        { url: "https://vkvrestauraties.nl/map", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
        ...projectUrls,
    ];
}
