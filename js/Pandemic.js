export class Player {
  constructor() {
    this.cards = [];
    this.infection = 0;
    this.research = 0;
    this.interval = 10000;
    this.increase = 1;
    this.loss = false;
    this.win = false;
  }

  infectIncrease(){
    setInterval(() => {
      this.infection += this.increase;
      if(this.infection >= 100) {
        clearInterval();
        this.loss = true;
      }
    }, this.interval);
  }
}
