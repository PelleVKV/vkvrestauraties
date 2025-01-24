import React from "react";

const AboutMe = () => {
    const profilePicture = "/profielfoto.jpg";
    return (
        <div className="relative w-full h-full flex justify-center items-center px-64">
            <p className="text-xl font-bold text-white max-h-1/2 cursor-default select-none">
                Na het voltooien in 1993, of eigenlijk al tijdens,
                mijn rechtenstudie, besloot ik het leuker te vinden met mijn handen te werken. Ik begon met
                een studievriend een klus- en schildersbedrijfje wat in de loop der jaren uitgroeide tot wat
                het nu is. Een bedrijf gericht op aanneming en bouwbegeleiding met meer dan 30 jaar ervaring,
                meer dan 300 voltooide projecten en een uitgebreid netwerk van vakmensen. Het restaureren en
                verduurzamen van oude panden is mijn passie. (Bijna) niets is mooier dan een monumentaal pand
                te ontdoen van hetgeen er in voorgaande tijden aan veranderd is, het terug te brengen in de
                casco staat om het vervolgens weer op te bouwen op een manier waarbij het voldoet aan de huidige
                eisen en het oorspronkelijk ontwerp wordt behouden of in ere wordt hersteld.</p>
            <img src={profilePicture} alt="Profile" loading="lazy" className="scale-75"/>
        </div>
    );
}

export default AboutMe;
