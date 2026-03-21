"use client";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRouter } from "next/navigation";

const parseLatLng = (latlng) => latlng.split(",").map(Number);

export default function MapClient({ projectData, extraData }) {
    const router = useRouter();

    const position = [52.368426, 4.899055];

    const redIcon = L.icon({
        iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
    });

    const blueIcon = L.icon({
        iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
    });

    return (
        <MapContainer
            center={position}
            zoom={14}
            scrollWheelZoom={true}
            style={{ width: "100%", height: "100%" }}
            zoomControl={false}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {projectData
                .filter((p) => p.metadata?.latlng)
                .map((project) => {
                    const coords = parseLatLng(project.metadata.latlng);

                    return (
                        <Marker
                            key={project.title}
                            position={coords}
                            icon={blueIcon}
                            eventHandlers={{
                                click: () =>
                                    router.push(`/projectpage/${project.title}`),
                            }}
                        />
                    );
                })}

            {extraData
                .filter((p) => p.latlng)
                .map((project) => {
                    const coords = parseLatLng(project.latlng);

                    return (
                        <Marker
                            key={project.name}
                            position={coords}
                            icon={redIcon}
                        />
                    );
                })}
        </MapContainer>
    );
}
