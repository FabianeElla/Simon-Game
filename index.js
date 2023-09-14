var buttonColours = ["red", "blue", "green", "yellow"]

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function () {
    if (!started) {
        $("h1").text(`Level ${level}`);
        nextSequence();

        started = true;
    }
})

function nextSequence() {
    level++;
    //Após incrementar o level, a cada chamada da função nextSequence(), o h1 deve ser atualizado
    $("h1").text(`Level ${level}`);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //Animar botão selecionado aleatoriamente pela função nextSequence()
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    console.log(gamePattern);
}

//Detectar o clique do usuário
$(".btn").click(function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    animatePress(this);
    playSound(userChosenColour);
    //Verifica o último índice da lista das respostas do usuário
    checkAnswer(userClickedPattern.length - 1);
})

function playSound(buttonSelect) {
    var som = `./sounds/${buttonSelect}.mp3`;
    var audio = new Audio(som);
    audio.play();
}

function animatePress(currentColor) {
    $(currentColor).addClass("pressed");

    setTimeout(function () {
        $(currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Sucesso!");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000)

            //Resetar lista das respostas do usuário, após conferir resposta correta
            console.log(userClickedPattern);
            userClickedPattern = [];
        }
    } else {
        console.log("Erro!");
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();

        $("h1").text("Game Over, Press Any Key to Restart")

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        //Resetar lista de sequência aleatória da função nextSequence() para iniciar novo jogo
        startOver();
    }
}

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    level = 0;
}

