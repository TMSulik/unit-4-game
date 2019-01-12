$(document).ready(function(){

  var gem = function() {
    return Math.floor(Math.random() * 12) + 1;
  }

  var target = function() {
    resetGemValues();
    return Math.floor(Math.random() * 101) + 19;
  }

  var TOTAL = {
    player: 0,
    target: 0
  }

  var OUTCOME = {
    wins: 0,
    losses: 0
  }

  var GEM_VALUE = {
    topaz: 0,
    emerald: 0,
    sapphire: 0,
    ruby: 0
  }

  function resetGemValues() {
    var values = [];
    var n = gem(); 
    for(var i = 0; i < 4; i++) {
      while(values.includes(n)) {
        n = gem();
      }      
      values.push(n);
    }
    GEM_VALUE.topaz = values[0];
    GEM_VALUE.ruby = values[1];
    GEM_VALUE.emerald = values[2];
    GEM_VALUE.sapphire = values[3];    
  }

  function resetTarget() {
    TOTAL.target = target();
  }

  function endRound() {
    if(TOTAL.player > TOTAL.target) {
      $("#target_number").text(TOTAL.player + " > " + TOTAL.target + ": Player loses"); 
      OUTCOME.losses++;
      countdown(); 
    }
    if(TOTAL.player === TOTAL.target) {
      $("#target_number").text(TOTAL.player + " = " + TOTAL.target + ": Player wins!");
      OUTCOME.wins++;
      countdown();
    }
  }

  var startNewRound = function() {
    $("#wins").text("Wins: " + OUTCOME.wins);
    $("#losses").text("Losses: " + OUTCOME.losses);
    resetTarget();
    TOTAL.player = 0;
    $("#timer_header").text("Player's total");
    $("#target_number").text(TOTAL.target);
    $("#player_sum").text(TOTAL.player);
  }
  
  function countdown() {
    var counter = 6;
    var interval = setInterval(function() {
      counter--;
      $("#timer_header").text("Countdown");
      $("#player_sum").text("New round in " + counter + " seconds");
      if (counter == 0) {
        startNewRound();
        clearInterval(interval);
      }
    }, 1000);
  }

  window.onload = function() {
    resetTarget();
    $("#target_number").text(TOTAL.target);
  };

  var addToPlayersTotal = function(num) {
    TOTAL.player += num;
    $("#player_sum").text(TOTAL.player);
  }

  var buttonText = "Hide instructions";

  $(".tiny").click(function(){
    if(buttonText === "Show instructions") {
      buttonText = "Hide instructions";  
    } else {
      buttonText = "Show instructions";
    }
    $("span", this).text(buttonText);
    $('.rules').toggle("slide");
  });
  
  $("#topaz").click(function(){
    addToPlayersTotal(GEM_VALUE.topaz);
    endRound();
  });
  
  $("#ruby").click(function(){
    addToPlayersTotal(GEM_VALUE.ruby);
    endRound();
  });
  
  $("#emerald").click(function(){
    addToPlayersTotal(GEM_VALUE.emerald);
    endRound();
  });
  
  $("#sapphire").click(function(){
    addToPlayersTotal(GEM_VALUE.sapphire);
    endRound();
  });

});