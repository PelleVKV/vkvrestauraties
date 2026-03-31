import "./globals.css";
import Navbar from "@/components/navbar";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`min-h-screen bg-black text-white antialiased`}>
				<Navbar />
                {children}
            </body>
            <SpeedInsights />
        </html>
    );
}