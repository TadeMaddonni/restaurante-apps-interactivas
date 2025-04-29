import React from "react";
import Hero from "../sections/home/Hero";
import SelectedDishes from "../sections/home/Selected-dishes";
import OurEnvironment from "../sections/home/our-enviroment.jsx";
import Location from "../sections/home/Location.jsx";
import Destacados from "../sections/home/Destacados.jsx";

function Home() {
    return (
        <div>
            <Hero />
            <Destacados />
            <OurEnvironment />
            <SelectedDishes />
            <Location />
        </div>
    );
}

export default Home;
