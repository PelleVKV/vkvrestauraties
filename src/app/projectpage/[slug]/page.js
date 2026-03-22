"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { Spin } from "antd";
import Image from "next/image";

export default function ProjectPage() {
    const { slug } = useParams();

    const [projectImages, setProjectImages] = useState(null);
    const [imageIndex, setImageIndex] = useState(1);
    const [loading, setLoading] = useState(true);
    const [fullscreen, setFullscreen] = useState(false);

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

    const handleNext = useCallback(() => {
        setImageIndex((prev) => (prev + 1) % projectImages.length);
    }, [projectImages]);

    const handlePrevious = useCallback(() => {
        setImageIndex((prev) =>
            (prev - 1 + projectImages.length) % projectImages.length
        );
    }, [projectImages]);

    // Keyboard navigation
    useEffect(() => {
        if (!fullscreen) return;
        const handleKey = (e) => {
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrevious();
            if (e.key === "Escape") setFullscreen(false);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [fullscreen, handleNext, handlePrevious]);

    // Lock body scroll when fullscreen
    useEffect(() => {
        document.body.style.overflow = fullscreen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [fullscreen]);

    if (loading || !projectImages || projectImages.length === 0) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <Spin size="large" />
            </div>
        );
    }

    const ArrowLeft = ({ onClick }) => (
        <div
            className="flex items-center cursor-pointer hover:bg-white/10 h-full px-2 z-10"
            onClick={(e) => { e.stopPropagation(); onClick(); }}
        >
            <svg viewBox="0 0 24 24" fill="white" width="64" height="64">
                <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
            </svg>
        </div>
    );

    const ArrowRight = ({ onClick }) => (
        <div
            className="flex items-center cursor-pointer hover:bg-white/10 h-full px-2 z-10"
            onClick={(e) => { e.stopPropagation(); onClick(); }}
        >
            <svg viewBox="0 0 24 24" fill="white" width="64" height="64">
                <path d="M8.59 16.59L13.17 12l-4.58-4.59L10 6l6 6-6 6z" />
            </svg>
        </div>
    );

    const Dots = () => (
        <div className="flex justify-center w-full space-x-1">
            {projectImages.map((_, index) => (
                <div
                    key={index}
                    onClick={() => setImageIndex(index)}
                    className={`w-2 h-2 bg-white rounded-full cursor-pointer transition-opacity duration-300 ${
                        index === imageIndex ? "opacity-100" : "opacity-25"
                    }`}
                />
            ))}
        </div>
    );

    return (
        <>
            {/* NORMAL VIEW */}
            <div className="flex flex-col space-y-8 justify-center items-center w-full h-screen">
                <div className="flex justify-center overflow-hidden items-center w-full lg:w-3/4 h-3/5">
                    <ArrowLeft onClick={handlePrevious} />

                    {/* Clicking the image opens fullscreen */}
                    <div
                        className="relative w-full h-full cursor-zoom-in"
                        onClick={() => setFullscreen(true)}
                    >
                        <Image
                            src={`${process.env.NEXT_PUBLIC_S3_URL}${projectImages[imageIndex]}`}
                            alt="project"
                            fill
                            className="object-contain select-none"
                            sizes="100vw"
                            priority
                        />
                    </div>

                    <ArrowRight onClick={handleNext} />
                </div>

                <div className="hidden lg:flex justify-center w-full h-4">
                    <Dots />
                </div>
            </div>

            {/* FULLSCREEN OVERLAY */}
            {fullscreen && (
                <div
                    className="fixed inset-0 z-[9999] bg-black flex flex-col justify-center items-center"
                    onClick={() => setFullscreen(false)}
                >
                    {/* Close button */}
                    <button
                        className="absolute top-6 right-6 text-white text-3xl cursor-pointer hover:opacity-70 transition-opacity z-15"
                        onClick={() => setFullscreen(false)}
                    >
                        ✕
                    </button>

                    {/* Counter */}
                    <p className="absolute top-6 left-6 text-white text-sm opacity-60 z-10">
                        {imageIndex + 1} / {projectImages.length}
                    </p>

                    {/* Image + arrows */}
                    <div
                        className="flex items-center justify-center w-full h-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ArrowLeft onClick={handlePrevious} />

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

                        <ArrowRight onClick={handleNext} />
                    </div>

                    {/* Dots */}
                    <div className="absolute bottom-6 w-full">
                        <Dots />
                    </div>
                </div>
            )}
        </>
    );
}