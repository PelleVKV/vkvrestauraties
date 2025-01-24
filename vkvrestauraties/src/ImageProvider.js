import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context
const ImageContext = createContext();

// Create a provider component
export const ImageProvider = ({ children }) => {
    const [projectData, setProjectData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the data from the backend API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/folders'); // Change this URL if necessary
                const data = await response.json();

                const transformedData = data.folders.map(folder => ({
                    title: folder.metadata?.title || 'banner',
                    desc: folder.metadata?.desc || 'No description available',
                    images: folder.images,
                    banner: folder.metadata?.header_img || '',
                    lat: folder.metadata?.latlng.split(',')[0] || 0,
                    lng: folder.metadata?.latlng.split(',')[1] || 0,
                }));

                setProjectData(transformedData);
            } catch (err) {
                setError('Failed to fetch folder data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <ImageContext.Provider value={{ projectData, loading, error }}>
            {children}
        </ImageContext.Provider>
    );
};

// Create a custom hook to use the context
export const useImageData = () => {
    return useContext(ImageContext);
};
