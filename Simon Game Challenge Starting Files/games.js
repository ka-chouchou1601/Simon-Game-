var buttonColours=["red","blue","green", "yellow"];
var gamePattern=[];
var userClickedPattern= [];
var level = 0;
var started = false;

$(document).keydown(function(){
    if(!started){
        
$("#level-title").text("level" + level);
nextSequence();
started= true;
    }
});



$(".btn").click(function(){
    
 var userChosenColour= $(this).attr("id");
 userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
    animatePress(userChosenColour);

      checkAnswer(userClickedPattern.length-1);
});




function nextSequence(){

    //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

  //5. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

    var randomNumber=Math.floor(Math.random()* 4);
 var randomChosenColour= buttonColours[randomNumber];

gamePattern.push(randomChosenColour);
$("# " +randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);
}


function playSound(name) {

  //3. Take the code we used to play sound in the nextSequence() function and add it to playSound().
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
    /* because they are arrays */ 
    if ( gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success")
         
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    
    }
    else{
       //1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
     playSound("wrong") ;
        $("body").addclass(".game-over");
         $("#level-title").text("Game-Over, Press any key to Restart");

      setTimeout(function(){
        $("body").removeclass(".game-over");
      },200);

     
      startOver();
    }
}


function startOver(){
  level= 0;
  gamePattern = [];
  started=false;


}