import React, { useState } from "react";
import HeroSection from "../../Components/home/LandingPage/HeroSection";

import CardSection from "../../Components/home/LandingPage/CardSection";
import HelpUsSection from "../../Components/home/LandingPage/HelpUsSection";
import LoginSection from "../../Components/home/LandingPage/LoginSection";
import ExploreSection from "../../Components/home/LandingPage/ExploreSection";
import FaqSection from "../../Components/home/LandingPage/FaqSection";

function Home() {
  return (
    <>
      <HeroSection />
      <CardSection />
      <HelpUsSection />
      <LoginSection />
      <h1 className="my-4 text-2xl font-bold text-center">
        Where do you <span className="text-yellow-400">want to go?</span>
      </h1>
      <ExploreSection />
      <FaqSection />
    </>
  );
}

export default Home;
