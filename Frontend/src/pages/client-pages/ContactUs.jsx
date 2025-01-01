import React from "react";

import IntroSection from "../../Components/common/IntroSection";
import ContactDetails from "../../Components/home/ContactUs/ContactDetails";
import ContactForm from "../../Components/home/ContactUs/ContactForm";
import Address from "../../Components/home/ContactUs/Address";

function ContactUs() {
  return (
    <>
      <IntroSection heading="Contact Us" />
      {/* Main Content */}
      <div className="container px-4 py-12 mx-auto space-y-16">
        <ContactDetails />
        <ContactForm />
        <Address />
      </div>
    </>
  );
}

export default ContactUs;
