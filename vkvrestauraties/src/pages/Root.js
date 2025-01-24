import React from "react";
import {Link, Outlet, useLocation} from "react-router-dom";

const Root = () => {
    const route = useLocation();

    return (
        <div className="w-screen h-screen font-sans bg-black select-none overflow-hidden">
            <div className={`absolute flex space-x-2 w-1/2 h-24 px-16 py-10 z-20 justify-center 
            ${route.pathname === '/map' ? 'text-red-800 font-extrabold' : 'text-white'}`}>
                <Link to="/" className="relative inline-block text-sm font-medium after:absolute
                        after:left-1/2 after:top-6 after:h-[2px] after:w-0
                        after:bg-red-600 after:transition-all after:duration-300 after:origin-center
                        hover:after:w-full hover:after:left-0 cursor-pointer">
                    VKV RESTAURATIES</Link>
                <p className="font-extralight">/</p>
                <Link to="/projects" className="relative inline-block text-sm font-medium after:absolute
                        after:left-1/2 after:top-6 after:h-[2px] after:w-0
                        after:bg-red-600 after:transition-all after:duration-300 after:origin-center
                        hover:after:w-full hover:after:left-0 cursor-pointer">
                    PROJECTS
                </Link>
                <p className="font-extralight">/</p>
                <Link to="/aboutme" className="relative inline-block text-sm font-medium after:absolute
                        after:left-1/2 after:top-6 after:h-[2px] after:w-0
                        after:bg-red-600 after:transition-all after:duration-300 after:origin-center
                        hover:after:w-full hover:after:left-0 cursor-pointer">
                    ABOUT ME</Link>
                <p className="font-extralight">/</p>
                <Link to="/map" className="relative inline-block text-sm font-medium after:absolute
                        after:left-1/2 after:top-6 after:h-[2px] after:w-0
                        after:bg-red-600 after:transition-all after:duration-300 after:origin-center
                        hover:after:w-full hover:after:left-0 cursor-pointer">
                    MAP</Link>
                <p className="font-extralight">/</p>
                <Link to="/contact" className="relative inline-block text-sm font-medium after:absolute
                        after:left-1/2 after:top-6 after:h-[2px] after:w-0
                        after:bg-red-600 after:transition-all after:duration-300 after:origin-center
                        hover:after:w-full hover:after:left-0 cursor-pointer">
                    CONTACT</Link>
            </div>

            <Outlet/>
        </div>
    );
}

export default Root;
