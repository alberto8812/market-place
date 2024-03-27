"use client";

import { animatioTrantionPages } from "@/util/animations";
import { useGSAP } from "@gsap/react";

export default function Template({ children }: { children: React.ReactNode }) {
  useGSAP(() => {
     animatioTrantionPages();
  });



  return (
    <div
      id="transition-element"
      className="top-0 left-0 right-0 bottom-0 w-full h-full"
    
    >
      {children}
    </div>
  );
}
