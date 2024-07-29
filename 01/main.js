import { gsap } from "gsap";
const tl = gsap.timeline({defaults: {duration: 1}})
tl.fromTo('.cookie-container', {scale: 0, }, {scale: 1,ease: "elastic.out(1.2,0.75)", duration:2,})
tl.fromTo('.cookie', {opacity: 0, x: -45, rotation: '-45deg'}, {opacity: 1, x:0, rotation: '0deg'}, "<50%")
tl.fromTo('.text', {opacity: 0, x:50, }, {opacity: 1, x:0}, '<')
tl.fromTo('.cookie', {y: 0, rotation: '0deg'}, {y:-25 , yoyo:true, repeat:-1, rotation:'-15deg', duration: 0.7})
tl.fromTo('#crumbs', {y: 0, rotation: '0deg'}, {y:-10 , yoyo:true, repeat:-1, rotation:'-10deg', duration: 0.7}, '<')