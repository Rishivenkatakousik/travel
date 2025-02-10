const API_BASE_URL = "http://localhost:5000";
const API_KEY = "AIzaSyA46lC4ZXV8lBGU8G4b9U59_6YYxkVJKm4"; // Replace with your actual API key

const getPhotoUrl = (photoRef) =>
  `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photoRef}&key=${API_KEY}`;

export const fetchPlacePhoto = async (placeName, setPhotoUrl) => {
  try {
    // Fetch place ID
    const placeResponse = await fetch(
      `${API_BASE_URL}/places?query=${placeName}`
    );
    const placeData = await placeResponse.json();
    const placeId = placeData?.placeId;
    if (!placeId) throw new Error("No place ID found");

    const photoResponse = await fetch(
      `${API_BASE_URL}/photoRef?placeId=${placeId}`
    );
    const photoData = await photoResponse.json();
    const photoRef = photoData?.photoRef;
    if (!photoRef) throw new Error("No photo reference found");

    // Set photo URL
    return getPhotoUrl(photoRef);
  } catch (error) {
    console.error("Error fetching photo:", error);
    return null;
  }
};
