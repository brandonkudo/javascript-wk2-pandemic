import { Player } from "./../js/Pandemic.js";

describe('infectIncrease', function() {
  let player1 = new Player();

  beforeEach(function() {
    jasmine.clock().install();
    player1.infectIncrease();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('should have infection level of 0 on creation', function() {
    expect(player1.infection).toEqual(0);
  });

  it('should have a infection level of 1 after 10001 milliseconds', function() {
    jasmine.clock().tick(10001);
    expect(player1.infection).toEqual(1);
  });

  it('should break loop and return false if infection gets over 100', function() {
    jasmine.clock().tick(999999);
    expect(player1.loss).toEqual(true);
  });
});
