import React from "react";
import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import HowItWorks from "../components/sections/HowItWorks";
import Meals from "../components/sections/Meals";
import Testimonials from "../components/sections/Testimonials";
import PriceSection from "../components/sections/PriceSection";
import CallToAction from "../components/sections/CallToAction";

const Homepage = () => {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <Meals />
      <Testimonials />
      <PriceSection />
      <CallToAction />
    </main>
  );
};

export default Homepage;
