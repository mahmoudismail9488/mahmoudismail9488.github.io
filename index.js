
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern= [];
var started = false;
var level = 0
// check if the user clicked any key for the 1st time
$(document).on("keypress",function() {
    if (!started) {
  
      //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
      $("#level-title").text("Level " + level);
      nextSequence();
      userClickedPattern = []
      started = true;
    }
  });
// function to play sound
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      $("body").addClass("game-over")
      playSound("wrong")
      setTimeout(function(){
        $("body").removeClass("game-over")
      },200)
      $("h1").text("Game Over, Press Any Key to Restart")
      started = false;
      level = 0
      gamePattern = []
    }

}
function nextSequence() {
    level++;
    userClickedPattern = [];
    //5. Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
}


// get the clicked color and play the sound
$(".btn").click( function(){
    var userChosenColour =$(this).attr("id")
    userClickedPattern.push(userChosenColour)
    playSound(userClickedPattern)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1);
})


// function to animate the click
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed")
    setTimeout(function(){$("#"+currentColour).removeClass("pressed")},100)
}
