import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelsList,
} from "@/constants/options";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useToast } from "@/hooks/use-toast";
import { chatSession } from "@/service/AImodal";
import { FcGoogle } from "react-icons/fc";
import { LuLoaderCircle } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/FirebaseConfig";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      (formData.noOfDays > 10 && !formData.location) ||
      !formData.budget ||
      !formData.travellingWith
    ) {
      toast({
        description: "Please fill all the fields",
      });
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveller}", formData?.travellingWith)
      .replace("{budget}", formData?.budget)
      .replace("{days}", formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    setLoading(false);
    saveAiTrip(result?.response?.text());
  };

  const saveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "Aitrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user.email,
      id: docId,
    });
    setLoading(false);
    navigate(`/view-trip/${docId}`);
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        onGenerateTrip();
      });
  };

  return (
    <div className=" sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className=" font-bold text-3xl">Tell us your travel preferences</h2>
      <p className=" mt-3 text-xl text-gray-500">
        Just provide some basic information,and our trip planner will generate a
        customised itinerary based on your preferences
      </p>

      <div className="mt-20 flex flex-col gap-9">
        <div>
          <h2 className=" text-xl my-3 font-medium ">
            What is destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>

        <div>
          <h2 className=" text-xl my-3 font-medium ">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder={"Ex.3"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
      </div>

      <div>
        <h2 className=" text-xl my-3 font-medium ">What is your budget?</h2>
        <div className=" grid  grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`${
                formData.budget == item.title && " shadow-lg border-black"
              } p-4 rounded-lg cursor-pointer border hover:shadow-lg`}
            >
              <h2 className=" text-4xl">{item.icon}</h2>
              <h2 className=" font-bold text-lg">{item.title}</h2>
              <h2 className=" text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className=" text-xl my-3 font-medium ">
          What do you plan on travelling with on your next advenyure?
        </h2>
        <div className=" grid grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {SelectTravelsList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("travellingWith", item.people)}
              className={`${
                formData.travellingWith == item.people &&
                " shadow-lg border-black"
              } p-4 rounded-lg cursor-pointer border hover:shadow-lg`}
            >
              <h2 className=" text-4xl">{item.icon}</h2>
              <h2 className=" font-bold text-lg">{item.title}</h2>
              <h2 className=" text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className=" mt-10 flex justify-end">
        <Button disabled={loading} onClick={onGenerateTrip}>
          {loading ? (
            <LuLoaderCircle className=" h-7 w-7 animate-spin" />
          ) : (
            <>Generate Trip</>
          )}
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="logo" />
              <h2 className=" font-bold text-lg mt-7">Sign in with Google</h2>
              <p>Sign in to the app with google authentication securely</p>
              <Button
                onClick={login}
                className=" w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className=" h-7 w-7" /> Sign in with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
