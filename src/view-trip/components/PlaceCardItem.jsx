import { Button } from "@/components/ui/button";
import { fetchPlacePhoto } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PlaceCardItem = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState(null);

  const place_name = place?.placeName;

  useEffect(() => {
    const photoUrl = fetchPlacePhoto(place_name, setPhotoUrl).then((result) => {
      setPhotoUrl(result); // Prints the resolved URL
    });
  }, [place]);

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=` + place?.placeName}
      target="_blank"
    >
      <div className=" border rounded-xl p-3 mt-2 flex gap-4 hover:scale-105 hover:shadow-md transition-all duration-300 cursor-pointer">
        <img
          src={photoUrl ? photoUrl : "/Travel.jpeg"}
          alt="place"
          className=" w-[130px] h-[130px] rounded-xl object-cover"
        />
        <div>
          <h2 className=" font-bold text-lg">{place?.placeName}</h2>
          <p className=" text-sm text-gray-400">{place?.placeDetails}</p>
          <h2 className=" text-[15px] text-gray-600 mt-1">
            💵 {place?.ticketPricing}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCardItem;
