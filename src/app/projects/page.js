"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function loadProjects() {
            const res = await fetch(
                "/api/folders?bucket=vkvrestauraties-images",
            );
            const data = await res.json();

            const formatted = data.folders
                .filter((folder) => folder.folder !== "banner" && folder.folder !== "aboutme") // exclude banner and aboutme folders
                .map((folder) => {
                    const banner = folder.images.find((img) =>
                        img.endsWith("banner.webp"),
                    );

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {projects.map((project) => (
                    <Link
                        key={project.title}
                        href={`/projectpage/${encodeURIComponent(project.title)}`}
                        className="relative aspect-square overflow-hidden group block"
                    >
                        {project.banner && (
                            <Image
                                src={`https://vkvrestauraties-images.s3.eu-north-1.amazonaws.com/${project.banner}`}
                                alt={project.title || project.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        )}

                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                            {project.title}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
