import React, {useEffect, useState} from "react";
import {useImageData} from "../ImageProvider";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {Spin} from "antd";

const ProjectPage = () => {
    const {projectData, loading, error} = useImageData();
    const [projectImages, setProjectImages] = useState(null);
    const [imageIndex, setImageIndex] = useState(1);

    useEffect(() => {
        const path = window.location.pathname;
        const projectName = decodeURIComponent(path.split('/').pop());
        const project = projectData.find(project => project.title === projectName);

        if (project) {
            const images = project?.images;
            const filteredImages = images.filter(image => image.split('/')[1] !== '');
            setProjectImages(filteredImages);
        }
    }, [projectData]);

    const handleNext = () => {
        if (projectImages) {
            setImageIndex((prevIndex) => (prevIndex + 1) % projectImages.length);
        }
    };

    const handlePrevious = () => {
        if (projectImages) {
            setImageIndex((prevIndex) =>
                (prevIndex - 1 + projectImages.length) % projectImages.length
            );
        }
    };

    const loadProjectCircles = () => {
        if (!projectImages) return null;

        return projectImages.map((_, index) => (
            <div
                key={index}
                className={`w-2 h-2 bg-white rounded-full transition-opacity duration-300 ${
                    index === imageIndex ? "opacity-100" : "opacity-25"
                }`}
            />
        ));
    }

    if (loading || !projectImages || projectImages.length === 0) {
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
        <div className="flex flex-col space-y-8 justify-center items-center w-full h-full">
            <div className="flex justify-center overflow-hidden items-center w-full lg:w-3/4 h-3/5">
                <div className="flex items-center cursor-pointer hover:bg-gray-100 hover:bg-opacity-15 h-full"
                     onClick={handlePrevious}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="white"
                        width="64"
                        height="64"
                    >
                        <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/>
                    </svg>
                </div>
                <LazyLoadImage
                    src={`${process.env.REACT_APP_S3_URL}${projectImages[imageIndex]}`}
                    alt="project"
                    className="w-full h-full object-contain select-none"
                    loading="lazy"
                    effect="blur"
                    placeholderSrc="https://user-images.githubusercontent.com/20684618/31289519-9ebdbe1a-aae6-11e7-8f82-bf794fdd9d1a.png"
                />
                <div className="flex items-center cursor-pointer hover:bg-gray-100 hover:bg-opacity-15 h-full"
                     onClick={handleNext}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="white"
                        width="64"
                        height="64"
                    >
                        <path d="M8.59 16.59L13.17 12l-4.58-4.59L10 6l6 6-6 6z"/>
                    </svg>
                </div>
            </div>

            <div className="hidden lg:flex justify-center w-full h-4 space-x-1">
                {loadProjectCircles()}
            </div>
        </div>
    );
};

export default ProjectPage;
