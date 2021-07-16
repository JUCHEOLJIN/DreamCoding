"use strict";
const horizontal = document.querySelector(".horizontal");
const vertical = document.querySelector(".vertical");
const target = document.querySelector(".target");
const tag = document.querySelector(".tag");

document.addEventListener("mousemove", (event) => {
  let X = event.clientX;
  let Y = event.clientY;
  horizontal.style.top = `${Y}px`;
  vertical.style.left = `${X}px`;
  target.style.top = `${Y}px`;
  target.style.left = `${X}px`;
  tag.style.top = `${Y}px`;
  tag.style.left = `${X}px`;
  tag.innerHTML = `${X}px, ${Y}px`;
});
