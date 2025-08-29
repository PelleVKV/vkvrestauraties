import React, { useEffect, useMemo, useRef, useState } from "react";
import { useImageData } from "../ImageProvider";
import { Spin } from "antd";
import { AnimatePresence, motion } from "framer-motion";

const AboutMe = () => {
    const { projectData, loading, error } = useImageData();

    const sections = useMemo(
        () => [
            {
                id: 10,
                key: "wat-wij-doen",
                title: "Wat wij doen",
            },
            {
                id: 0,
                key: "funderingsherstel-en-kelderbouw",
                title: "Funderingsherstel en kelderbouw",
            },
            {
                id: 8,
                key: "restauratie-van-monumentaal-stukwerk",
                title: "Restauratie van monumentaal stukwerk",
            },
            {
                id: 9,
                key: "restauratief-schilderwerk",
                title: "Restauratief schilderwerk",
            },
            {
                id: 10,
                key: "metselwerk-en-voegwerk",
                title: "Metselwerk en voegwerk",
            },
            {
                id: 11,
                key: "restauratie-van-natuurstenen-stoepen",
                title: "Restauratie van natuurstenen stoepen",
            },
            {
                id: 12,
                key: "duurzame-energie-opwekking",
                title: "Duurzame energie opwekking",
            },
            {
                id: 13,
                key: "ramen-en-kozijnen",
                title: "Ramen en kozijnen",
            },

        ],
        []
    );

    const [activeKey, setActiveKey] = useState(sections[0].key);
    const scrollRef = useRef(null);

    useEffect(() => {
        const rootEl = scrollRef.current;
        if (!rootEl) return;

        const headings = Array.from(rootEl.querySelectorAll("h2[data-key]"));
        if (!headings.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visible.length) {
                    const k = visible[0].target.dataset.key;
                    if (k && k !== activeKey) setActiveKey(k);
                    return;
                }

                const containerTop = rootEl.getBoundingClientRect().top;
                const closestAbove = headings
                    .map((h) => ({
                        key: h.dataset.key,
                        dist: containerTop - h.getBoundingClientRect().top,
                    }))
                    .filter((x) => x.dist > 0)
                    .sort((a, b) => a.dist - b.dist)[0];
                if (
                    closestAbove &&
                    closestAbove.key &&
                    closestAbove.key !== activeKey
                ) {
                    setActiveKey(closestAbove.key);
                }
            },
            { root: rootEl, threshold: [0.15, 0.35, 0.6, 0.85] }
        );

        headings.forEach((h) => observer.observe(h));
        return () => observer.disconnect();
    }, [activeKey]);

    useEffect(() => {
        console.log(images);
    }, [])

    const images =
        projectData.find((project) => project.title === "aboutme")?.images ||
        [];

    const activeSection =
        sections.find((s) => s.key === activeKey) || sections[0];

    if (loading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-full flex justify-center items-center text-2xl text-red-800">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="relative w-full mt-32 px-8 lg:px-16 flex flex-col lg:flex-row justify-center lg:items-start lg:gap-8">
            <div className="hidden lg:block w-1/3">
                <div className="sticky top-24">
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeSection.key}
                                src={
                                    process.env.REACT_APP_S3_URL +
                                    images[activeSection.id]
                                }
                                alt={activeSection.title}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.45, ease: "easeOut" }}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="w-full lg:w-1/2 h-[80vh] overflow-y-auto text-xl text-white font-light leading-relaxed cursor-default select-none pr-2"
            >
                <h2 data-key="wat-wij-doen" className="text-4xl lg:text-4xl font-bold mb-4">
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
                <h2 data-key="funderingsherstel-en-kelderbouw" className="text-2xl lg:text-3xl font-bold mb-4">
                    Specialismen
                </h2>
                <p
                    className="mb-4 text-lg font-bold"
                >
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

                <h2 data-key="metselwerk-en-voegwerk" className="text-2xl lg:text-3xl font-bold mb-4">
                    Metselwerk en voegwerk
                </h2>

                <p className="mb-64">
                    Door zetting en verzakking worden ook vaak de gevels en het
                    voegwerk aangetast; als gevolg moeten delen van de gevel
                    opnieuw worden opgemetseld en gevoegd.
                </p>

                <h2 data-key="restauratie-van-natuurstenen-stoepen" className="text-2xl lg:text-3xl font-bold mb-4">
                    Restauratie van natuurstenen stoepen
                </h2>

                <p className="mb-64">
                    Natuurstenen stoepen hebben te lijden onder de tand des
                    tijds; monumentale onderdelen worden gedemonteerd,
                    gerestaureerd en voorzien van een deugdelijk fundament terug
                    geplaatst.
                </p>

                <h2 data-key="ramen-en-kozijnen" className="text-2xl lg:text-3xl font-bold mb-4">
                    Ramen en kozijnen
                </h2>

                <p className="mb-64">
                    Oude huizen hebben oude enkele vaak hand geblazen ruiten;
                    prachtig, maar in deze tijd niet meer acceptabel. Moderne
                    technieken zorgen voor een aanzienlijk betere isolatie zowel
                    qua warmte en koude als qua geluidsisolatie; deze zijn
                    veelal te plaatsen in de bestaande monumentale ramen.
                </p>

                <h2 data-key="duurzame-energie-opwekking" className="text-2xl lg:text-3xl font-bold mb-4">
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
};

export default AboutMe;
