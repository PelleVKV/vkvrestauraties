export default async function sitemap() {
    const res = await fetch(`${process.env.NEXT_PORTFOLIO_MANAGER_IP}/api/public/vkvrestauraties`);
    const { folders } = await res.json();

    const projectUrls = folders
        .filter(f => f.folder !== "banner" && f.folder !== "aboutme")
        .map(f => ({
            url: `https://vkvrestauraties.nl/projectpage/${encodeURIComponent(f.projectName || f.folder)}`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        }));

    return [
        { url: "https://vkvrestauraties.nl", lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
        { url: "https://vkvrestauraties.nl/projects", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
        { url: "https://vkvrestauraties.nl/about", lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
        { url: "https://vkvrestauraties.nl/map", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
        ...projectUrls,
    ];
}