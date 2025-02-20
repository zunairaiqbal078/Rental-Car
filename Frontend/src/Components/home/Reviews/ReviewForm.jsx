import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
function ReviewForm() {
  const [rating, setRating] = useState(0);
  return (
    <>
      <div className="max-w-3xl p-8 mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-yellow-600">
          Share Your Reviews
        </h2>
        <form className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <textarea
            placeholder="Your Comment"
            rows="2"
            className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></textarea>

          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`text-xl cursor-pointer transition ${
                  rating >= star ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full py-3 text-white transition duration-300 bg-yellow-700 rounded-lg hover:bg-yellow-400"
            onClick={() => alert(`Thank you for rating us ${rating} stars!`)}
          >
            Send Message
          </button>
        </form>
      </div>
    </>
  );
}

export default ReviewForm;
