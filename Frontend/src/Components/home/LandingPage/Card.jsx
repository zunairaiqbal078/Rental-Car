import React from "react";

function Card({ image, title, description }) {
  return (
    <div className="  bg-slate-100 shadow-md border text-center rounded-lg w-[30%] max-md:w-full py-10 ">
      <div className="flex items-center justify-center p-6 hover:text-yellow-400 ">
        {image}
      </div>

      <div className="flex flex-col items-center max-w-lg p-4 max-md:max-w-fit">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-5 text-sm text-gray-600 ">{description}</p>
      </div>
    </div>
  );
}

export default Card;
