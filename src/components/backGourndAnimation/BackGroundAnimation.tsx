"use client";

import { animationBackGroundPage, backgroundCard } from "@/util/animations";

import { useGSAP } from "@gsap/react";
import { FiShoppingBag } from "react-icons/fi";
import { IoIosTabletPortrait } from "react-icons/io";
import {  SiSpreadshirt } from "react-icons/si";
import { FaGamepad } from "react-icons/fa";
import { RiTShirt2Line } from "react-icons/ri";

export const BackGroundAnimation = () => {
  useGSAP(() => {
    animationBackGroundPage();
    backgroundCard();
  });

  return (
    <div
      className=" 
    top-0 left-0 right-0 bottom-0   w-screen h-full absolute z-1  flex flex-col 
     BackGroundContainer 
    "
    >
      <div className="BackGroundContainer_Animation relative  h-full flex justif-center items-start flex-col pl-8">


        <div className="icon2 absolute  sm:w-[70px] sm:h-[70px] opacity-0  left-[8%] top-[100vh] ">
          <FiShoppingBag  className="backgroundCard sm:w-[70px] sm:h-[70px] text-[#c4b3d5]   " />
        </div>
        <div className="icon3 absolute  sm:w-[70px] sm:h-[70px] opacity-0   left-[3%] top-[100vh]">
          <RiTShirt2Line  className="backgroundCard  sm:w-[70px] sm:h-[70px] text-[#c4b3d5]   " />
        </div> 
        <div className="icon4 absolute  sm:w-[70px] sm:h-[70px] opacity-0 left-[8%] top-[100vh]">
          <SiSpreadshirt  className="backgroundCard  sm:w-[70px] sm:h-[70px] text-[#c4b3d5]   " />
        </div>
        <div className="icon5 absolute  sm:w-[70px] sm:h-[70px] opacity-0 left-[3%] top-[100vh]">
          <IoIosTabletPortrait  className="backgroundCard  sm:w-[70px] sm:h-[70px] text-[#c4b3d5]   " />
        </div>
        <div className="icon6 absolute  sm:w-[70px] sm:h-[70px] opacity-0  left-[8%] top-[100vh]">
          <FaGamepad  className="backgroundCard  sm:w-[70px] sm:h-[70px] text-[#c4b3d5]  " />
        </div>
      </div>
    </div>
  );
};
