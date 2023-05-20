//game variables and constants
let inputDir={x: 0,y: 0};
const foodSound= new Audio('food.wav');
const gameOverSound=new Audio('gameover.wav');
//const gameSound=new Audio();
const moveSound=new Audio('move.wav');
const timeLimit=180;
let speed=4;
let score=0;
let lastPaintTime=0;
let remainingTime=timeLimit;
snakeArr=[
    {x:13,y:15}
];

food={x:6,y:7};

//time setting display the countdowntimer on the game screen
function displayTimer(){

    const timerElement=document.getElementById('timer');
    timerElement.innerHTML='Time: ${remainingTime}';//check it here after the coding
}
//update remaining time every second
function updateTimer() {
    remainingTime--;
    displayTimer();
    //check if the time run out
    if(remainingTime<=0){
        gameOverSound.play();
        endGame();
    }

}
//inxcrease  the remaining time when the player completes a sequence of color blocks
function increaseTime(){
    remainingTime+=10;
    displayTimer();
}
const timeInterval=setInterval(updateTimer,1000);
//call  the updateTimer() function when the player completes a sequence of color blocks
function handleColorBlockEaten(){
    //logic for checking color block is eaten in correct sequence
    //...
    increaseTime();
}
//game function 
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<1/speed){
    //console.log(ctime)
    return;
    }
    lastPaintTime=ctime;
    gameEngine();
    speed=4;
    score=0;
}



function isCollide(snake){
    //if u bump into urself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y ){
            gameOverSound.play();
            speed=4;
            score=0;
            return true;
        }
    }    
    //if u bump into wall
    if(snake[0].x>=20 || snake[0].x<=0 || snake[0].y>=20 || snake[0].y<=0){
        gameOverSound.play();
        speed=4;
        score=0;
        return true;
    }
    
}
function gameEngine(){
    //part1:updating the snake array
    if (isCollide(snakeArr)){
        gameOverSound.play();
        //musicSound.pause();
        inputDir={x:0,y:0};
        alert("game over, please press any key to play again!");
        snakeArr=[{x:13,y:15}];
        //musicSound.play();
        score=0;

    }

    //if u have eaten the food, increament the score and regenerate the food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodSound.play();
        score +=2*speed
        scoreBox.innerHTML ="score:"+ score;
        speed +=0.5;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML="HiScore: "+hiscoreval;
        }
        scoreBox.innerHTML="score: "+score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        let a=1 ;
        let b=19;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    //moving the snake
    for (let i = snakeArr.length-2;i>=0; i--) {
        //const element = array[i];
        snakeArr[i+1]={...snakeArr[i]};
        
    }

    snakeArr[0].x +=inputDir.x;
    snakeArr[0].y +=inputDir.y;
    //part2:Display the snake and food 
    //Display the snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;

        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //Display the food
    foodElement=document.createElement('div')
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}












//main logic starts here
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscoreBox.innerHTML="HiScore:"+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}//start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x= 0;
            inputDir.y= 1;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x= 1;
            inputDir.y= 0;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;
            break;
    
        default:
            break;
    }
});