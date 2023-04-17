"use strict";

import { elt, getRandomItem } from "./utilities.js";
import showRules from "./showRules.js";
import { originalGestures, bonusGestures } from "./gestures.js";
import {
  renderHeader,
  renderGame,
  renderBottomButtons,
  renderFooter,
} from "./rendering.js";

if (!localStorage.getItem("isOriginalGame")) {
  localStorage.setItem("isOriginalGame", true);
}

class Game {
  constructor(gestures, onEnd) {
    this.status = "picking";
    this.gestures = gestures;
    this.onEnd = onEnd;

    this.playerGesture = null;
    this.houseGesture = null;

    this.dom = elt("div", { className: "game" });

    // We have to bind onPick to this because if we pass it down without doing it
    // the this inside the onPick method will not hold the game object
    this.onPick = this.onPick.bind(this);

    this.syncState(this.status);
  }

  onPick(pickedGesture) {
    this.playerGesture = pickedGesture;

    this.syncState("house_picking");

    setTimeout(() => {
      this.houseGesture = getRandomItem(this.gestures);
      this.syncState("house_picked");
    }, 750);

    setTimeout(() => {
      let newStatus;
      if (this.playerGesture.beats(this.houseGesture)) {
        newStatus = "won";
      } else if (this.houseGesture.beats(this.playerGesture)) {
        newStatus = "lost";
      } else {
        newStatus = "tie";
      }

      this.onEnd(newStatus);
      this.syncState(newStatus);
    }, 1750);
  }

  restart() {
    this.playerGesture = null;
    this.houseGesture = null;
    this.syncState("picking");
  }

  syncState(status) {
    this.status = status;
    this.dom.textContent = "";
    renderGame(this);
  }
}

class App {
  constructor() {
    // I stored the score here because I thought of the game as something
    // separate from it.
    this.score = Number(localStorage.getItem("score")) || 0;
    const isOriginalGame = localStorage.getItem("isOriginalGame") === "true";

    const [header, scoreDOM] = renderHeader(isOriginalGame);
    this.headerDOM = elt("div", null, header);
    this.scoreDOM = scoreDOM;
    this.scoreDOM.textContent = this.score;

    const game = new Game(
      isOriginalGame ? originalGestures : bonusGestures,
      (status) => this.updateScore(status) // When the game ends, it calls this function
    );
    this.gameDOM = elt("div", null, game.dom);

    // The function to show the rules and change the game, respectively
    const buttons = renderBottomButtons(
      () => showRules(localStorage.getItem("isOriginalGame") === "true"),
      () => this.changeGame()
    );

    const footer = renderFooter();

    this.dom = elt(
      "div",
      { id: "wrapper" },
      this.headerDOM,
      this.gameDOM,
      buttons,
      footer
    );
  }

  updateScore(status) {
    if (status === "won") {
      this.score += 1;
      this.scoreDOM.textContent = this.score;
      localStorage.setItem("score", this.score);
    } else if (status === "lost") {
      if (this.score > 0) this.score -= 1;
      this.scoreDOM.textContent = this.score;
      localStorage.setItem("score", this.score);
    }
  }

  changeGame() {
    const isOriginalGame = localStorage.getItem("isOriginalGame") === "true";

    // It uses "!" because we need to render the header for the new game
    const [newHeader, newScoreDOM] = renderHeader(!isOriginalGame);
    newScoreDOM.textContent = this.score;
    
    const newGame = new Game(
      isOriginalGame ? bonusGestures : originalGestures,
      (status) => {
        this.updateScore(status);
      }
    );

    this.headerDOM.textContent = "";
    this.headerDOM.appendChild(newHeader);

    this.scoreDOM = newScoreDOM;

    this.gameDOM.textContent = "";
    this.gameDOM.appendChild(newGame.dom);

    localStorage.setItem("isOriginalGame", !isOriginalGame);
  }
}

function run() {
  const app = new App();
  document.body.appendChild(app.dom);
}

run();
