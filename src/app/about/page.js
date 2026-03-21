"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Spin } from "antd";

export default function AboutPage() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const sections = useMemo(
        () => [
            { id: 1, key: "wat-wij-doen", title: "Wat wij doen" },
            { id: 2, key: "funderingsherstel-en-kelderbouw" },
            { id: 3, key: "restauratie-van-monumentaal-stukwerk" },
            { id: 4, key: "restauratief-schilderwerk" },
            { id: 5, key: "metselwerk-en-voegwerk" },
            { id: 6, key: "restauratie-van-natuurstenen-stoepen" },
            { id: 7, key: "duurzame-energie-opwekking" },
            { id: 8, key: "ramen-en-kozijnen" },
        ],
        [],
    );

    const [activeKey, setActiveKey] = useState(sections[0].key);
    const scrollRef = useRef(null);

    useEffect(() => {
        async function fetchImages() {
            const res = await fetch(
                `/api/folders?bucket=${process.env.NEXT_PUBLIC_BUCKET_NAME}`,
            );
            const data = await res.json();

            const aboutFolder = data.folders.find(
                (f) => f.folder === "aboutme",
            );

            if (aboutFolder) {
                const sorted = aboutFolder.images.sort((a, b) => {
                    const aNum = parseInt(a.match(/\d+/)?.[0] || 0);
                    const bNum = parseInt(b.match(/\d+/)?.[0] || 0);
                    return aNum - bNum;
                });

                setImages(sorted);
            }

            setLoading(false);
        }

        fetchImages();
    }, []);

    const activeSection =
        sections.find((s) => s.key === activeKey) || sections[0];

    const activeImage = images[activeSection.id - 1];

    useEffect(() => {
        const container = scrollRef.current;
        if (!container || images.length === 0) return;

        const headings = Array.from(container.querySelectorAll("h2[data-key]"));
        const viewportOffset = 200;

        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    let current = headings[0];

                    headings.forEach((heading) => {
                        const rect = heading.getBoundingClientRect();
                        const containerTop =
                            container.getBoundingClientRect().top;

                        if (rect.top - containerTop <= viewportOffset) {
                            current = heading;
                        }
                    });

                    const key = current?.dataset?.key;
                    if (key) setActiveKey(key);

                    ticking = false;
                });

                ticking = true;
            }
        };

        container.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => container.removeEventListener("scroll", handleScroll);
    }, [images]);

    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="relative justify-center w-full mt-32 px-8 lg:px-16 flex flex-col lg:flex-row gap-8">
            {/* IMAGE PANEL */}
            <div className="hidden lg:block w-1/3">
                <div className="sticky top-24">
                    <div className="relative aspect-4/5 overflow-hidden shadow-2xl">
                        <AnimatePresence mode="wait">
                            {activeImage && (
                                <motion.img
                                    key={activeSection.key}
                                    src={`https://vkvrestauraties-images.s3.eu-north-1.amazonaws.com/${activeImage}`}
                                    alt=""
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.45 }}
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* TEXT SCROLL */}
            <div
                ref={scrollRef}
                className="w-full lg:w-1/2 h-[80vh] overflow-y-auto text-xl text-white"
            >
                <h2
                    data-key="wat-wij-doen"
                    className="text-4xl lg:text-4xl font-bold mb-4"
                >
                    Wat wij doen
                </h2>
                <p className="mb-4 text-2xl font-bold">
                    Verbouwingen en restauraties van A tot Z
                </p>
                <p className="mb-4">
                    VKV Restauraties is gespecialiseerd in restauraties van
                    monumentale panden. Wij werken met een vast team van
                    gespecialiseerde vakmensen. Onze werkzaamheden variëren van
                    de restauratie van een rijksmonument inclusief
                    funderingsherstel tot het (ver)bouwen van een eenvoudige
                    badkamer. Deze kennis passen wij ook toe bij
                    nieuwbouwprojecten.
                </p>
                <p className="mb-4">
                    Historische gebouwen toekomstbestendig maken en bewaren voor
                    de volgende generaties is de uitdaging. Monumenten gaan vaak
                    al honderden jaren mee, wat hen tot een zeer duurzame
                    categorie gebouwen maakt.
                </p>
                <p className="mb-4">
                    Restaureren is daarnaast een zeer duurzame manier van
                    bouwen. Behoud van historische materialen gaat voor
                    vervangen en omdat de kwaliteit van de uitvoering voorop
                    staat, gaat het gebouw na een restauratie weer decennia lang
                    mee.
                </p>
                <ul className="list-disc list-inside mb-4 space-y-1">
                    <li>
                        Gebruik van duurzame materialen die rekening houden met
                        het milieu
                    </li>
                    <li>Gezond binnenmilieu door goede ventilatie</li>
                    <li>Duurzaam slopen en hergebruik van materialen</li>
                    <li>Verantwoord watergebruik</li>
                    <li>Voorkomen van uitputting van grondstoffen</li>
                </ul>
                <p className="mb-64">
                    Wij verzorgen uw project van A tot Z; van advies bij aankoop
                    tot en met de volledige uitvoering en verhuizing, met één
                    vast aanspreekpunt gedurende het hele proces.
                </p>
                <h2
                    data-key="funderingsherstel-en-kelderbouw"
                    className="text-2xl lg:text-3xl font-bold mb-4"
                >
                    Specialismen
                </h2>
                <p className="mb-4 text-lg font-bold">
                    Funderingsherstel en kelderbouw
                </p>
                <p className="mb-64">
                    Veel (Amsterdamse) huizen hebben te lijden onder een slechte
                    fundering als gevolg van het droogstaan van de palen waarop
                    de huizen zijn gebouwd. Op basis van, indien nodig,
                    lintvoegmetingen, waterpassingen en funderingsonderzoeken
                    kan worden bepaald of funderingsherstel op korte- of lange
                    tijd noodzakelijk is. Wanneer dit het geval blijkt te zijn
                    verzorgen wij voor u het gehele traject van het
                    funderingsherstel; indien gewenst met toevoeging van extra
                    ruimte in de vorm van een kelder.
                </p>
                <h2
                    data-key="restauratie-van-monumentaal-stukwerk"
                    className="text-2xl lg:text-3xl font-bold mb-4"
                >
                    Restauratie van monumentaal stukwerk
                </h2>
                <p className="mb-64">
                    Monumentale gipsplafonds zijn van oorsprong gemaakt op
                    rietmatten; deze zijn in de loop der tijd verzadigd geraakt
                    met vocht en stof en de bevestigingsmiddelen aangetast door
                    roest; hierdoor ontstaat scheurvorming en verzakking. Met
                    behulp van moderne technieken en klassiek vakmanschap worden
                    de onderdelen weer in hun oorspronkelijke glorie herstelt.
                </p>

                <h2
                    data-key="restauratief-schilderwerk"
                    className="text-2xl lg:text-3xl font-bold mb-4"
                >
                    Restauratief schilderwerk
                </h2>

                <p className="mb-64">
                    Regelmatig onderhoud van monumentaal schilderwerk is van het
                    grootste belang voor het behoud van onze monumenten. Oude
                    beschadigde verflagen en eventueel onderliggend
                    vergaanhoutwerk wordt verwijderd en het systeem wordt
                    opnieuw opgebouwd.
                </p>

                <h2
                    data-key="metselwerk-en-voegwerk"
                    className="text-2xl lg:text-3xl font-bold mb-4"
                >
                    Metselwerk en voegwerk
                </h2>

                <p className="mb-64">
                    Door zetting en verzakking worden ook vaak de gevels en het
                    voegwerk aangetast; als gevolg moeten delen van de gevel
                    opnieuw worden opgemetseld en gevoegd.
                </p>

                <h2
                    data-key="restauratie-van-natuurstenen-stoepen"
                    className="text-2xl lg:text-3xl font-bold mb-4"
                >
                    Restauratie van natuurstenen stoepen
                </h2>

                <p className="mb-64">
                    Natuurstenen stoepen hebben te lijden onder de tand des
                    tijds; monumentale onderdelen worden gedemonteerd,
                    gerestaureerd en voorzien van een deugdelijk fundament terug
                    geplaatst.
                </p>

                <h2
                    data-key="ramen-en-kozijnen"
                    className="text-2xl lg:text-3xl font-bold mb-4"
                >
                    Ramen en kozijnen
                </h2>

                <p className="mb-64">
                    Oude huizen hebben oude enkele vaak hand geblazen ruiten;
                    prachtig, maar in deze tijd niet meer acceptabel. Moderne
                    technieken zorgen voor een aanzienlijk betere isolatie zowel
                    qua warmte en koude als qua geluidsisolatie; deze zijn
                    veelal te plaatsen in de bestaande monumentale ramen.
                </p>

                <h2
                    data-key="duurzame-energie-opwekking"
                    className="text-2xl lg:text-3xl font-bold mb-4"
                >
                    Duurzame energieopwekking
                </h2>

                <p className="mb-64">
                    Verwarming met gasgestookte cv-ketels is uit de tijd.
                    Energie opwekking met behulp van bodem-energie, warmtepompen
                    en/of zonnepanelen is niet de toekomst maar de tegenwoordige
                    tijd. Zelfs op moeilijk bereikbare plekken, zoals een
                    achtertuin in Amsterdam kunnen wij door middel van
                    bronboringen duurzame energie uit de grond halen.
                </p>
            </div>
        </div>
    );
}
