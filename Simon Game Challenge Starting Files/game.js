var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var firstKeyPress = true;
var level = 0;

$(document).ready(function () {
    $(".btn").click(function () {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        console.log(userClickedPattern);
        animatePress(userChosenColour);

        playSound(userChosenColour)

        checkAnswer(userClickedPattern.length - 1);
    });
});

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    console.log(randomChosenColour);
    console.log(gamePattern);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    $("#level-title").fadeOut(300, function () {
        $("#level-title").text("Level " + level);
        $("#level-title").fadeIn(300);
    });
    level++;
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 50);
}

$(window).keypress(function (event) {
    if (firstKeyPress) {
        nextSequence();
        firstKeyPress = false;
    }
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    } else {
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        wrongAnswer();
        setTimeout(() => {
            location.reload();
        }, 3000);
        console.log("Wrong");
    }
}

function wrongAnswer() {
    $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
    
        $("#level-title").fadeOut(300, function () {
            $("#level-title").text("Game Over, Better luck next time.");
            $("#level-title").fadeIn(300);
        });

}

