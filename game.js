//alert("test to see that js is linked correctly");

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

//to keep track of whether if the game has started or not, to only call nextSequence() on the first keypress.
var started = false;

//variable called level and start at level 0.
var level = 0;


//to detect wether a key is pressed, and when that happens for the first time,
//call function nextSequence()
$(document).keydown(function() {
  if(!started) {

    //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

/* event handler to check which button user clicked*/
$(".btn").on("click", function() {
  //to store the id of the button that got clicked
  var userChosenColour = $(this).attr("id");
  //Add the contents of the variable userChosenColour to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);

  //when a user clicks on a button, the corresponding sound is played
  playSound(userChosenColour);

  //button animation when button pressed
  animatePress(userChosenColour);

  //Call checkAnswer() after a user has clicked and chosen their answer,
  //passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);

  console.log(userClickedPattern);
});

function checkAnswer(currentLevel) {
  //if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

     console.log("success");

     //If the user got the most recent answer right, then check that they have finished their sequence with another if statement.
     if (userClickedPattern.length === gamePattern.length){

       //Call nextSequence() after a 1000 millisecond delay.
       setTimeout(function () {
         nextSequence();
       }, 1000);

     }

   } else {

      console.log("wrong");

      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();

   }
}


function nextSequence() {
  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  //Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;
  //Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  //jQuery to select the button with the same id as the randomChosenColour
  //and to animate a flash to the selected button
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  //to play the sound for the randomly selected button colour
  playSound(randomChosenColour);

}

function playSound(name) {
  //to play the sound for the selected button colour
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
