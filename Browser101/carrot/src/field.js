"use strict";

import * as sound from "./sound.js";

const IMG_SIZE = 80;
const carrotSound = new Audio("sound/carrot_pull.mp3");
const bugSound = new Audio("sound/bug_pull.mp3");

export const ItemType = Object.freeze({
  carrot: "carrot",
  bug: "bug",
});

export class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener("click", this.onClick);
  }

  onCreate() {
    this.field.innerHTML = "";
    this._addItem(ItemType.carrot, this.carrotCount, "img/carrot.png");
    this._addItem(ItemType.bug, this.bugCount, "img/bug.png");
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  _addItem(className, count, imgPath) {
    // 아이템 생성
    let x1 = 0;
    let y1 = 0;
    let x2 = this.fieldRect.width - IMG_SIZE;
    let y2 = this.fieldRect.height - IMG_SIZE;
    for (let i = 1; i <= count; i++) {
      let item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imgPath);
      item.style.position = "absolute";
      const x = randomNumber(x2, x1);
      const y = randomNumber(y2, y1);
      item.style.top = `${y}px`;
      item.style.left = `${x}px`;
      this.field.appendChild(item);
    }
  }

  onClick = (event) => {
    const target = event.target;
    if (target.className === ItemType.carrot) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    }
    if (target.className === ItemType.bug) {
      sound.playBug();
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  };
}

function randomNumber(max, min) {
  // 난수 만들기(위치)
  const number = Math.random() * (max - min) + min;
  return number;
}
