"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("@/components/MapClient"), {
    ssr: false,
});

export default function MapPage() {
    const [projectData, setProjectData] = useState([]);
    const [extraData, setExtraData] = useState([]);

    useEffect(() => {
        async function loadData() {
            const res = await fetch(
                "/api/folders?bucket=vkvrestauraties-images",
            );
            const data = await res.json();
            setProjectData(data.folders || []);
        }

        async function loadExtra() {
            const res = await fetch("/extra-project-info.json");
            const data = await res.json();
            setExtraData(data);
        }

        loadData();
        loadExtra();
    }, []);

    return (
        <div className="h-screen w-full">
            <MapClient projectData={projectData} extraData={extraData} />
        </div>
    );
}
