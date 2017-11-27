import { Player, Game } from "./../js/Pandemic.js";

$(document).ready(function(){
  $(".play").hide();
  $(".option-play").hide();
  const game = new Game();
  $(".start").submit(function(event){
    event.preventDefault();
    game.setPlayers(parseInt($("#amount").val()));
    $(".start").hide();
    $(".play").show();
  });
  $("#button").click(function(){
    $(".option-play").show();
    $("#button").hide();
    var losscheck = false;
    game.players.forEach(function(player){
      player.dealCards();
      player.infectIncrease();
    });
    game.players[game.turn].turn = true;
    let counter = 0;
    $("#select").empty();
    $("#output").text(`Player ${game.players[game.turn].id}'s Turn`);
    game.players[game.turn].cards.forEach(function(card){
      $("#select").append(`<option>${card}</option>`);
    });
    game.players.forEach(function(player){
      $("#scores").append(`<li>Infection: ${player.infection} Research: ${player.research}`)
    });
    $("#timer").text(`Turn Over In ${20 - counter} Seconds`);
    let theinterval = setInterval(() => {
      if(game.players[game.turn].loss) {
        game.players.splice(game.turn, 1);
        counter = 0;
      }
      if(game.players.length <= 1) {
        alert(`Player ${game.players[game.turn].id} Wins`);
        $("#button").show();
        $(".play").hide();
        $(".start").show();
        clearInterval(theinterval);
      }
      if(counter >= 20){
        game.players[game.turn].turn = false;
        if(game.turn + 1 >= game.players.length) {
          game.turn = 0;
          counter = 0;
          $("#select").empty();
          game.players[game.turn].cards.forEach(function(card){
            $("#select").append(`<option>${card}</option>`);
          });
        } else {
          game.turn++;
          counter = 0
          $("#select").empty();
          game.players[game.turn].cards.forEach(function(card){
            $("#select").append(`<option>${card}</option>`);
          });
        }
        game.players[game.turn].turn = true;
      }
      $("#scores").empty();
      game.players.forEach(function(player){
        $("#scores").append(`<li>Infection: ${player.infection} Research: ${player.research}`)
      });
      $("#output").text(`Player ${game.players[game.turn].id}'s Turn`);
      $("#timer").text(`Turn Over In ${20 - counter} Seconds`);
      counter++;
    }, 1000);
  });
});
