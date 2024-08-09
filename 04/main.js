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
  console.log(arrow);
  return (
    tlLeave.fromTo(arrow, { opacity: 1, y: 0 }, { opacity: 0, y: 50 }),
    tlLeave.fromTo(
      product,
      { opacity: 1, y: 0 },
      { opacity: 0, y: 100, onComplete: done },
      "<"
    ),
    tlLeave.fromTo(text, { y: 0, opacity: 1 }, { opacity: 0, y: -100 }, "<"),
    tlLeave.fromTo(circle, { y: 0, opacity: 1 }, { y: -200, opacity: 0 }, "<")
  );
};
const enterAnimation = (current, done, gradient) => {
  const product = current.querySelector(".image-container");
  const text = current.querySelector(".showcase-text");
  const circle = current.querySelectorAll(".circle");
  const arrow = current.querySelector(".showcase-arrow");
  tlEnter.set("body", { background: gradient });
  return (
    tlEnter.fromTo(arrow, { opacity: 0, y: 50 }, { opacity: 1, y: 0 }),
    tlEnter.fromTo(
      product,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, onComplete: done },
      "<"
    ),
    tlEnter.fromTo(text, { y: -100, opacity: 0 }, { opacity: 1, y: 0 }, "<"),
    tlEnter.fromTo(
      circle,
      { y: -200, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15 },
      "<"
    )
  );
};
barba.init({
  preventRunning: true,
  transitions: [
    {
      name: "default",
      once(data) {
        const done = this.async();
        let next = data.next.container;
        let gradient = changeGradient(data.next.namespace);
        gsap.to("body", { background: gradient });
        enterAnimation(next, done, gradient);
      },
      leave(data) {
        // create your stunning leave animation here
        const done = this.async();
        let currentPage = data.current.container;
        leaveAnimation(currentPage, done);
      },
      enter(data) {
        // create your amazing enter animation here
        const done = this.async();
        let next = data.next.container;
        let gradient = changeGradient(data.next.namespace);
        enterAnimation(next, done, gradient);
      },
    },
    {
      name: "product-page",
      sync: true,
      from: {
        namespace: ["handbag", "hat", "boot"],
      },
      to: {
        namespace: ["product"],
      },
      leave(data) {
        const done = this.async();
        let current = data.current.container;

        productLeavePageTransition(current, done);
      },
      enter(data) {
        const done = this.async();
        let next = data.next.container;

        productEnterPageTransition(next, done);
      },
    },
    {
      name: "product-page",
      sync: true,
      from: {
        namespace: ["product"],
      },
      to: {
        namespace: ["handbag"],
      },
      leave(data) {
        const done = this.async();
        let current = data.current.container;

        productLeavePageTransition(current, done);
      },
      enter(data) {
        const done = this.async();
        let next = data.next.container;

        gsap.set("body", {
          background: "linear-gradient(260deg, #b75d62, #754d4f)",
        });
        productEnterPageTransition(next, done);
      },
    },
  ],
});
function changeGradient(name) {
  switch (name) {
    case "handbag":
      return "linear-gradient(260deg, #b75d62, #754d4f)";
    case "boot":
      return "linear-gradient(260deg, #5d8cb7, #4c4f70)";
    case "hat":
      return "linear-gradient(260deg, #b27a5c, #7f5450)";
  }
}
function productEnterPageTransition(next, done) {
  tlEnter.fromTo(next, { y: "100%" }, { y: 0, ease: "power3.out" });
  tlEnter.fromTo(
    ".card",
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      onComplete: done,
    }
  );
}
function productLeavePageTransition(current, done) {
  tlLeave.fromTo(current, { y: 0 }, { y: "100%", onComplete: done });
}
