import { gsap } from "gsap";
const tl = gsap.timeline({ defaults: { duration: 0.75, ease: "power3.out" } });
const containers = document.querySelectorAll(".input-container");
const start =
  "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";
const end =
  "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";
containers.forEach((container) => {
  const input = container.querySelector(".input");
  const line = container.querySelector(".elastic-line");
  const placeHolder = container.querySelector(".placeholder");
  input.addEventListener("focus", () => {
    if (!input.value) {
      tl.fromTo(
        line,
        { attr: { d: start } },
        { attr: { d: end }, duration: 0.4 }
      );
    }
    tl.to(line, { attr: { d: start }, ease: "elastic.out(2,0.3)" }, "<50%");
    tl.to(placeHolder, { y: -15, scale: 0.8 }, "<");
  });
});

document.addEventListener("click", () => {
  containers.forEach((container) => {
    const input = container.querySelector(".input");
    // const line = container.querySelector(".elastic-line");
    const placeHolder = container.querySelector(".placeholder");

    if(document.activeElement !== input){
      if(!input.value){
        gsap.to(placeHolder, {y:0, scale: 1, })
      }
    }
  });
});
