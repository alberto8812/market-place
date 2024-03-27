"use client";

import { animationBackGroundPage, backgroundCard } from "@/util/animations";

import { useGSAP } from "@gsap/react";
import { FiShoppingBag } from "react-icons/fi";
import { IoIosTabletPortrait } from "react-icons/io";
import {  SiSpreadshirt } from "react-icons/si";
import { FaGamepad } from "react-icons/fa";
import { RiTShirt2Line } from "react-icons/ri";
import { useEffect, useRef } from "react";



export const BackGroundAnimation = () => {
  const container = useRef(null);
  useGSAP(() => {

  
    animationBackGroundPage();
    backgroundCard();
  
  },);


  return (
    <div
    ref={container}
      className=" 
      top-0 left-0 right-0 bottom-0   w-full h-full absolute z-0  flex flex-col 
       BackGroundContainer 
      "
    >
      <div className=" BackGroundContainer_Animation  relative w-screen  h-full   flex justify-center items-start flex-col  bottom-0 " >


        <div className="icon2 absolute  sm:w-[70px] sm:h-[70px] opacity-0  left-[8%] top-full ">
          <FiShoppingBag  className="backgroundCard w-[70px] h-[70px] text-[#c4b3d5]   " />
        </div>
  
        <div className="icon3 absolute  sm:w-[70px] sm:h-[70px] opacity-1   left-[3%] top-full">
          <RiTShirt2Line  className="backgroundCard  sm:w-[70px] sm:h-[70px] text-[#c4b3d5]   " />
        </div> 
        <div className="icon4 absolute  sm:w-[70px] sm:h-[70px] opacity-0 left-[8%] top-full">
          <SiSpreadshirt  className="backgroundCard  sm:w-[70px] sm:h-[70px] text-[#c4b3d5]   " />
        </div>
        <div className="icon5 absolute  sm:w-[70px] sm:h-[70px] opacity-0 left-[3%] top-full">
          <IoIosTabletPortrait  className="backgroundCard  sm:w-[70px] sm:h-[70px] text-[#c4b3d5]   " />
        </div>
        <div className="icon6 absolute  sm:w-[70px] sm:h-[70px] opacity-0  left-[8%] top-full">
          <FaGamepad  className="backgroundCard  sm:w-[70px] sm:h-[70px] text-[#c4b3d5]  " />
        </div>
      </div>
    </div>
  );
};
