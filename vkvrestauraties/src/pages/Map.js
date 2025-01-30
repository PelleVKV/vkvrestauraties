import React, {useEffect, useState} from "react";
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import L from 'leaflet';
import {useImageData} from "../ImageProvider";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

const Map = () => {
    const {projectData, loading, error} = useImageData();
    const position = [52.368426, 4.899055]
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const redIcon = L.icon({
        iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", // Red marker icon
        iconSize: [32, 32], // Adjust size if needed
        iconAnchor: [16, 32], // Center point of icon
        popupAnchor: [0, -32] // Popup positioning
    });

    const blueIcon = L.icon({
        iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Red marker icon
        iconSize: [32, 32], // Adjust size if needed
        iconAnchor: [16, 32], // Center point of icon
        popupAnchor: [0, -32] // Popup positioning
    });

    useEffect(() => {
        fetch("/extra-project-info.json")  // Fetch from the root of the public folder
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error("Error fetching data: ", error));
    }, []);

    console.log(data);

    return (
        <div className="h-full w-full">
            <MapContainer center={position}
                          zoom={14}
                          scrollWheelZoom={true}
                          style={{width: '100%', height: '100%', zIndex: '10'}}
                          zoomControl={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {projectData.map(project => (
                    <Marker key={project.title}
                            position={[project.lat, project.lng]}
                            icon={blueIcon}
                            eventHandlers={{
                                click: () => navigate(`/project/${project.title}`),
                            }}>
                    </Marker>
                ))}
                {data.map(project => (
                    <Marker key={project.name}
                            position={[project.lat, project.lng]}
                            icon={redIcon}>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default Map;
