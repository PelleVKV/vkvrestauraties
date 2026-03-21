"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        async function fetchImages() {
            const res = await fetch(`/api/folders?bucket=${process.env.NEXT_PUBLIC_BUCKET_NAME}`);
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

    useEffect(() => {
        if (images.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) =>
                prev === images.length - 1 ? 0 : prev + 1,
            );
        }, 15000); // change every 5 seconds

        return () => clearInterval(interval);
    }, [images]);

    return (
        <div className="relative w-screen h-screen overflow-hidden">
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
        </div>
    );
}
