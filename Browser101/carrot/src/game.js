"use strict";

import { Field, ItemType } from "./field.js";
import * as sound from "./sound.js";

export const Reason = Object.freeze({
  win: "win",
  lose: "lose",
  cancel: "cancel",
});

export class GameBuilder {
  withGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }
  withCarrotCount(num) {
    this.carrotCount = num;
    return this;
  }
  withBugCount(num) {
    this.bugCount = num;
    return this;
  }

  build() {
    return new Game(
      this.gameDuration, //
      this.carrotCount, //
      this.bugCount //
    );
  }
}

class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.gameTimer = document.querySelector(".game__timer");
    this.gameScore = document.querySelector(".game__score");
    this.gameBtn = document.querySelector(".game__button");
    this.gameBtn.addEventListener("click", () => {
      if (this.isStarted) {
        this.stop(Reason.cancel);
      } else {
        this.start();
      }
    });
    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onItemClick);
    this.score = 0;
    this.isStarted = false;
    this.timer = undefined;
  }
  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  onItemClick = (item) => {
    if (item === "carrot") {
      this.score++;
      this.updateCarrot(this.carrotCount - this.score);
      if (this.score === this.carrotCount) {
        this.stop(Reason.win);
      }
    }
    if (item === "bug") {
      this.stop(Reason.lose);
    }
  };

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  start() {
    this.score = 0;
    this.isStarted = true;
    this.gameField.onCreate();
    this.showStopBtn();
    this.showTimerAndScore();
    this.startTimer();
    this.updateCarrot(this.carrotCount);
    sound.playBackground();
  }

  stop(reason) {
    this.isStarted = false;
    this.stopTimer();
    this.hidePlayBtn();
    sound.stopBackground();
    this.onGameStop && this.onGameStop(reason);
  }

  startTimer() {
    let remainingTime = this.gameDuration;
    this.printTime(remainingTime);
    this.timer = setInterval(() => {
      if (remainingTime <= 0) {
        clearInterval(timer);
        return;
      }
      this.printTime(--remainingTime);
      if (remainingTime === 0) {
        this.stop(Reason.lose);
      }
    }, 1000);
  }

  printTime(remainingTime) {
    let min = Math.floor(remainingTime / 60);
    let sec = remainingTime % 60;
    this.gameTimer.innerHTML = `${min}:${sec}`;
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = "visible";
    this.gameScore.style.visibility = "visible";
  }

  hidePlayBtn() {
    this.gameBtn.style.visibility = "hidden";
  }

  showStopBtn() {
    const playBtn = this.gameBtn.querySelector(".fas");
    playBtn.classList.add("fa-stop");
    playBtn.classList.remove("fa-play");
    this.gameBtn.style.visibility = "visible";
  }

  updateCarrot(carrot) {
    this.gameScore.innerHTML = `${carrot}`;
  }
}
