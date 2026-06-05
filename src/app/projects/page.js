"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Projecten",
    description: "Bekijk onze restauratieprojecten in Amsterdam — van funderingsherstel tot monumentaal stukwerk.",
    alternates: { canonical: "https://vkvrestauraties.nl/projects" },
};

export default function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function loadProjects() {
            const res = await fetch(
                "/api/folders?project=vkvrestauraties",
            );
            const data = await res.json();

            const formatted = data.folders
                .filter(
                    (folder) =>
                        folder.folder !== "banner" &&
                        folder.folder !== "aboutme",
                )
                .map((folder) => {
                    // Banner image is now a full URL from metadata.bannerImage,
                    // falling back to the first image in the folder.
                    const banner =
                        folder.metadata?.bannerImage || folder.images[0] || null;
                    return {
                        title: folder.title,
                        slug: folder.folder,
                        banner,
                    };
                });

            setProjects(formatted);
        }

        loadProjects();
    }, []);

    return (
        <div className="p-8 mt-12">
            <div className="flex flex-wrap justify-center gap-6">
                {projects.map((project) => (
                    <Link
                        key={project.title}
                        href={`/projectpage/${encodeURIComponent(project.title)}`}
                        className="relative overflow-hidden group block"
                        style={{
                            width: "calc((100% - 4 * 1.5rem) / 5)",
                            minWidth: "180px",
                            aspectRatio: "1 / 1",
                        }}
                    >
                        {project.banner && (
                            <Image
                                src={project.banner}
                                alt={project.title || project.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        )}
                        <div className="absolute inset-0 bg-black/30 capitalize opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                            {project.title}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}