import React from "react";
import { Link } from "react-router-dom";
import HotelCard from "./HotelCard";

const Hotels = ({ trip }) => {
  return (
    <div>
      <h2 className=" font-bold text-xl mt-5 mb-5">Hotel Recommendation</h2>

      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <HotelCard hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default Hotels;
