import React from "react";

function CompanyIntro() {
  return (
    <>
      <div className="flex flex-col items-center max-w-4xl px-6 mx-auto space-y-4">
        <h2 className="text-3xl font-semibold text-center text-yellow-600">
          Welcome to LuxeRentals
        </h2>
        <p className="text-center text-gray-700">
          LuxeRentals is a premier car rental service committed to providing
          unparalleled travel experiences. With a fleet of luxurious vehicles
          and a dedicated team, we make every journey comfortable and
          hassle-free.
        </p>
        <div className="w-full p-6 mt-4 bg-white rounded-lg shadow-md md:flex">
          <img
            src="src/assets/aboutUsImages/avatar.jpg"
            alt="Owner"
            className="object-fill w-32 h-32 mx-auto rounded-full md:mx-0"
          />
          <div className="flex flex-col items-center md:items-start md:pl-6">
            <h3 className="text-lg font-bold">John Doe</h3>
            <p className="text-sm text-gray-600">Founder & CEO</p>
            <p className="mt-2 text-gray-700">
              With a passion for delivering excellence, John Doe founded
              LuxeRentals to redefine the car rental industry. His vision and
              dedication inspire the entire team.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompanyIntro;
