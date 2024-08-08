import barba from "@barba/core";
import { gsap } from "gsap";
const tlLeave = gsap.timeline({
  defaults: { duration: 0.75, ease: "power3.out" },
});
const tlEnter = gsap.timeline({
  defaults: { duration: 0.75, ease: "power3.out" },
});
const leaveAnimation = (current, done) => {
  const product = current.querySelector(".image-container");
  const text = current.querySelector(".showcase-text");
  
  const circle = current.querySelectorAll(".circle");
  const arrow = current.querySelector(".showcase-arrow");
  console.log(arrow)
  return (
    tlLeave.fromTo(arrow, { opacity: 1, y: 0 }, { opacity: 0, y: 50 }),
    tlLeave.fromTo(product, { opacity: 1, y: 0 }, { opacity: 0, y: 100, onComplete: done}, "<"),
    tlLeave.fromTo(
      text,
      { y: 0, opacity: 1 },
      { opacity: 0, y: -100,  },
      "<"
    ),
    tlLeave.fromTo(circle, {y: 0, opacity: 1}, {y: -200, opacity: 0,  }, "<")
  );
};
const enterAnimation = (current, done) => {
  const product = current.querySelector(".image-container");
  const text = current.querySelector(".showcase-text");
  const circle = current.querySelectorAll(".circle");
  const arrow = current.querySelector(".showcase-arrow");
  console.log(arrow)
  return (
    tlLeave.fromTo(arrow, { opacity: 0, y: 50 }, { opacity: 1, y: 0 }),
    tlLeave.fromTo(product, { opacity: 0, y: 100 }, { opacity:1, y: 0, onComplete: done}, "<"),
    tlLeave.fromTo(
      text,
      { y: -100, opacity: 0 },
      { opacity:1, y: 0,  },
      "<"
    ),
    tlLeave.fromTo(circle, {y: -200, opacity: 0}, {y: 0, opacity: 1, stagger: 0.15, }, "<")
  );
};
barba.init({
  preventRunning: true,
  transitions: [
    {
      name: "default",
      leave(data) {
        // create your stunning leave animation here
        const done = this.async();
        let currentPage = data.current.container;
        console.log(currentPage)
        leaveAnimation(currentPage, done);
      },
      enter(data) {
        // create your amazing enter animation here
        const done = this.async();
        let next = data.next.container;
        enterAnimation(next, done)
      },
    },
  ],
});
