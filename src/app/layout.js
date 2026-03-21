import "./globals.css";
import Navbar from "@/components/navbar";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`min-h-screen bg-black text-white antialiased`}>
				<Navbar />
                {children}
            </body>
        </html>
    );
}