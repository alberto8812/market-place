import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const animationPageIn = () => {

  const branchShort = document.querySelectorAll(".brancShort");
  const brancName = document.querySelectorAll(".brancName");

  if (branchShort && brancName ) {
    gsap.to(branchShort, {
      y: 0,
      stagger: 0.5,
      delay: 0.5,
      duration: 1,
    });

    gsap.to(brancName,{
       x:0,
       delay: 0.9,
       duration: 1,
    })

  }
};
