document.querySelector(".computer").addEventListener('click',() =>{
    if(withComputer){
        withComputer = false; 
        document.querySelector(".Player2").innerHTML = "Player2: ";
        return}
    withComputer = true;
    document.querySelector(".Player2").innerHTML = "Computer: ";
}
)


let player1Turn = true;
let withComputer = false

let player = { 
    player1: "",
    player2: "",
}

let score = JSON.parse(localStorage.getItem("score")) || {
    score1:0,
    score2:0
}
document.querySelector('.score').innerHTML = `score = ${score.score1} : ${score.score2}`



function move(hand){
    if(!withComputer){
        if(player1Turn){
            player.player1 = hand;
            player1Turn = false;
            document.querySelector('.Player1').innerHTML = `Player 1: Clicked`
            document.querySelector('.Player2').innerHTML = `Player 2:`
        }
        else{
            player.player2 = hand;
            result(player.player1,player.player2)
        }
    }
    else if(withComputer){
        player.player1 = hand;
        player.player2 = computerMove()
        result(player.player1,player.player2)
    }
}
function computerMove(){
    let move = Math.random();
    if(move<1/3){return "rock"}
    if(move<2/3){return "paper"}
    if(move<1){return "scissors"}
}
function result(p1,p2){
    const player2 = withComputer ? "Computer: " : "Player 2: ";
    document.querySelector('.Player1').innerHTML = `Player 1: <img class = "move-img" src="RPS/${p1}.png">`
    document.querySelector('.Player2').innerHTML = `${player2} <img class = "move-img" src="RPS/${p2}.png">`
    const winerElem = document.querySelector('.winner')
    if(p1 === p2){
        winerElem.innerHTML = "the battle is draw"
    }
    else if(p1 === 'rock' && p2 === 'scissors'){
        winerElem.innerHTML = "Player 1 win Player 2 lose"
        score.score1++
        localStorage.setItem("score",JSON.stringify(score))
    }
    else if(p1 === 'paper' && p2 === 'rock'){
        winerElem.innerHTML = "Player 1 win Player 2 lose"
        score.score1++
        localStorage.setItem("score",JSON.stringify(score))
    }
    else if(p1 === 'scissors' && p2 === 'paper'){
        winerElem.innerHTML = "Player 1 win Player 2 lose"
        score.score1++
        localStorage.setItem("score",JSON.stringify(score))
    }
    else{
        winerElem.innerHTML = "Player 1 lose Player 2 win"
        score.score2++
        localStorage.setItem("score",JSON.stringify(score))
    }
    document.querySelector('.score').innerHTML = `score = ${score.score1} : ${score.score2}`
    player1Turn = true;
}

//button auto play
const autoPlayElem = document.querySelector('.auto')
autoPlayElem.addEventListener('click', autoPlay)
document.addEventListener('keydown', event => {if(event.code === 'KeyA'){autoPlay()}})

let interval;
let isAutoPlay = false
function autoPlay(){
    if(!isAutoPlay){
        autoPlayElem.innerHTML = "(A) Stop playing"
        isAutoPlay = true;
        interval = setInterval(() => result(computerMove(),computerMove()), 1000)
    }
    else{
        clearInterval(interval)
        isAutoPlay = false;
        autoPlayElem.innerHTML = "(A) Auto Play"
    }
}


//reset part
const resetElem = document.querySelector(".reset")
let isResetPressed = false
resetElem.addEventListener('click',resetscore)
document.addEventListener('keydown', (event) => {if(event.code === 'KeyR'){resetscore()}})
const resetValid = document.querySelector(".reset-valid")

function resetscore(){
    console.log("yahya")
    if(!isResetPressed){
        isResetPressed = true
        resetValid.innerHTML = `<p>are you sure you want to reset the score?</p>
                    <button class ="yes">Yes</button>
                    <button class ="no">No</button>`

        document.querySelector('.yes').addEventListener('click',() => {
            localStorage.removeItem("score")
            score = { score1: 0, score2: 0 }; 
            document.querySelector('.score').innerHTML = `score = ${score.score1} : ${score.score2}`
            resetValid.innerHTML = ''
            isResetPressed = false
        })
        
        document.querySelector('.no').addEventListener('click',() => {
            resetValid.innerHTML = ''
            isResetPressed = false
        })
    }
    else{
        resetValid.innerHTML = ''
        isResetPressed = false
    }
}


