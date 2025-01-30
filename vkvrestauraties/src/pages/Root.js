import React, {useState} from "react";
import {Link, Outlet, useLocation} from "react-router-dom";
import {MenuOutlined} from "@ant-design/icons";

const Root = () => {
    const route = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    }

    return (
        <div className="w-screen h-screen font-sans bg-black select-none overflow-hidden">
            <div className={`absolute hidden sm:hidden md:hidden lg:flex space-x-2 w-1/2 h-24 py-10 z-20 justify-center 
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

            <div className={`flex flex-col fixed lg:hidden top-0 left-0 w-full h-full text-xl text-white z-50`}>

                <div className="flex justify-between w-full px-4 h-12 items-center bg-gray-400/50">
                    <Link to="/">VKV RESTAURATIES</Link>
                    <MenuOutlined onClick={toggleCollapse}/>
                </div>

                <div className={`w-full h-full justify-center items-center 
                ${collapsed ? 'flex pointer-events-auto opacity-100' : 'hidden opacity-0 pointer-events-none'} bg-gray-400/50`}>
                    <div className="flex flex-col h-3/4 justify-center items-center text-center text-xl space-y-6">
                        <Link to="/projects" onClick={toggleCollapse}>PROJECTS</Link>
                        <Link to="/aboutme" onClick={toggleCollapse}>ABOUT ME</Link>
                        <Link to="/map" onClick={toggleCollapse}>MAP</Link>
                        <Link to="/contact" onClick={toggleCollapse}>CONTACT</Link>
                    </div>
                </div>
            </div>

            <Outlet/>
        </div>
    );
}

export default Root;
