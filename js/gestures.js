// i know this is not ideal, but it works for this game;
let nextId = 0;
export class Gesture {
  constructor(name, ...losers) {
    this.id = nextId++;
    this.name = name;
    this.losers = losers;
  }
}
Gesture.prototype.beats = function (gesture) {
  return this.losers.includes(gesture.name);
};

const scissors = new Gesture("scissors", "paper", "lizard");
const paper = new Gesture("paper", "rock", "spock");
const rock = new Gesture("rock", "lizard", "scissors");
const lizard = new Gesture("lizard", "spock", "paper");
const spock = new Gesture("spock", "scissors", "rock");

export const originalGestures = [paper, scissors, rock];

export const bonusGestures = [scissors, paper, rock, lizard, spock];
