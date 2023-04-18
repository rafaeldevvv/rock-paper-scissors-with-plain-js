// i know this is not ideal, but it works for this game;
let nextId = 0;
export class Gesture {
  constructor(name, ...losers) {
    this.id = nextId++;
    this.name = name;
    this.losers = new Set(losers);
  }
}
Gesture.prototype.beats = function (gesture) {
  return this.losers.has(gesture.name);
};

// Read it like "Scissors beat paper and lizard", "Paper beats rock and spock"
const scissors = new Gesture("scissors", "paper", "lizard");
const paper = new Gesture("paper", "rock", "spock");
const rock = new Gesture("rock", "lizard", "scissors");
const lizard = new Gesture("lizard", "spock", "paper");
const spock = new Gesture("spock", "scissors", "rock");

export const originalGestures = [scissors, paper, rock];

export const bonusGestures = [scissors, paper, rock, lizard, spock];
