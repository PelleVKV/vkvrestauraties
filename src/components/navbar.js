"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lexend } from "next/font/google";

const lexend = Lexend({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    display: "swap",
});

export default function Navbar() {
    const pathname = usePathname();

    const isMap = pathname === "/map";
    
    return (
        <nav
            className={`fixed top-0 left-0 w-full z-2000 text-sm py-8 px-16 flex justify-between ${lexend.className} ${
                isMap ? "text-[#fd230b]" : "text-white"
            }`}
        >
            <div className="flex gap-2">
                <NavLink href="/">VKVRESTAURATIES</NavLink>
                <p>/</p>
                <NavLink href="/projects">PROJECTS</NavLink>
                <p>/</p>
                <NavLink href="/about">ABOUT ME</NavLink>
                <p>/</p>
                <NavLink href="/map">MAP</NavLink>
                <p>/</p>
                <NavLink href="/contact">CONTACT</NavLink>
            </div>
        </nav>
    );
}

function NavLink({ href, children }) {
    return (
        <Link href={href} className="relative group">
            {children}

            {/* Animated underline */}
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
