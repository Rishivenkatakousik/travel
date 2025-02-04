import React from "react";
import { Link } from "react-router-dom";

const Hotels = ({ trip }) => {
  return (
    <div>
      <h2 className=" font-bold text-xl mt-5">Hotel Recommendation</h2>

      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <Link
            to={
              `https://www.google.com/maps/search/?api=1&query=` +
              hotel?.hotelName +
              " " +
              hotel?.hotelAddress
            }
            target="_blank"
          >
            <div
              className=" hover:scale-105 cursor-pointer transition-all duration-300"
              key={index}
            >
              <img src="/Travel.jpeg" alt="Hotel" className=" rounded-xl" />
              <div className=" my-2 flex flex-col gap-2">
                <h2 className=" font-medium">{hotel?.hotelName}</h2>
                <h2 className=" text-xs text-gray-500 font-medium">
                  📍 {hotel?.hotelAddress}
                </h2>
                <h2 className=" text-sm">💰 {hotel?.price}</h2>
                <h2 className=" text-sm">⭐ {hotel?.rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
