import React from "react";

function IntroSection({ heading }) {
  return (
    <>
      <div
        className="relative w-full bg-center bg-cover
            bg-[url('src/assets/HomeImages/heroimg.jpg')]
            h-[300px]
            "
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <h1 className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white">
          {heading}
        </h1>
      </div>
    </>
  );
}

export default IntroSection;
