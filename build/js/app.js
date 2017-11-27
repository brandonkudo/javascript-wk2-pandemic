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

  _createClass(Player, [{
    key: "dealCards",
    value: function dealCards() {
      var cards = ["Strength Increase", "Speed Increase", "Decrease Research", "Strength Decrease", "Speed Decrease", "Increase Research", "Decrease Turn Timer", "Increase Turn Timer"];
      for (var i = 0; i < 3; i++) {
        var number = Math.floor(Math.random() * 7.99);
        this.cards.push(cards[number]);
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
      }, this.interval);
    }
  }, {
    key: "playCard",
    value: function playCard(card, target) {
      if (card === "Strength Increase") {
        target.increase += 10;
      } else if (card === "Speed Increase") {
        target.interval -= 1000;
      } else if (card === "Decrease Research") {
        target.research -= 10;
      } else if (card === "Strength Decrease") {
        this.increase -= 10;
      } else if (card === "Speed Decrease") {
        this.interval += 1000;
      } else if (card === "Increase Research") {
        researchIncrease();
      } else if (card === "Decrease Turn Timer") {
        target.turntimer -= 10000;
      } else if (card === "Increase Turn Timer") {
        target.turntimer += 10000;
      }
      this.turn = false;
      return this.id;
    }
  }, {
    key: "researchIncrease",
    value: function researchIncrease() {
      this.research += 10;
      if (this.research >= 100) {
        this.win = true;
      }
    }
  }]);

  return Player;
}();

},{}],2:[function(require,module,exports){
"use strict";

var _Pandemic = require("./../js/Pandemic.js");

$(document).ready(function () {
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
    $("#button").hide();
    var losscheck = false;
    game.players.forEach(function (player) {
      player.dealCards();
      player.infectIncrease();
    });
    game.players[game.turn].turn = true;
    var counter = 0;
    $("#select").empty();
    $("#output").text("Player " + game.players[game.turn].id + "'s Turn");
    game.players[game.turn].cards.forEach(function (card) {
      $("#select").append("<option>" + card + "</option>");
    });
    game.players.forEach(function (player) {
      $("#scores").append("<li>Infection: " + player.infection + " Research: " + player.research);
    });
    $("#timer").text("Turn Over In " + (20 - counter) + " Seconds");
    var theinterval = setInterval(function () {
      if (game.players[game.turn].loss) {
        game.players.splice(game.turn, 1);
        counter = 0;
      }
      if (game.players.length <= 1) {
        alert("Player " + game.players[game.turn].id + " Wins");
        $("#button").show();
        $(".play").hide();
        $(".start").show();
        clearInterval(theinterval);
      }
      if (counter >= 20) {
        game.players[game.turn].turn = false;
        if (game.turn + 1 >= game.players.length) {
          game.turn = 0;
          counter = 0;
          $("#select").empty();
          game.players[game.turn].cards.forEach(function (card) {
            $("#select").append("<option>" + card + "</option>");
          });
        } else {
          game.turn++;
          counter = 0;
          $("#select").empty();
          game.players[game.turn].cards.forEach(function (card) {
            $("#select").append("<option>" + card + "</option>");
          });
        }
        game.players[game.turn].turn = true;
      }
      $("#scores").empty();
      game.players.forEach(function (player) {
        $("#scores").append("<li>Infection: " + player.infection + " Research: " + player.research);
      });
      $("#output").text("Player " + game.players[game.turn].id + "'s Turn");
      $("#timer").text("Turn Over In " + (20 - counter) + " Seconds");
      counter++;
    }, 1000);
  });
});

},{"./../js/Pandemic.js":1}]},{},[2]);
