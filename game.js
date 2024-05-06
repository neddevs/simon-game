var buttonColours=["red","blue","green","yellow"];
var gamesPattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
});


$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(gamesPattern[currentLevel]===userClickedPattern[currentLevel]){
    if(gamesPattern.length===userClickedPattern.length){
      setTimeout(function(){
        nextSequence();},1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");},200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamesPattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function startOver(){
  level=0;
  gamesPattern=[];
  started=false;
}

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){$("#"+currentColour).removeClass("pressed");},100);
}
