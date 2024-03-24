
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    rotate:360,
    x: 500,
  });
};
export const backgroundCard = () => {
  const BackGroundContainerAnimation = document.querySelector(".BackGroundContainer_Animation");
  // if (!backgroundCard) {
  //   return;
  // }

  // let tl = gsap.timeline({
  //  scrollTrigger:{
  //   trigger:BackGroundContainerAnimation,//elemento a animar
  //   markers:true,
  //   start:'top top',
  //   scrub:3,
  //   end: '+=900 0',
  //   pin:BackGroundContainerAnimation
  //  }
  // });

  // tl.to(BackGroundContainerAnimation,{x:'1000',duration:2})


  const pointBackGround=document.querySelector('.icon1');
  const icon_2BackGround=document.querySelector('.icon2');
  const icon_3BackGround=document.querySelector('.icon3');
  const icon_4BackGround=document.querySelector('.icon4');
  const icon_5BackGround=document.querySelector('.icon5');
  const icon_6BackGround=document.querySelector('.icon6');

  const tl=gsap.timeline({
    scrollTrigger:{
      trigger:BackGroundContainerAnimation,
      markers:true,
      start:'top top',
      end:'100% 100%',
      scrub:true,
      pin:true
    }
  })



// ICON 2



  tl.to(icon_2BackGround,{
     opacity:1,
     y:'-95vh',
     duration:6,
     rotate:15,
     scale:2

  }, );




  tl.to(icon_2BackGround,{
    y:'-150vh',
    duration:3.5,
  })
  
  // END ICON 2
 
  // icon 3

  tl.to(icon_3BackGround,{
     opacity:1,
     y:'-75vh',
     duration:4,
     rotate:-15,
     scale:2

  })


  tl.to(icon_3BackGround,{

    y:'-150vh',
    duration:3.5,
 })


// en icon 3



// ICON 4



tl.to(icon_4BackGround,{
  opacity:1,
  y:'-45vh',
  duration:6,
  rotate:15,
  scale:2

}, );




tl.to(icon_4BackGround,{
 y:'-150vh',
 duration:3.5,
})

// END ICON 4

// icon 5

tl.to(icon_5BackGround,{
  opacity:1,
  y:'-35vh',
  duration:4,
  rotate:-15,
  scale:2

})


tl.to(icon_5BackGround,{

 y:'-150vh',
 duration:3.5,
})

// ICON 6



tl.to(icon_6BackGround,{
  opacity:1,
  y:'-10vh',
  duration:6,
  rotate:15,
  scale:2

}, );




tl.to(icon_6BackGround,{
 y:'-150vh',
 duration:3.5,
})

// END ICON 4



};
