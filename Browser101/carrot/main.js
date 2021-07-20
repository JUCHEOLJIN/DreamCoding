"use strict";

const body = document.querySelector("body");
const gameBtn = document.querySelector(".game__button");
const refreshBtn = document.querySelector(".modal__refresh");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");
const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const modal = document.querySelector(".modal");
const modalRefresh = document.querySelector(".modal__refresh");
const modalText = document.querySelector(".modal__message");
const bgSound = new Audio("sound/bg.mp3");
const carrotSound = new Audio("sound/carrot_pull.mp3");
const bugSound = new Audio("sound/bug_pull.mp3");
const alertSound = new Audio("sound/alert.wav");
const winSound = new Audio("sound/game_win.mp3");

const imgSize = 80;
const CARROT_COUNT = 20;
const BUG_COUNT = 30;
const GAME_DEFAULT_TIME = 20;
let score = 0;
let isStarted = false;
let timer = undefined;

// 게임 초기화 하는 함수
function onCreate() {
  addItem("carrot", CARROT_COUNT, "img/carrot.png");
  addItem("bug", BUG_COUNT, "img/bug.png");
}

// 게임 아이템들을 생성하는 함수
function addItem(className, count, imgPath) {
  // 아이템 생성
  let x1 = 0;
  let y1 = 0;
  let x2 = fieldRect.width - imgSize;
  let y2 = fieldRect.height - imgSize;
  for (let i = 1; i <= count; i++) {
    let item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";
    const x = randomNumber(x2, x1);
    const y = randomNumber(y2, y1);
    item.style.top = `${y}px`;
    item.style.left = `${x}px`;
    field.appendChild(item);
  }
}

// 아이템들의 위치를 랜덤하게 할 수 있도록 랜덤 숫자 생성하는 함수
function randomNumber(max, min) {
  // 난수 만들기(위치)
  const number = Math.random() * (max - min) + min;
  return number;
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

gameBtn.addEventListener("click", () => {
  if (isStarted) {
    stopGame();
  } else {
    startGame();
  }
});

field.addEventListener("click", onItemClick);

modalRefresh.addEventListener("click", refreshGame);

function startGame() {
  score = 0;
  isStarted = true;
  field.innerHTML = "";
  onCreate();
  showStopBtn();
  showTimerAndScore();
  startTimer();
  updateCarrot(CARROT_COUNT);
  playSound(bgSound);
}

function stopGame() {
  isStarted = false;
  stopTimer();
  hidePlayBtn();
  showModalWithText("Replay❓");
  stopSound(bgSound);
}

function refreshGame() {
  startGame();
  hideModal();
}

function showStopBtn() {
  const playBtn = gameBtn.querySelector(".fas");
  playBtn.classList.add("fa-stop");
  playBtn.classList.remove("fa-play");
  gameBtn.style.visibility = "visible";
}

function hidePlayBtn() {
  gameBtn.style.visibility = "hidden";
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function startTimer() {
  let remainingTime = GAME_DEFAULT_TIME;
  printTime(remainingTime);
  timer = setInterval(() => {
    if (remainingTime <= 0) {
      clearInterval(timer);
      return;
    }
    printTime(--remainingTime);
    timeOver(remainingTime);
  }, 1000);
  if (remainingTime === 0) {
  }
}

function stopTimer() {
  clearInterval(timer);
}

function printTime(remainingTime) {
  let min = Math.floor(remainingTime / 60);
  let sec = remainingTime % 60;
  gameTimer.innerHTML = `${min}:${sec}`;
}

function showModalWithText(text) {
  modal.classList.remove("modal--hide");
  modalText.innerHTML = `${text}`;
  stopSound(bgSound);
}

function hideModal() {
  modal.classList.add("modal--hide");
}

function updateCarrot(carrot) {
  gameScore.innerHTML = `${carrot}`;
}

function onItemClick(event, currentCarrot) {
  if (event.target.className === "carrot") {
    event.target.remove();
    playSound(carrotSound);
    score++;
    updateCarrot(CARROT_COUNT - score);
    if (score === CARROT_COUNT) {
      gameClear();
    }
  }
  if (event.target.className === "bug") {
    playSound(bugSound);
    gameOver();
  }
}

function gameOver() {
  showModalWithText("You Lose 🥲");
  stopTimer();
  hidePlayBtn();
  playSound(alertSound);
}

function gameClear() {
  showModalWithText("You Won 🎉");
  stopTimer();
  hidePlayBtn();
  playSound(winSound);
}

function timeOver(time) {
  if (time === 0) {
    gameOver();
  }
}
