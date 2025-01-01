import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { carTypes } from "../../../Data/Rides";

function Catalog() {
  const settings = {
    centerMode: false,
    slidesToShow: 4,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 860,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 630,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 589,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <h2 className="mb-3 text-xl font-bold text-gray-800">Car Type</h2>
      <Slider {...settings}>
        {carTypes.map((car) => (
          <div key={car.id} className="px-2 ">
            <div className="relative overflow-hidden bg-white rounded-lg shadow-lg group max-h-[180px]">
              <img
                src={car.image}
                alt={car.name}
                className="object-cover  w-[170px]  h-[130px]  max-[400px]:max-w-[100%] max-md:w-full "
              />
              <div className="p-1 text-center">
                <h5 className="font-mono text-gray-800 text-md">{car.type}</h5>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Catalog;
