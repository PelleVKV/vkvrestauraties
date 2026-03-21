"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Spin } from "antd";
import Image from "next/image";

export default function ProjectPage() {
    const { slug } = useParams();

    const [projectImages, setProjectImages] = useState(null);
    const [imageIndex, setImageIndex] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProject() {
            try {
                const res = await fetch("/api/folders?bucket=vkvrestauraties-images");
                const data = await res.json();

                const project = data.folders.find(
                    (p) => p.title === decodeURIComponent(slug)
                );

                if (project) {
                    const filtered = project.images.filter(
                        (img) => img.split("/")[1] !== ""
                    );

                    setProjectImages(filtered);
                }
            } finally {
                setLoading(false);
            }
        }

        loadProject();
    }, [slug]);

    const handleNext = () => {
        setImageIndex((prev) => (prev + 1) % projectImages.length);
    };

    const handlePrevious = () => {
        setImageIndex((prev) =>
            (prev - 1 + projectImages.length) % projectImages.length
        );
    };

    if (loading || !projectImages || projectImages.length === 0) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="flex flex-col space-y-8 justify-center items-center w-full h-screen">

            {/* IMAGE VIEWER */}
            <div className="flex justify-center overflow-hidden items-center w-full lg:w-3/4 h-3/5">

                {/* LEFT ARROW */}
                <div
                    className="flex items-center cursor-pointer hover:bg-white/10 h-full px-2"
                    onClick={handlePrevious}
                >
                    <svg viewBox="0 0 24 24" fill="white" width="64" height="64">
                        <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
                    </svg>
                </div>

                {/* IMAGE */}
                <div className="relative w-full h-full">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_S3_URL}${projectImages[imageIndex]}`}
                        alt="project"
                        fill
                        className="object-contain select-none"
                        sizes="100vw"
                        priority
                    />
                </div>

                {/* RIGHT ARROW */}
                <div
                    className="flex items-center cursor-pointer hover:bg-white/10 h-full px-2"
                    onClick={handleNext}
                >
                    <svg viewBox="0 0 24 24" fill="white" width="64" height="64">
                        <path d="M8.59 16.59L13.17 12l-4.58-4.59L10 6l6 6-6 6z" />
                    </svg>
                </div>

            </div>

            {/* INDICATOR DOTS */}
            <div className="hidden lg:flex justify-center w-full h-4 space-x-1">
                {projectImages.map((_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 bg-white rounded-full transition-opacity duration-300 ${
                            index === imageIndex ? "opacity-100" : "opacity-25"
                        }`}
                    />
                ))}
            </div>

        </div>
    );
}