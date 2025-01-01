import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
function ViewDetails() {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    autoplay: false,
    customPaging: (i) => {
      const thumbnail = ["../../../assets"];
      return (
        <div className="thumbnail-container">
          <img
            src={thumbnail[i]}
            alt={`Thumbnail ${i + 1}`}
            className="thumbnail"
          />
        </div>
      );
    },
    dotsClass: "slick-dots custom-dots",
  };
  return (
    <div>
      <Slider {...settings}></Slider>
    </div>
  );
}

export default ViewDetails;
