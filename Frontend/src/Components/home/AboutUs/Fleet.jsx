import React from "react";

function Fleet() {
  return (
    <>
      <div className="py-10 bg-gray-100">
        <div className="max-w-5xl px-6 mx-auto">
          <h2 className="mb-6 text-3xl font-semibold text-center text-blue-700">
            Services Offered
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Corporate Rentals",
              "Airport Transfers",
              "Wedding Car Rentals",
              "Chauffeur-Driven Services",
              "Long-Term Leasing",
              "Road Trip Cars",
            ].map((service, index) => (
              <div
                key={index}
                className="p-4 text-center bg-white rounded-lg shadow-md hover:shadow-lg"
              >
                {service}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Fleet;
