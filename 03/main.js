import { gsap } from "gsap";
const tl = gsap.timeline({defaults: { duration:1 }})
const containers = document.querySelectorAll(".input-container");
const start =
  "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";
const end =
  "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";
containers.forEach((container) => {

  const input = container.querySelector(".input");
  const line = container.querySelector(".elastic-line");
  input.addEventListener("focus", () => {
    if (!input.value) {
      tl.fromTo(line, { attr: { d: start } }, { attr: { d: end }});
    }
    tl.to(line, { attr: { d: start }, ease: "elastic.out(2,0.5)",}, "<50%")
  });
});
