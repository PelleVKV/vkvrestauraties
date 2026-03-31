"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

export default function Home() {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        async function fetchImages() {
            const res = await fetch(
                `/api/folders?bucket=${process.env.NEXT_PUBLIC_BUCKET_NAME}`,
            );
            const data = await res.json();

            const bannerFolder = data.folders.find(
                (f) => f.folder === "banner",
            );

            if (bannerFolder) {
                setImages(bannerFolder.images);
            }
        }

        fetchImages();
    }, []);

    const goNext = useCallback(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, [images.length]);

    const goPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }, [images.length]);

    useEffect(() => {
        if (images.length === 0) return;

        const interval = setInterval(goNext, 7000);
        return () => clearInterval(interval);
    }, [images, goNext]);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [goNext, goPrev]);

    return (
        <div className="relative w-screen h-screen overflow-hidden inset-0">
            {images.map((img, index) => (
                <Image
                    key={img}
                    src={`https://vkvrestauraties-images.s3.eu-north-1.amazonaws.com/${img}`}
                    alt="Banner"
                    fill
                    priority={index === 0}
                    className={`object-cover transition-opacity duration-1000 ${
                        index === currentIndex ? "opacity-100" : "opacity-0"
                    }`}
                />
            ))}

            {/* Left arrow */}
            <button
                onClick={goPrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-10 text-white/60 hover:text-white transition-colors duration-200"
                aria-label="Previous image"
            >
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="15 18 9 12 15 6" />
                </svg>
            </button>

            {/* Right arrow */}
            <button
                onClick={goNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-10 text-white/60 hover:text-white transition-colors duration-200"
                aria-label="Next image"
            >
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </button>

            {/* Dot indicators */}
            {images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                i === currentIndex
                                    ? "bg-white scale-125"
                                    : "bg-white/40"
                            }`}
                            aria-label={`Go to image ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
