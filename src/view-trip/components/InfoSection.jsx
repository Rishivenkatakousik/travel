import { Button } from "@/components/ui/button";

import React, { useEffect, useState } from "react";
import { FaShare } from "react-icons/fa";
import axios from "axios";
import { fetchPlacePhoto } from "@/service/GlobalApi";

const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState(null);

  const place_name = trip?.userSelection?.location?.label;

  useEffect(() => {
    const photoUrl = fetchPlacePhoto(place_name, setPhotoUrl).then((result) => {
      setPhotoUrl(result);
    });
  }, [trip]);

  return (
    <div>
      <img
        src={photoUrl ? photoUrl : "/Travel.jpeg"}
        alt="Photo"
        className=" h-[340px] w-full object-cover rounded-xl"
      />

      <div className=" flex justify-between items-center">
        <div className=" my-5 flex flex-col gap-2">
          <h2 className=" font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>

          <div className=" flex gap-5">
            <h2 className=" p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-sm">
              📅 {trip?.userSelection?.noOfDays} Days
            </h2>
            <h2 className=" p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-sm">
              💰 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className=" p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-sm">
              🧑🏻‍🤝‍🧑🏻 No of Travellers : {trip?.userSelection?.travellingWith}
            </h2>
          </div>
        </div>
        <Button>
          <FaShare />
        </Button>
      </div>
    </div>
  );
};

export default InfoSection;
