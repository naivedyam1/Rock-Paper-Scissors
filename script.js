const startButton = document.getElementById('startButton');
const gesture = document.getElementById('gesture');
const gameResult = document.getElementById('gameResult');
const video = document.getElementById('video');

const model = "https://teachablemachine.withgoogle.com/models/RvafHUyzH/model.json";
let userChoice = "";

let classifier = ml5.imageClassifier(model, modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
    startVideo();
}

async function startVideo() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.play();
    classifyGesture();
}

function classifyGesture() {
    classifier.classify(video, (results) => {
        userChoice = results[0].label;
        gesture.innerText = `Looks like a ${userChoice} to me.`;
        setTimeout(classifyGesture, 500);
    });
}

startButton.addEventListener("click", () => {
    playGame(userChoice);
});

function playGame(userChoice) {
    let choices = ["Rock", "Paper", "Scissors"];
    let randomNumber = Math.floor(Math.random() * choices.length);
    let computerChoice = choices[randomNumber];
    let result = "";
    if (userChoice === computerChoice) {
        result = "It's a tie!";
    } 
    else if (
        (userChoice === "Rock" && computerChoice === "Scissors") ||
        (userChoice === "Scissors" && computerChoice === "Paper") ||
        (userChoice === "Paper" && computerChoice === "Rock")
    ) {
        result = "You win!";
    } 
    else {
        result = "You lose!";
    }
    gameResult.innerText = `Computer chose: ${computerChoice}. ${result}`;
}