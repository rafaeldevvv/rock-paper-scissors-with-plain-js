import { elt } from "./utilities.js";

export function renderGesture(gesture, highlighted, onClick) {
  const gestureDOM = elt(
    "div",
    {
      className: `gesture ${gesture.name} ${highlighted ? "highlighted" : ""}`,
      title: gesture.name,
      onclick: () => {
        if (onClick) onClick(gesture);
      },
    },
    elt("img", {
      src: `./images/icon-${gesture.name}.svg`,
      alt: `${gesture.name}'s Icon`,
      className: "icon",
    })
  );
  return gestureDOM;
}

// I made this function return an array with the score DOM node because I didn't want
// to pollute the App class
export function renderHeader(renderHeaderForOriginalGame) {
  const logoSrc = renderHeaderForOriginalGame
    ? "./images/logo.svg"
    : "./images/logo-bonus.svg";

  const scoreNumberDOM = elt("span", { className: "score" });
  return [
    elt(
      "header",
      null,
      elt("img", {
        className: "logo",
        src: logoSrc,
        alt: "Game's logo",
      }),
      elt(
        "div",
        { className: "score-container" },
        elt("span", { className: "text" }, "Score"),
        scoreNumberDOM
      )
    ),
    scoreNumberDOM,
  ];
}

// This will render the game.
export function renderGame(game) {
  const { status, dom, playerGesture, houseGesture, gestures, onPick } = game;

  if (status === "picking") {
    dom.appendChild(renderPick(gestures, onPick));
  } else if (status === "house_picking" || status === "house_picked") {
    dom.appendChild(renderSelectedGestures(playerGesture, houseGesture));
  } else if (status === "won" || status === "lost" || status === "tie") {
    dom.appendChild(
      renderGameConclusion(status, playerGesture, houseGesture, () =>
        game.restart()
      )
    );
  } else {
    throw new Error("Unknown status: " + status);
  }
}

export function renderPick(gestures, onPick) {
  return elt(
    "div",
    { className: gestures.length === 3 ? "original-pick" : "bonus-pick" },
    ...gestures.map((g) => {
      return renderGesture(g, false, onPick);
    })
  );
}

export function renderSelectedGestures(
  playerGesture,
  houseGesture,
  highlightPlayer
) {
  const houseGestureDOM =
    houseGesture === null
      ? elt("div", { className: "gesture empty" })
      : renderGesture(houseGesture);

  return elt(
    "div",
    { className: "two-gesture-container" },
    renderGesture(playerGesture, highlightPlayer),
    houseGestureDOM,
    elt("p", { className: "player-pick-message pick-message" }, "You picked"),
    elt(
      "p",
      { className: "house-pick-message pick-message" },
      "The house picked"
    )
  );
}

export function renderGameConclusion(
  status,
  playerGesture,
  houseGesture,
  onPlayAgain
) {
  let message;
  if (status === "won") {
    message = "You win";
  } else if (status === "lost") {
    message = "You lose";
  } else if ("tie") {
    message = "Tie";
  }

  return elt(
    "div",
    { className: "game-conclusion" },
    renderGesture(playerGesture, true),
    renderGesture(houseGesture),
    elt("p", { className: "player-pick-message pick-message" }, "You picked"),
    elt(
      "p",
      { className: "house-pick-message pick-message" },
      "The house picked"
    ),
    renderMessage(message, onPlayAgain)
  );
}

function renderMessage(message, onPlayAgain) {
  return elt(
    "div",
    { className: "message-container" },
    elt("p", { className: "message" }, message),
    elt(
      "button",
      {
        className: "secondary-btn btn",
        onclick: () => {
          onPlayAgain();
        },
      },
      "Play again"
    )
  );
}

export function renderBottomButtons(onShowRules, onChangeGame) {
  return elt(
    "div",
    { className: "buttons" },
    elt(
      "button",
      {
        className: "primary-btn btn",
        onclick: () => {
          {
            onShowRules();
          }
        },
      },
      "Rules"
    ),
    elt(
      "button",
      {
        className: "switch-btn primary-btn btn",
        onclick: () => onChangeGame(),
      },
      elt("i", { className: "fa-solid fa-repeat" }),
      " Original/bonus"
    )
  );
}

export function renderFooter() {
  return elt(
    "footer",
    null,
    elt(
      "p",
      null,
      "Challenge by ",
      elt(
        "a",
        {
          href: "https://www.frontendmentor.io?ref=challenge",
          target: "_blank",
        },
        "Frontend Mentor"
      ),
      ". Coded by ",
      elt(
        "a",
        { href: "https://github.com/rafaeldevvv", target: "_blank" },
        "Rafael Maia"
      )
    )
  );
}
