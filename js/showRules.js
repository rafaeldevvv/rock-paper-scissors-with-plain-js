import { elt } from "./utilities.js";

export default function showRules(showRulesForOriginalGame) {
  const rulesSrc =
    showRulesForOriginalGame
      ? "./images/image-rules.svg"
      : "./images/image-rules-bonus.svg";

  const rulesModal = elt(
    "div",
    { id: "rules-modal" },
    elt(
      "div",
      { className: "top" },
      elt("h2", null, "Rules"),
      elt("img", {
        src: "./images/icon-close.svg",
        alt: "Close Icon",
        className: "close-icon",
        onclick: () => {
          rulesModal.remove();
        },
      })
    ),
    elt("img", {
      src: rulesSrc,
      alt: "Game's rules",
    })
  );

  document.body.appendChild(rulesModal);
}
