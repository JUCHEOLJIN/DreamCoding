"use strict";
import Modal from "./modal.js";
import { GameBuilder, Reason } from "./game.js";
import * as sound from "./sound.js";

const CARROT_COUNT = 20;
const BUG_COUNT = 30;
const GAME_DEFAULT_TIME = 20;

const gameFinishBanner = new Modal();

const game = new GameBuilder()
  .withGameDuration(10)
  .withCarrotCount(10)
  .withBugCount(10)
  .build();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = "Replay ❓";
      sound.playAlert();
      break;
    case Reason.win:
      message = "You Won 🎉";
      sound.playWin();
      break;
    case Reason.lose:
      message = "You Lost 🥲";
      sound.playBug();
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
