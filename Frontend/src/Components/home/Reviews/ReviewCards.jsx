import { useState } from "react";
import { FaUserCircle, FaStar } from "react-icons/fa";
function ReviewCard({ review }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const charLimit = 100;

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedContent =
    review.content.length > charLimit
      ? review.content.slice(0, charLimit)
      : review.content;

  return (
    <div
      className=" bg-gradient-to-l from-teal-500/20 via-cyan-700/2 to-cyan-800/25 text-black p-6 mx-2 rounded-lg shadow-md flex flex-col justify-between h-full border border-orange-600/35 w-[90%]"
      style={{ height: "260px" }} // Fixed card height
    >
      {/* Reviewer Info */}
      <div className="flex items-center gap-3">
        <FaUserCircle className="text-3xl text-orange-500" />
        <div>
          <h3 className="text-lg font-bold">{review.name}</h3>
          <p className="text-sm text-black">{review.date}</p>
        </div>
      </div>

      {/* Stars */}
      <div className="flex mt-2">
        {[...Array(review.rating)].map((_, i) => (
          <FaStar key={i} className="text-lg text-yellow-400" />
        ))}
      </div>

      {/* Review Content with Button Inline */}
      <div className="mt-4 text-sm text-black">
        {isExpanded ? (
          <>
            {review.content}{" "}
            <button
              onClick={toggleReadMore}
              className="text-blue-500 hover:underline"
            >
              Read Less
            </button>
          </>
        ) : (
          <>
            {truncatedContent}
            {review.content.length > charLimit && (
              <>
                ...{" "}
                <button
                  onClick={toggleReadMore}
                  className="text-blue-500 hover:underline"
                >
                  Read More
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ReviewCard;
