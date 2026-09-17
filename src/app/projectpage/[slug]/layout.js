export async function generateMetadata({ params }) {
    const { slug } = await params;
    const name = decodeURIComponent(slug);
    return {
        title: name,
        description: `Bekijk het restauratieproject ${name} uitgevoerd door VKV Restauraties in Amsterdam.`,
        alternates: { canonical: `https://vkvrestauraties.nl/projectpage/${slug}` },
        openGraph: {
            title: `${name} | VKV Restauraties`,
            type: "article",
        },
    };
}

export default function ProjectLayout({ children }) {
    return children;
}
