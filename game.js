var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
var level = 0;
var started=false;
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(){
  if(!started)
  {
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
});


function nextSequence()
{
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*3) + 1;
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour)
{
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function checkAnswer(currentLevel)
{
  if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("Success");
    if (userClickedPattern.length===gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      },1000);
    }
  }else {
    console.log("Wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any key to Restart");
    var wrong = new Audio("sounds/" + "wrong.mp3");
    wrong.play();
    startOver();
  }
}


function startOver(){
  started=false;
  level=0;
  gamePattern=[];
}
