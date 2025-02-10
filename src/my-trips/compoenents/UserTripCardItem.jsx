import { fetchPlacePhoto } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserTripCardItem = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState(null);

  const trip_name = trip?.userSelection?.location?.label;

  useEffect(() => {
    const photoUrl = fetchPlacePhoto(trip_name, setPhotoUrl).then((result) => {
      setPhotoUrl(result); // Prints the resolved URL
    });
  }, [trip]);

  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div className=" hover:scale-105 transition-all duration-300 ">
        <img
          src={photoUrl ? photoUrl : "/Travel.jpeg"}
          className=" object-cover rounded-xl h-[250px] w-[320px]"
        />
        <div>
          <h2 className=" font-bold text-lg">
            {trip?.userSelection?.location?.label}
          </h2>
          <h2 className=" tet-sm text-gray-500">
            {trip?.userSelection?.noOfDays} Days trip with{" "}
            {trip?.userSelection?.budget} Budget
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default UserTripCardItem;
