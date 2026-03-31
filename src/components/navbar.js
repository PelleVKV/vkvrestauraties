"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lexend } from "next/font/google";
import { useState } from "react";

const lexend = Lexend({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    display: "swap",
});

const links = [
    { href: "/", label: "VKVRESTAURATIES" },
    { href: "/projects", label: "PROJECTS" },
    { href: "/about", label: "ABOUT US" },
    { href: "/map", label: "MAP" },
    { href: "/contact", label: "CONTACT" },
];

export default function Navbar() {
    const pathname = usePathname();
    const isMap = pathname === "/map";
    const [menuOpen, setMenuOpen] = useState(false);

    const textColor = isMap ? "text-[#fd230b]" : "text-white";

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-2000 text-sm py-8 px-8 lg:px-16 flex justify-between items-center ${lexend.className} ${textColor}`}
        >
            {/* Desktop nav */}
            <div className="hidden md:flex gap-2 items-center">
                {links.map((link, i) => (
                    <span key={link.href} className="flex items-center gap-2">
                        <NavLink href={link.href}>{link.label}</NavLink>
                        {i < links.length - 1 && <p>/</p>}
                    </span>
                ))}
            </div>

            {/* Mobile: brand name + hamburger */}
            <div className="flex md:hidden w-full justify-between items-center">
                <NavLink href="/">VKVRESTAURATIES</NavLink>

                <button
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="flex flex-col gap-1.5 cursor-pointer"
                    aria-label="Toggle menu"
                >
                    <span
                        className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                            menuOpen ? "rotate-45 translate-y-2" : ""
                        }`}
                    />
                    <span
                        className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                            menuOpen ? "opacity-0" : ""
                        }`}
                    />
                    <span
                        className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                            menuOpen ? "-rotate-45 -translate-y-2" : ""
                        }`}
                    />
                </button>
            </div>

            {/* Mobile dropdown menu */}
            {menuOpen && (
                <div
                    className={`absolute top-full left-0 w-full flex flex-col gap-6 px-8 py-8 md:hidden bg-black/80 backdrop-blur-sm ${textColor}`}
                >
                    {links.slice(1).map((link) => (
                        <NavLink
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    );
}

function NavLink({ href, children, onClick }) {
    return (
        <Link href={href} className="relative group" onClick={onClick}>
            {children}
            <span
                className="
                    absolute
                    left-1/2
                    -bottom-0.5
                    h-0.5
                    w-0
                    bg-red-600
                    transition-all
                    duration-500
                    ease-out
                    -translate-x-1/2
                    group-hover:w-full
                "
            />
        </Link>
    );
}
