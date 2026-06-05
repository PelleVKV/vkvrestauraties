import "./globals.css";
import Navbar from "@/components/navbar";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
    metadataBase: new URL("https://vkvrestauraties.nl"),
    title: {
        default: "VKV Restauraties — Monumentale restauraties in Amsterdam",
        template: "%s | VKV Restauraties",
    },
    description: "VKV Restauraties is gespecialiseerd in restauraties van monumentale panden in Amsterdam. Funderingsherstel, stukwerk, schilderwerk en meer.",
    keywords: ["restauratie", "monumenten", "Amsterdam", "funderingsherstel", "stukwerk", "VKV"],
    openGraph: {
        title: "VKV Restauraties",
        description: "Gespecialiseerd in restauraties van monumentale panden",
        url: "https://vkvrestauraties.nl",
        siteName: "VKV Restauraties",
        locale: "nl_NL",
        type: "website",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "VKV Restauraties",
        description: "Gespecialiseerd in restauraties van monumentale panden",
        images: ["/og-image.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true },
    },
    alternates: {
        canonical: "https://vkvrestauraties.nl",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "VKV Restauraties",
    description: "Gespecialiseerd in restauraties van monumentale panden",
    url: "https://vkvrestauraties.nl",
    telephone: "+31-XX-XXXXXXX",
    address: {
        "@type": "PostalAddress",
        streetAddress: "...",
        addressLocality: "Amsterdam",
        addressCountry: "NL",
    },
    geo: {
        "@type": "GeoCoordinates",
        latitude: 52.368426,
        longitude: 4.899055,
    },
    areaServed: "Amsterdam",
    priceRange: "€€€",
};

// In your layout JSX:
<script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>

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