"use strict";

const target = document.querySelector(".target");
const target2 = document.querySelector(".target2");

function moveAt(pageX, pageY) {
  // 마우스 가운데에 오도록!
  target.style.left = pageX - target.offsetWidth / 2 + "px";
  target.style.top = pageY - target.offsetHeight / 2 + "px";
}

function moveAt2(pageX, pageY) {
  // 마우스 가운데에 오도록!
  target2.style.left = pageX + 50 + "px";
  target2.style.top = pageY - target2.offsetHeight / 2 + "px";
}

function onMouseMove(event) {
  moveAt(event.pageX, event.pageY);
}

function onMouseMove2(event) {
  moveAt2(event.pageX, event.pageY);
}

function updateCoordinate(event) {
  target2.innerHTML = `
        X : ${event.pageX} <br/>
        Y : ${event.pageY}
    `;
}

document.addEventListener("mousemove", onMouseMove);
document.addEventListener("mousemove", onMouseMove2);
document.addEventListener("mousemove", updateCoordinate);
