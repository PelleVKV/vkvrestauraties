import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css';
import { ImageProvider } from "./ImageProvider";

import Root from "./pages/Root";
import Home from "./pages/Home";
import Map from "./pages/Map";
import AboutMe from "./pages/AboutMe";
import Projects from "./pages/Projects";
import ProjectPage from "./pages/ProjectPage";
import Contact from "./pages/Contact";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/aboutme',
                element: <AboutMe/>
            },
            {
                path: '/projects',
                element: <Projects/>
            },
            {
                path: '/project/:projectName',
                element: <ProjectPage/>
            },
            {
                path: '/map',
                element: <Map/>
            },
            {
                path: '/contact',
                element: <Contact />
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ImageProvider>
            <RouterProvider router={router}/>
        </ImageProvider>
    </React.StrictMode>
);
