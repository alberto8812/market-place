import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const animatioTrantionPages = () => {
  const transitionElement = document.getElementById("transition-element");

  if (transitionElement) {
    const tl = gsap.timeline();

    tl.set(transitionElement, {
      x: -50,
      opacity: 0,
    }).to(transitionElement, {
      x: 0,
      opacity: 1,
      duration: 0.8,
    });
  }
};

export const animationPageIn = () => {
  const branchShort = document.querySelectorAll(".brancShort");
  const brancName = document.querySelectorAll(".brancName");

  if (branchShort && brancName) {
    gsap.to(branchShort, {
      y: 0,
      stagger: 0.5,
      delay: 0.5,
      duration: 1,
    });

    gsap.to(brancName, {
      x: 0,
      delay: 0.9,
      duration: 1,
    });
  }
};

export const animationBackGroundPage = () => {
  const cuadrado1 = document.querySelector(".cuadrado1");
  if (!cuadrado1) {
    return;
  }

  let tl = gsap.timeline({
    repeat: 3,
  });
  tl.from(cuadrado1, {
    duration: 1.5,
    rotate: 360,
    x: 500,
  });
};
export const backgroundCard = () => {
  const BackGroundContainerAnimation = document.querySelectorAll(
    ".BackGroundContainer_Animation"
  );
  const icon_2BackGround = document.querySelector(".icon2");
  const icon_3BackGround = document.querySelector(".icon3");
  const icon_4BackGround = document.querySelector(".icon4");
  const icon_5BackGround = document.querySelector(".icon5");
  const icon_6BackGround = document.querySelector(".icon6");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: BackGroundContainerAnimation,
      start: "top top",
      end: "100% 100%",
       scrub: true,
       pin: true,
       markers: true
    },
  });

  // ICON 2

  tl.to(icon_2BackGround, {
    opacity: 1,
    y: "-200vh",
    duration: 2,
    rotate: 15,
    scale: 2,
  });

  tl.to(icon_2BackGround, {
    y: "-200vh",
    duration: 1.5,
  });

  // END ICON 2

  // icon 3

  tl.to(icon_3BackGround, {
    opacity: 1,
    y: "-85vh",
    duration: 2,
    rotate: -15,
    scale: 2,
  });

  tl.to(icon_3BackGround, {
    y: "-150vh",
    duration: 1.5,
  });

  // en icon 3

  // ICON 4

  tl.to(icon_4BackGround, {
    opacity: 1,
    y: "-65vh",
    duration: 6,
    rotate: 15,
    scale: 2,
  });

  tl.to(icon_4BackGround, {
    y: "-100vh",
    duration: 3.5,
  });

  // END ICON 4

  // icon 5

  tl.to(icon_5BackGround, {
    opacity: 1,
    y: "-75vh",
    duration: 4,
    rotate: -15,
    scale: 2,
  });

  tl.to(icon_5BackGround, {
    y: "-50vh",
    duration: 3.5,
  });

  // ICON 6

  tl.to(icon_6BackGround, {
    opacity: 1,
    y: "-20vh",
    duration: 6,
    rotate: 15,
    scale: 2,
  });

  tl.to(icon_6BackGround, {
    y: "-10vh",
    duration: 3.5,
  });

  // // END ICON 6
};
