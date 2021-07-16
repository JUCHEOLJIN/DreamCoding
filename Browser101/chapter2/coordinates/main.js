// 성능 개선해보기!
"use strict";
const horizontal = document.querySelector(".horizontal");
const vertical = document.querySelector(".vertical");
const target = document.querySelector(".target");
const tag = document.querySelector(".tag");

addEventListener("load", (event) => {
  const targetRect = target.getBoundingClientRect();
  const targetHalfWidth = targetRect.width / 2;
  const targetHalfHeight = targetRect.height / 2;

  document.addEventListener("mousemove", (event) => {
    let X = event.clientX;
    let Y = event.clientY;
    horizontal.style.transform = `translateY(${Y}px)`;
    vertical.style.transform = `translateX(${X}px)`;
    target.style.transform = `translate(${X - targetHalfWidth}px, ${
      Y - targetHalfHeight
    }px)`;
    tag.style.transform = `translate(${X + 20}px, ${Y + 20}px)`;
    tag.innerHTML = `${X}px, ${Y}px`;
  });
});
