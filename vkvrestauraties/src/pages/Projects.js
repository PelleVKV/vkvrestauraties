import React, {useEffect, useState} from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {useImageData} from "../ImageProvider";
import {Link} from "react-router-dom";
import { Spin } from 'antd';

const Projects = () => {
    const {projectData, loading, error} = useImageData();
    const [projects, setProjects] = useState([]);

    // Filter projects on initial load to exclude 'banner'
    useEffect(() => {
        const filteredProjects = projectData.filter(project => project.title !== 'banner');
        setProjects(filteredProjects);
    }, [projectData]);

    if (loading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <Spin size="large"/>
            </div>
        )
    } else if (error) {
        return (
            <div className="w-full h-full flex justify-center items-center text-2xl text-red-800">
                <p>Error: {error}</p>
            </div>
        )
    } else {
        return (
            <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 overflow-y-scroll">
                {projects.map(project => (
                    <Link to={`/project/${project.title}`} key={project.title} className="relative h-64
                group cursor-pointer overflow-hidden">
                        <LazyLoadImage src={`${process.env.REACT_APP_S3_URL}${project.banner}`}
                                       alt="project"
                                       className="w-full h-full object-cover"
                                       loading="lazy"
                                       effect="blur"
                                       width="100%"
                                       height="100%"
                                       placeholderSrc="https://user-images.githubusercontent.com/20684618/31289519-9ebdbe1a-aae6-11e7-8f82-bf794fdd9d1a.png"/>
                        <div className="hidden absolute bottom-0 w-full bg-white
                    justify-center group-hover:flex animate-slide-in">
                            <p className="text-sm bottom-0 font-extrabold z-15 text-red-800">
                                {project?.title.toUpperCase() || ''}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        )
    }
}

export default Projects;
