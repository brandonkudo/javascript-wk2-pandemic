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
    this.turntimer = 20000;
    this.turn = false;
    this.cards = [];
    this.infection = 0;
    this.research = 0;
    this.interval = 10000;
    this.increase = 10;
    this.loss = false;
    this.win = false;
  }
  dealCards(yes){
    const cards = ["Infection Strength Increase", "Decrease Research", "Infection Strength Decrease",  "Increase Research", "Increase Infection", "Temporary Cure", "Reset Infection", "Decrease Infection"];
    if(yes != true) {
      for (var i = 0; i < 5; i++) {
        let number = Math.floor(Math.random() * 100);
        if(number <= 5) {
          //Temporary Cure
          this.cards.push(cards[5]);
        } else if(number <= 15) {
          //Reset Infection
          this.cards.push(cards[6]);
        } else if(number <= 25) {
          //Strength Increase
          this.cards.push(cards[0]);
        } else if(number <= 35) {
          //Strength Decrease
          this.cards.push(cards[2]);
        } else if (number <= 45) {
          //Decrease Research
          this.cards.push(cards[1]);
        } else if (number <= 75) {
          //Increase Research
          this.cards.push(cards[3]);
        } else if (number <= 12.5) {
          //Increase Infection
          this.cards.push(cards[4]);
        } else {
          //Decrease Infection
          this.cards.push(cards[7]);
        }
      }
    } else {
      let number = Math.floor(Math.random() * 100);
      if(number <= 5) {
        //Temporary Cure
        this.cards.push(cards[5]);
      } else if(number <= 15) {
        //Reset Infection
        this.cards.push(cards[6]);
      } else if(number <= 25) {
        //Strength Increase
        this.cards.push(cards[0]);
      } else if(number <= 35) {
        //Strength Decrease
        this.cards.push(cards[2]);
      } else if (number <= 45) {
        //Decrease Research
        this.cards.push(cards[1]);
      } else if (number <= 75) {
        //Increase Research
        this.cards.push(cards[3]);
      } else if (number <= 12.5) {
        //Increase Infection
        this.cards.push(cards[4]);
      } else {
        //Decrease Infection
        this.cards.push(cards[7]);
      }
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
      console.log("tick");
    }, this.interval);
  }

  playCard(card, target){
    if(card === "Infection Strength Increase") {
      target.increase += 10;
      let cardToRemove = this.cards.indexOf("Infection Strength Increase");
      this.cards.splice(cardToRemove, 1);
    } else if(card === "Increase Infection") {
      target.infection += 10;
      let cardToRemove = this.cards.indexOf("Increase Infection");
      this.cards.splice(cardToRemove, 1);
    } else if(card === "Decrease Research") {
      target.research -= 10;
      let cardToRemove = this.cards.indexOf("Decrease Research");
      this.cards.splice(cardToRemove, 1);
    } else if(card === "Infection Strength Decrease") {
      this.increase -= 10;
      let cardToRemove = this.cards.indexOf("Infection Strength Decrease");
      this.cards.splice(cardToRemove, 1);
    } else if(card === "Temporary Cure") {
      this.infection = 0;
      let cardToRemove = this.cards.indexOf("Temporary Cure");
      this.cards.splice(cardToRemove, 1);
    } else if(card === "Increase Research") {
      this.researchIncrease();
      let cardToRemove = this.cards.indexOf("Increase Research");
      this.cards.splice(cardToRemove, 1);
    } else if(card === "Reset Infection") {
      target.increase = 10;
      let cardToRemove = this.cards.indexOf("Reset Infection");
      this.cards.splice(cardToRemove, 1);
    } else if(card === "Decrease Infection") {
      this.infection -= 10;
      let cardToRemove = this.cards.indexOf("Decrease Infection");
      this.cards.splice(cardToRemove, 1);
    }
    this.dealCards(true);
  }

  researchIncrease() {
    this.research += 20;
    if(this.research >= 100){
      this.win = true;
    }
  }
}
