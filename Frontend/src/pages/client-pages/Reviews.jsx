import React from "react";
import IntroSection from "../../Components/common/IntroSection";
import ReviewForm from "../../Components/home/Reviews/ReviewForm";
import CustomerReview from "../../Components/home/Reviews/CustomerReview";
import ReviewSlider from "../../Components/home/Reviews/ReviewSlider";
function Reviews() {
  return (
    <>
      <IntroSection heading="Reviews" />
      <ReviewForm />
      <CustomerReview />
      <ReviewSlider />
    </>
  );
}

export default Reviews;
