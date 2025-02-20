import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CarCardSkeleton = () => {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md">
      {/* Image Skeleton */}
      <Skeleton height={192} className="rounded-lg" />

      {/* Title */}
      <h3 className="mt-4">
        <Skeleton width={"80%"} height={20} />
      </h3>

      {/* Price */}
      <p className="mt-2">
        <Skeleton width={"50%"} height={16} />
      </p>

      {/* Location and Type */}
      <p className="mt-1">
        <Skeleton width={"60%"} height={14} />
      </p>

      {/* Date Added */}
      <p className="mt-1">
        <Skeleton width={"40%"} height={12} />
      </p>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <Skeleton width={"45%"} height={36} borderRadius={8} />
        <Skeleton width={"45%"} height={36} borderRadius={8} />
      </div>
    </div>
  );
};

export default CarCardSkeleton;
