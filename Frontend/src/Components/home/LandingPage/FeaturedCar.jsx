import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../../store/car-slice";
import CarCard from "../ExploreCars/CarCard";
import CarCardSkeleton from "../../../Components/common/CarCardSkeleton";
import { Link } from "react-router-dom";

const Featured = () => {
  const dispatch = useDispatch();
  const { cars, isLoading, error } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(fetchCars()); // Saari cars fetch kar lo
  }, [dispatch]);

  // Sirf pehli 8 cars dikhani hain
  const featuredCars = cars.slice(0, 8);

  if (isLoading) {
    return (
      <div className="p-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <CarCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }
  if (error) {
    return <div className="py-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 mx-auto max-w-7xl">
      <h1 className="mb-8 text-4xl font-bold text-center">
        <span className="text-yellow-500">Featured</span> Cars
      </h1>

      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {featuredCars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>

      <div className="text-center">
        <Link
          to="/explore"
          className="px-6 py-3 font-semibold text-white transition-colors bg-yellow-700 rounded-lg hover:bg-yellow-600"
        >
          Explore More Cars
        </Link>
      </div>
    </div>
  );
};

export default Featured;
