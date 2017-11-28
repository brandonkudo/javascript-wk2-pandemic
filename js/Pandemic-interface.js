import { Player, Game } from "./../js/Pandemic.js";

$(document).ready(function(){
  const squishy = new Audio('/audio/Squishy.mp3');
  const tada = new Audio('/audio/Tada.mp3');
  let counter = 0;
  $("#win-screen").hide();
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
    $(".directions").hide();
    $("#button").hide();
    var losscheck = false;
    game.players.forEach(function(player){
      player.dealCards();
      player.infectIncrease();
    });
    game.players[game.turn].turn = true;

    $("#select").empty();
    game.players[game.turn].cards.forEach(function(card){
      $("#select").append(`<option>${card}</option>`);
    });
    game.players.forEach(function(player){
      $("#scores").append(`<li>Player ${player.id} Infection: ${player.infection} Research: ${player.research} Infection Rate: ${player.increase}`);
    });
    game.players.forEach(function(player){
      $("#target").append(`<option>${player.id}</option>`);
    });
    $("#timer").text(`Turn Over In ${20 - counter} Seconds`);
    $("#output").text(`Player ${game.players[game.turn].id}'s Turn`);

    let theinterval = setInterval(() => {
      document.getElementById("card").disabled = false;
      for (var i = 0; i < game.players.length; i++) {
        if(game.players[i].win) {
          $(".instructions").hide();
          $(".play").hide();
          $("#win-screen").show();
          $("#win").text(`Player ${game.players[i].id} Wins`);
          tada.play();
          clearInterval(theinterval);
        }
        if(game.players[i].loss) {
          $(".loss").text(`Player ${game.players[i].id} Is Dead!!!`);
          squishy.play();
          setTimeout(() => {
            $(".loss").empty();
          }, 3000);
          game.players.splice(i, 1);
          if(game.turn >= game.players.length) {
            game.turn = 0;
          }
        }
      }
      if(game.players.length <= 1) {
        $(".instructions").hide();
        $(".play").hide();
        $("#win-screen").show();
        $("#win").text(`Player ${game.players[0].id} Wins`);
        tada.play();
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
          $("#target").empty();
          game.players.forEach(function(player){
            $("#target").append(`<option>${player.id}</option>`);
          });
          document.getElementById("card").disabled = true;
          setTimeout(() => {
            document.getElementById("card").disabled = false;
          }, 1000);
        } else {
          game.turn++;
          counter = 0;
          $("#select").empty();
          game.players[game.turn].cards.forEach(function(card){
            $("#select").append(`<option>${card}</option>`);
          });
          $("#target").empty();
          game.players.forEach(function(player){
            $("#target").append(`<option>${player.id}</option>`);
          });
          document.getElementById("card").disabled = true;
          setTimeout(() => {
            document.getElementById("card").disabled = false;
          }, 500);
        }
        game.players[game.turn].turn = true;
      }
      $("#scores").empty();
      game.players.forEach(function(player){
        $("#scores").append(`<li>Player ${player.id} Infection: ${player.infection} Research: ${player.research} Infection Rate: ${player.increase}`);
      });
      $("#output").text(`Player ${game.players[game.turn].id}'s Turn`);
      $("#timer").text(`Turn Over In ${20 - counter} Seconds`);
      counter++;
    }, 1000);
  });
  $("#card").click(function(){
    let card = $("#select").find(":selected").val();
    let choice = parseInt($("#target").find(":selected").val());
    let target = "";
    for (var i = 0; i < game.players.length; i++) {
      if(game.players[i].id === choice) {
        target = game.players[i];
        break;
      }
    }
    counter = 20;
    game.players[game.turn].playCard(card, target);
    $("#select").empty();
    game.players[game.turn].cards.forEach(function(card){
      $("#select").append(`<option>${card}</option>`);
    });
    $("#target").empty();
    game.players.forEach(function(player){
      $("#target").append(`<option>${player.id}</option>`);
    });
    $("#scores").empty();
    game.players.forEach(function(player){
      $("#scores").append(`<li>Player ${player.id} Infection: ${player.infection} Research: ${player.research} Infection Rate: ${player.increase}`);
    });
    $("#output").text(`Player ${game.players[game.turn].id}'s Turn`);
    $("#timer").text(`Turn Over In ${20 - counter} Seconds`);
  });
  $("#restart").click(function(){
    window.location.reload(true);
  });
});
