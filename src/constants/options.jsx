export const SelectTravelsList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveles in exploration",
    icon: "✈️",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two traveles in tandem",
    icon: "🍻",
    people: "2 People",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving adv",
    icon: "🏡",
    people: "3 to 5 People",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seeks",
    icon: "🎉",
    people: "5 to 10 People",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of cost",
    icon: "🪙",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average",
    icon: "💰",
  },

  {
    id: 3,
    title: "Luxury",
    desc: "Dont worry about cost",
    icon: "💸",
  },
];

export const AI_PROMPT =
  "Generate a travel plan for location: {location}, for {totalDays} days for {traveller} with a {budget} budget. Provide a list of hotel options with HotelName, Hotel address, Price, hotel image URL, geo coordinates, rating, and descriptions. Also, suggest an itinerary list in array format with each day containing day, placeName, placeDetails, placeImageUrl, geoCoordinates, ticketPricing, and timeToTravel in the format like '9 AM to 12 PM, 3 PM to 5 PM' for each location for {days} days with each day's plan and the best time to visit in JSON format.";
