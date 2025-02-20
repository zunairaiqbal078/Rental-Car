import React from "react";
import { reviews } from "../../../Data/FAQ";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import ReviewCard from "./ReviewCards";

function Reviews() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 982,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="py-12 mb-5 text-black px-9 ">
      <div className="flex flex-col gap-8 mx-auto md:flex-row">
        {/* Static Left Section */}
        <div
          className="flex flex-col items-center justify-center h-full p-6"
          style={{ height: "260px" }} // Match height to slider cards
        >
          <h2 className="text-2xl font-bold">EXCELLENT</h2>
          <div className="flex items-center my-3">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-xl text-yellow-400" />
            ))}
          </div>
          <p className="mb-3 text-lg">
            Based on <span className="text-blue-900">178</span> reviews
          </p>
          <div className="flex items-center">
            <FcGoogle className="text-3xl" />
            <span className="text-lg font-semibold text-blue-900">oogle</span>
          </div>
        </div>

        {/* Slider Right Section */}
        <div className="flex-1 h-full overflow-hidden">
          <Slider {...settings}>
            {reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
export default Reviews;
