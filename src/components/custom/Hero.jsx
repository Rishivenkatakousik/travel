import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col items-center gap-9 mx-56">
      <h1 className=" font-extrabold text-[45px] text-center mt-16">
        <span className="text-[#f56551]">
          Discover Your Next Adventure With AI:
        </span>
        <br />
        Personalised Itineraries at Your Fingertips
      </h1>
      <p className=" text-gray-500 text-xl text-center">
        Your personal trip planner nad Travel curator, creating custom
        itieraries tailored to your interest and budget.
      </p>
      <Link to="/create-trip">
        <Button>Get Started, it's Free</Button>
      </Link>
    </div>
  );
};

export default Hero;
