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
    >
      {children}
    </div>
  );
}
