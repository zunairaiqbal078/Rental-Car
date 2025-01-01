import React from "react";
import IntroSection from "../../Components/common/IntroSection";
import CompanyIntro from "../../Components/home/AboutUs/CompanyIntro";
import MissionSection from "../../Components/home/AboutUs/MissionSection";
import ChooseUs from "../../Components/home/AboutUs/ChooseUs";
import Fleet from "../../Components/home/AboutUs/Fleet";

function About() {
  return (
    <>
      <div className="flex flex-col space-y-12 mb-9">
        <IntroSection heading="About Us" />
        <CompanyIntro />
        <MissionSection />
        <ChooseUs />
        <Fleet />
      </div>
    </>
  );
}

export default About;
