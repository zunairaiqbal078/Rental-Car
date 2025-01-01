import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Review } from "../../../Data/Reviews";
import { FaStar } from "react-icons/fa";

function ReviewSlider() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 768, // For tablets and smaller devices
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="px-6 py-12 mb-5 bg-gray-100">
      <Slider {...settings}>
        {Review.map((r) => (
          <div key={r.id} className="px-4">
            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-6 h-[300px]">
              <h2 className="text-xl font-semibold text-gray-800">{r.name}</h2>

              {/* Review Text */}
              <p className="mt-4 text-sm text-center text-gray-600">
                <q>{r.review}</q>
              </p>

              {/* Star Ratings */}
              <div className="flex items-center justify-center mt-5">
                {Array.from({ length: 5 }, (_, index) => (
                  <FaStar
                    key={index}
                    className={`${
                      index < r.rating ? "text-yellow-400" : "text-gray-300"
                    } text-lg`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ReviewSlider;
