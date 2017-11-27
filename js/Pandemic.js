export class Game {
  constructor() {
    this.players = [];
    this.turn = 0;
  }

  setPlayers(amount){
    for(var i = 1; i <= amount; i++) {
      let player = new Player(i);
      this.players.push(player);
    }
  }
}

export class Player {
  constructor(id) {
    this.id = id;
    this.turntimer = 2000;
    this.turn = false;
    this.cards = [];
    this.infection = 0;
    this.research = 0;
    this.interval = 1000;
    this.increase = 10;
    this.loss = false;
    this.win = false;
  }
  dealCards(){
    const cards = ["Strength Increase", "Speed Increase", "Decrease Research", "Strength Decrease", "Speed Decrease", "Increase Research", "Decrease Turn Timer", "Increase Turn Timer"];
    for (var i = 0; i < 3; i++) {
      let number = Math.floor(Math.random() * 7.99);
      this.cards.push(cards[number]);
    }
  }
  infectIncrease(){
    const theinterval = setInterval(() => {
      this.infection += this.increase;
      if(this.infection >= 100) {
        this.loss = true;
        clearInterval(theinterval);
      }
      if(this.win === true) {
        clearInterval(theinterval);
      }
    }, this.interval);
  }

  playCard(card, target){
    if(card === "Strength Increase") {
      target.increase += 10;
    } else if(card === "Speed Increase") {
      target.interval -= 1000;
    } else if(card === "Decrease Research") {
      target.research -= 10;
    } else if(card === "Strength Decrease") {
      this.increase -= 10;
    } else if(card === "Speed Decrease") {
      this.interval += 1000;
    } else if(card === "Increase Research") {
      researchIncrease();
    } else if(card === "Decrease Turn Timer") {
      target.turntimer -= 10000;
    } else if(card === "Increase Turn Timer") {
      target.turntimer += 10000;
    }
    this.turn = false;
    return this.id;
  }

  researchIncrease() {
    this.research += 10;
    if(this.research >= 100){
      this.win = true;
    }
  }
}
