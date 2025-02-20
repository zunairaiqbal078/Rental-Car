import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
function ContactDetails() {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col items-center text-center">
          <FaPhoneAlt className="mb-4 text-3xl text-cyan-950" />
          <h3 className="text-xl font-bold">Phone</h3>
          <p className="text-gray-600">+92-300-098-1234</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <FaEnvelope className="mb-4 text-3xl text-cyan-950" />
          <h3 className="text-xl font-bold">Email</h3>
          <p className="text-gray-600">luxerentals@gmail.com</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <FaMapMarkerAlt className="mb-4 text-3xl text-cyan-950" />
          <h3 className="text-xl font-bold">Address</h3>
          <p className="text-gray-600">123 Luxe Drive,Lahore, Pakistan</p>
        </div>
      </div>
    </>
  );
}

export default ContactDetails;
