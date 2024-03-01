var gameStart = false;
var levelCounter = 1;
var blockColour = ["red", "green", "blue", "yellow"];
var randomColour;
var userChosenColour;
var userClickedPattern = [];
var gamePattern = [];


$(document).keypress(() => {
        if (gameStart != true) {
            nextSequence();
            gameStart = true;
        }
});

$(".block").click(function() {
 
    $(this).addClass("on-click");
    setTimeout(() => {
        $(this).removeClass("on-click");
    }, 100);
    
    userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function nextSequence() {
    userClickedPattern = [];
    $("#header").text("Level " + levelCounter);
    levelCounter++;
    var randomNumber = Math.floor(Math.random() * 4);
    randomColour = blockColour[randomNumber];
    gamePattern.push(randomColour);

    $("#" + randomColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColour);
}



function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(() => {
          nextSequence();
        }, 500);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#header").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }


}

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
    levelCounter = 1;
    gamePattern = [];
    gameStart = false;
  }