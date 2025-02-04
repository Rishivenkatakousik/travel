import { useToast } from "@/hooks/use-toast";
import { db } from "@/service/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { use } from "react";
import { useParams } from "react-router-dom";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import DailyPlan from "../components/DailyPlan";
import Footer from "../components/Footer";

const Viewtrip = () => {
  const [trip, setTrip] = useState([]);
  const toast = useToast();
  const { tripId } = useParams();

  const getTripData = async () => {
    const docRef = doc(db, "Aitrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      toast("No such document!");
    }
  };

  useEffect(() => {
    tripId && getTripData();
  }, [tripId]);

  return (
    <div className=" p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Information section */}
      <InfoSection trip={trip} />

      {/* Recommended Hotels */}
      <Hotels trip={trip} />

      {/* Daily plan */}
      <DailyPlan trip={trip} />

      {/* Footer */}
      <Footer trip={trip} />
    </div>
  );
};

export default Viewtrip;
