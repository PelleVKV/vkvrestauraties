import React from "react";
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import {useImageData} from "../ImageProvider";
import {Link} from "react-router-dom";

const Map = () => {
    const {projectData, loading, error} = useImageData();
    const position = [52.368426, 4.899055]

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
                    <Marker key={project.title} position={[project.lat, project.lng]}>
                        <Popup>
                            { project.title }
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default Map;
