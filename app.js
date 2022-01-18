/*
 In simple words, pong is a animation frame game. 
 To do that, you have to have objects that carry a value of where they are positioned at
 and the shape, xspeed, yspeed, and color. 

 You also have to draw all these objects into the window and you can do that pretty easily 
 using canvas and context. By writing a function loop that controls the order in which 
 functions are called, you can handle the movement of each of these objects and 
 after moving all these objects, you can call the draw function 
 which will render all these objects onto the screen using context manipulation, which is 
 a way to draw things into the canvsas. 

 You also have to write the logic to handle the keypressed
 which can be done pretty easily using addEventhandler to the window
 and creating an array and adding the keys that are pressed


 TODO: next thing is to add interactivity - done
 1. key handling thorugh adding eventlistener, keydown, keyup, creating an array with the key of 
 what is pressed. Then create a funciton that handles that. - done 

 2. then add how the ball detects the height collision and width collision and change of movements - done

 3. lastly, i will add collision detection and change the score once the ball gets passed -done 
*/

// Get the canvas and context from DOM tree. 
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const keys = []; 

// Create score 1 and score 2
let score1 = 0 
let score2 = 0 

// Square Object consntructor 
function Square(config){
    this.x = config.x 
    this.y = config.y 
    this.width = config.width 
    this.height = config.height 
    this.xspeed = config.xspeed
    this.yspeed = config.yspeed
    this.color = config.color 
}

// Initialize player1, player2, middle, and ball. 
let player1 = new Square({
    x: 5,
    y: 200, 
    width: 10,
    height: 70, 
    xspeed: 1, 
    yspeed: 2, 
    color:'white'
})

let player2 = new Square({
    x: 635,
    y: 200, 
    width: 10,
    height: 70, 
    xspeed: 1, 
    yspeed: 2, 
    color:'white'
})

let middle = new Square({
    x: 330,
    y: 0, 
    width: 5,
    height: 400, 
    xspeed: 1, 
    yspeed: 1, 
    color:'white'
})

let ball = new Square({
    x: 370,
    y: 200, 
    width: 20,
    height: 20, 
    xspeed: 2, 
    yspeed: 2, 
    color:'white'
})

window.addEventListener('keydown',(e)=>{
    keys[e.key] = true; 
    console.log(keys)
    e.preventDefault()
})

window.addEventListener('keyup', (e)=>{
    delete keys[e.key]
})

function drawScore1(){
    ctx.font = "15px serif";
    ctx.fillStyle = 'white'; 
    let text1 = score1; 
    ctx.fillText(text1, 280,20); 
}

function drawScore2(){
    ctx.font = "15px serif";
    ctx.fillStyle = 'white'; 
    let text2 = score2; 
    ctx.fillText(text2, 370,20); 
}

// changes the position of the players, player1 and player2, depending onn the key pressed. 
function handleMovement(){
    if('w' in keys && player1.y>10){
        player1.y-=player1.yspeed; 
    }
    else if('s' in keys && player1.y<320){
        player1.y+=player1.yspeed
    }
    if('ArrowUp' in keys && player2.y>10){
        player2.y-=player2.yspeed; 
    }
    else if('ArrowDown' in keys && player2.y<320){
        player2.y+=player2.yspeed
    }
    ballBouncePlayer()
}

function ballBouncePlayer(){
    if((ball.x<=player1.x+10 && player1.y<=ball.y && (player1.y+70)>=ball.y)||(ball.x>=player2.x-20 && player2.y<=ball.y && (player2.y+70)>=ball.y)){
        ball.xspeed *=-1
    }

    if(ball.x>=640){
        score1++; 
        ball.xspeed *=-1; 
        ball.x = 370;
        ball.y = 300;
    }
    else if(ball.x<=-10){
        score2++; 
        ball.xspeed *=-1; 
        ball.x = 280;
        ball.y = 100;
    }
    ballBounceWalls()
}

// changes the position and speed of ball 
function ballBounceWalls(){
    if(ball.y>=380){
        ball.yspeed *= -1 
    }
    else if(ball.y<=5){
        ball.yspeed *=-1
    }
    ball.x +=ball.xspeed; 
    ball.y +=ball.yspeed; 
    draw()
}

// draw a rectangle on canvas by taking a Square object. 
function drawRect(Square){
    ctx.fillStyle = Square.color 
    ctx.fillRect(Square.x, Square.y, Square.width, Square.height)
}

// draw the Square objects and results 
function draw(){
    ctx.clearRect(0,0, canvas.width, canvas.height)
    drawRect(player1); 
    drawRect(player2); 
    drawRect(middle); 
    drawRect(ball); 
    drawScore1(); 
    drawScore2(); 
}

// Animation using loop 
function loop(){
    handleMovement()
    window.requestAnimationFrame(loop)
}

loop()
