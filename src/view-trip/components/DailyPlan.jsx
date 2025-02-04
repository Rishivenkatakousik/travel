import React, { useEffect } from "react";
import PlaceCardItem from "./PlaceCardItem";

const DailyPlan = ({ trip }) => {
  useEffect(() => {
    console.log(trip, "plan");
    // console.log(trip?.tripData?.itinerary, "itinerary");
  }, [trip]);

  const reversedItineraryArray = Array.isArray(trip?.tripData?.itinerary)
    ? trip.tripData.itinerary
    : Object.values(trip?.tripData?.itinerary || {});

  // Reverse the itinerary array
  const itineraryArray = reversedItineraryArray.reverse();

  console.log(itineraryArray, "ItineraryArray");
  console.log(reversedItineraryArray, "reversedItineraryArray");

  return (
    <div>
      <h2 className="font-bold text-lg">Places To Visit</h2>

      <div>
        {reversedItineraryArray.length > 0 ? (
          reversedItineraryArray.map((item, index) => (
            <div key={index} className=" mt-5">
              <h2 className="font-medium text-lg">{item?.day}</h2>
              <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                {item.activities.map((place, index) => (
                  <div className="">
                    <h2 className=" font-medium text-sm text-orange-600">
                      {place?.timeToTravel}
                    </h2>
                    <PlaceCardItem place={place} />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No itinerary available</p>
        )}
      </div>
    </div>
  );
};

export default DailyPlan;
