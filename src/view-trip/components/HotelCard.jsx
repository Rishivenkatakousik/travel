import { fetchPlacePhoto } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  const [photoUrl, setPhotoUrl] = useState(null);

  const hotel_name = hotel?.hotelName;

  useEffect(() => {
    const photoUrl = fetchPlacePhoto(hotel_name, setPhotoUrl).then((result) => {
      setPhotoUrl(result); // Prints the resolved URL
    });
  }, [hotel]);

  return (
    <Link
      to={
        `https://www.google.com/maps/search/?api=1&query=` +
        hotel?.hotelName +
        " " +
        hotel?.hotelAddress
      }
      target="_blank"
    >
      <div className=" hover:scale-105 cursor-pointer transition-all duration-300">
        <img
          src={photoUrl ? photoUrl : "/Travel.jpeg"}
          alt="Hotel"
          className=" rounded-xl h-[200px] w-full object-cover"
        />
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
  );
};

export default HotelCard;
