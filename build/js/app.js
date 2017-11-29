(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = exports.Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.players = [];
    this.turn = 0;
  }

  _createClass(Game, [{
    key: "setPlayers",
    value: function setPlayers(amount) {
      for (var i = 1; i <= amount; i++) {
        var player = new Player(i);
        this.players.push(player);
      }
    }
  }]);

  return Game;
}();

var Player = exports.Player = function () {
  function Player(id) {
    _classCallCheck(this, Player);

    this.id = id;
    this.turntimer = 20000;
    this.turn = false;
    this.cards = [];
    this.infection = 0;
    this.research = 0;
    this.interval = 20000;
    this.increase = 10;
    this.loss = false;
    this.win = false;
  }

  _createClass(Player, [{
    key: "dealCards",
    value: function dealCards(yes) {
      var cards = ["Infection Strength Increase", "Decrease Research", "Infection Strength Decrease", "Increase Research", "Increase Infection", "Temporary Cure", "Reset Infection Rate", "Decrease Infection"];
      if (yes != true) {
        for (var i = 0; i < 5; i++) {
          var number = Math.floor(Math.random() * 100);
          if (number <= 5) {
            //Temporary Cure
            this.cards.push(cards[5]);
          } else if (number <= 15) {
            //Reset Infection Rate
            this.cards.push(cards[6]);
          } else if (number <= 25) {
            //Strength Increase
            this.cards.push(cards[0]);
          } else if (number <= 35) {
            //Strength Decrease
            this.cards.push(cards[2]);
          } else if (number <= 45) {
            //Decrease Research
            this.cards.push(cards[1]);
          } else if (number <= 65) {
            //Increase Research
            this.cards.push(cards[3]);
          } else if (number <= 82.5) {
            //Increase Infection
            this.cards.push(cards[4]);
          } else {
            //Decrease Infection
            this.cards.push(cards[7]);
          }
        }
      } else {
        var _number = Math.floor(Math.random() * 100);
        if (_number <= 5) {
          //Temporary Cure
          this.cards.push(cards[5]);
        } else if (_number <= 15) {
          //Reset Infection Rate
          this.cards.push(cards[6]);
        } else if (_number <= 25) {
          //Strength Increase
          this.cards.push(cards[0]);
        } else if (_number <= 35) {
          //Strength Decrease
          this.cards.push(cards[2]);
        } else if (_number <= 45) {
          //Decrease Research
          this.cards.push(cards[1]);
        } else if (_number <= 75) {
          //Increase Research
          this.cards.push(cards[3]);
        } else if (_number <= 12.5) {
          //Increase Infection
          this.cards.push(cards[4]);
        } else {
          //Decrease Infection
          this.cards.push(cards[7]);
        }
      }
    }
  }, {
    key: "infectIncrease",
    value: function infectIncrease() {
      var _this = this;

      var theinterval = setInterval(function () {
        _this.infection += _this.increase;
        if (_this.infection >= 100) {
          _this.loss = true;
          clearInterval(theinterval);
        }
        if (_this.win === true) {
          clearInterval(theinterval);
        }
        console.log("tick");
      }, this.interval);
    }
  }, {
    key: "playCard",
    value: function playCard(card, target) {
      if (card === "Infection Strength Increase") {
        target.increase += 10;
        var cardToRemove = this.cards.indexOf("Infection Strength Increase");
        this.cards.splice(cardToRemove, 1);
      } else if (card === "Increase Infection") {
        target.infection += 10;
        if (target.infection >= 100) {
          target.loss = true;
        }
        var _cardToRemove = this.cards.indexOf("Increase Infection");
        this.cards.splice(_cardToRemove, 1);
      } else if (card === "Decrease Research") {
        target.research -= 10;
        if (target.research < 0) {
          target.research = 0;
        }
        var _cardToRemove2 = this.cards.indexOf("Decrease Research");
        this.cards.splice(_cardToRemove2, 1);
      } else if (card === "Infection Strength Decrease") {
        this.increase -= 10;
        if (this.increase < 0) {
          this.increase = 0;
        }
        var _cardToRemove3 = this.cards.indexOf("Infection Strength Decrease");
        this.cards.splice(_cardToRemove3, 1);
      } else if (card === "Temporary Cure") {
        this.infection = 0;
        var _cardToRemove4 = this.cards.indexOf("Temporary Cure");
        this.cards.splice(_cardToRemove4, 1);
      } else if (card === "Increase Research") {
        this.researchIncrease();
        var _cardToRemove5 = this.cards.indexOf("Increase Research");
        this.cards.splice(_cardToRemove5, 1);
      } else if (card === "Reset Infection Rate") {
        target.increase = 10;
        var _cardToRemove6 = this.cards.indexOf("Reset Infection Rate");
        this.cards.splice(_cardToRemove6, 1);
      } else if (card === "Decrease Infection") {
        this.infection -= 10;
        if (this.infection < 0) {
          this.infection = 0;
        }
        var _cardToRemove7 = this.cards.indexOf("Decrease Infection");
        this.cards.splice(_cardToRemove7, 1);
      }
      this.dealCards(true);
    }
  }, {
    key: "researchIncrease",
    value: function researchIncrease() {
      this.research += 20;
      if (this.research >= 100) {
        this.win = true;
      }
    }
  }]);

  return Player;
}();

},{}],2:[function(require,module,exports){
'use strict';

var _Pandemic = require('./../js/Pandemic.js');

$(document).ready(function () {
  var squishy = new Audio('/audio/Squishy.mp3');
  var tada = new Audio('/audio/Tada.mp3');
  var counter = 0;
  $("#win-screen").hide();
  $(".play").hide();
  $(".option-play").hide();
  var game = new _Pandemic.Game();
  $(".start").submit(function (event) {
    event.preventDefault();
    game.setPlayers(parseInt($("#amount").val()));
    $(".start").hide();
    $(".play").show();
  });
  $("#button").click(function () {
    $(".option-play").show();
    $(".directions").hide();
    $("#button").hide();
    var losscheck = false;
    game.players.forEach(function (player) {
      player.dealCards();
      player.infectIncrease();
    });
    game.players[game.turn].turn = true;

    $("#select").empty();
    game.players[game.turn].cards.forEach(function (card) {
      $("#select").append('<option>' + card + '</option>');
    });
    game.players.forEach(function (player) {
      $("#scores").append('<li>Player ' + player.id + ' Infection: ' + player.infection + ' Research: ' + player.research + ' Infection Rate: ' + player.increase);
    });
    game.players.forEach(function (player) {
      $("#target").append('<option>' + player.id + '</option>');
    });
    $("#timer").text('Turn Over In ' + (20 - counter) + ' Seconds');
    $("#output").text('Player ' + game.players[game.turn].id + '\'s Turn');

    var theinterval = setInterval(function () {
      document.getElementById("card").disabled = false;
      for (var i = 0; i < game.players.length; i++) {
        if (game.players[i].win) {
          $(".instructions").hide();
          $(".play").hide();
          $("#win-screen").show();
          $("#win").text('Player ' + game.players[i].id + ' Wins');
          tada.play();
          clearInterval(theinterval);
        }
        if (game.players[i].loss) {
          $(".loss").text('Player ' + game.players[i].id + ' Is Dead!!!');
          squishy.play();
          setTimeout(function () {
            $(".loss").empty();
          }, 3000);
          game.players.splice(i, 1);
          if (game.turn >= game.players.length) {
            game.turn = 0;
          }
        }
      }
      if (game.players.length <= 1) {
        $(".instructions").hide();
        $(".play").hide();
        $("#win-screen").show();
        $("#win").text('Player ' + game.players[0].id + ' Wins');
        tada.play();
        clearInterval(theinterval);
      }
      if (counter >= 20) {
        game.players[game.turn].turn = false;
        if (game.turn + 1 >= game.players.length) {
          game.turn = 0;
          counter = 0;
          $("#select").empty();
          game.players[game.turn].cards.forEach(function (card) {
            $("#select").append('<option>' + card + '</option>');
          });
          $("#target").empty();
          game.players.forEach(function (player) {
            $("#target").append('<option>' + player.id + '</option>');
          });
          document.getElementById("card").disabled = true;
          setTimeout(function () {
            document.getElementById("card").disabled = false;
          }, 1000);
        } else {
          game.turn++;
          counter = 0;
          $("#select").empty();
          game.players[game.turn].cards.forEach(function (card) {
            $("#select").append('<option>' + card + '</option>');
          });
          $("#target").empty();
          game.players.forEach(function (player) {
            $("#target").append('<option>' + player.id + '</option>');
          });
          document.getElementById("card").disabled = true;
          setTimeout(function () {
            document.getElementById("card").disabled = false;
          }, 1000);
        }
        game.players[game.turn].turn = true;
      }
      $("#scores").empty();
      game.players.forEach(function (player) {
        $("#scores").append('<li>Player ' + player.id + ' Infection: ' + player.infection + ' Research: ' + player.research + ' Infection Rate: ' + player.increase);
      });
      $("#output").text('Player ' + game.players[game.turn].id + '\'s Turn');
      $("#timer").text('Turn Over In ' + (20 - counter) + ' Seconds');
      counter++;
    }, 1000);
  });
  $("#card").click(function () {
    document.getElementById("card").disabled = true;
    var card = $("#select").find(":selected").val();
    var choice = parseInt($("#target").find(":selected").val());
    var target = "";
    for (var i = 0; i < game.players.length; i++) {
      if (game.players[i].id === choice) {
        target = game.players[i];
        break;
      }
    }
    counter = 20;
    game.players[game.turn].playCard(card, target);
    $("#select").empty();
    game.players[game.turn].cards.forEach(function (card) {
      $("#select").append('<option>' + card + '</option>');
    });
    $("#target").empty();
    game.players.forEach(function (player) {
      $("#target").append('<option>' + player.id + '</option>');
    });
    $("#scores").empty();
    game.players.forEach(function (player) {
      $("#scores").append('<li>Player ' + player.id + ' Infection: ' + player.infection + ' Research: ' + player.research + ' Infection Rate: ' + player.increase);
    });
    $("#output").text('Player ' + game.players[game.turn].id + '\'s Turn');
    $("#timer").text('Turn Over In ' + (20 - counter) + ' Seconds');
  });
  $("#restart").click(function () {
    window.location.reload(true);
  });
});

},{"./../js/Pandemic.js":1}]},{},[2]);
