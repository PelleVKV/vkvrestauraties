import React, {useEffect, useState} from "react";
import {useImageData} from '../ImageProvider';
import {Spin} from "antd";

const Home = () => {
    const {projectData, loading, error} = useImageData();
    const [currentImageIndex, setCurrentImageIndex] = useState(1);

    const images = projectData.find(project => project.title === "banner")?.images || [];

    // Effect to change the image every 3 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 20000); // Change image every 20 seconds

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [images]);

    if (loading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <Spin size="large"/>
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full h-full flex justify-center items-center text-2xl text-red-800">
                <p>Error: {error}</p>
            </div>
        )
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            {images.length > 0 && (
                <img
                    src={`${process.env.REACT_APP_S3_URL}${images[currentImageIndex]}`}
                    alt="banner"
                    loading="lazy"
                    className="w-full h-full object-cover animate-fade-in"
                />
            )}
        </div>
    );
}

const LoadingSpinner = () => (
    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current
                border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden
                    !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
    </div>
);

export default Home;
