import React, { useState } from "react";
import HeroSection from "../../Components/home/LandingPage/HeroSection";

import CardSection from "../../Components/home/LandingPage/CardSection";
import HelpUsSection from "../../Components/home/LandingPage/HelpUsSection";
import LoginSection from "../../Components/home/LandingPage/LoginSection";
import ExploreSection from "../../Components/home/LandingPage/ExploreSection";
import FaqSection from "../../Components/home/LandingPage/FaqSection";
import Reviews from "../../Components/home/Reviews/ReviewSlider";
import Featured from "../../Components/home/LandingPage/FeaturedCar";
function Home() {
  return (
    <>
      <HeroSection />
      <Featured />
      <CardSection />
      <HelpUsSection />
      <LoginSection />
      <ExploreSection />
      <Reviews />
      <FaqSection />
    </>
  );
}

export default Home;
