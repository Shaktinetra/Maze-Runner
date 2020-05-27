var ball, maze, maze1, maze2, maze3, maze4, maze5, maze6, maze7, maze8, maze10, maze11, maze12, color2, win, gameState, RULES, PLAY, LOSE, WIN, lose, win;

function preload() {
  lose = loadSound("die.mp3");
  win = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(400, 400);
  
  PLAY = 0;
  RULES = 1;
  LOSE = 2;
  WIN = 3;
  
  ball = createSprite(10, 10, 10, 10);
  
  maze = createSprite(100, 47, 200,50);
  maze.shapeColor  = ("black");
  
  maze1 = createSprite(225, 122, 50, 200);
  maze1.shapeColor = ("black");
  
  maze2 = createSprite(315, 125, 50, 250);
  maze2.shapeColor = ("black");
  
  maze3 = createSprite(240, 275, 200, 50);
  maze3.shapeColor = ("black");
  
  maze4 = createSprite(140, 205, 50, 190);
  maze4.shapeColor = ("black");

  maze5 =   createSprite(75, 135, 85, 50);
  maze5.shapeColor = ("black");

  maze6 =  createSprite(55, 160, 50, 100);
  maze6.shapeColor = ("black");

  maze7 =  createSprite(55, 250, 50, 170);
  maze7.shapeColor = ("black");

  maze8 = createSprite(155, 355, 250, 40);
  maze8.shapeColor = ("black");

  maze10=  createSprite(345, 370, 50, 75);
  maze10.shapeColor= ("black");

  maze11= createSprite(400, 240, 50, 370);
  maze11.shapeColor= ("black");

  maze12=    createSprite(370, 0, 60, 50);
  maze12.shapeColor= ("black");

  color2=  createSprite(370, 366, 10, 67);
  color2.shapeColor= ("black");

  win   = createSprite(400, 40, 1, 30);
  win.shapeColor   = ("white");

  gameState = RULES;
}
      
function draw() {
  
  //clearing background
  background(255);
 
  //creating edges
  edges = createEdgeSprites();
  
  if(gameState === LOSE) {
    //setting the text size and what it says
    textSize(30);
    text("Out Of Bounds", 100, 200);
    text("Press Enter To Play Again", 25, 250);
  }
  
  if(gameState === WIN) {
    //setting text size, color, and what it says
  textSize(30);
  text("You Win", 100, 200);
  text("Press Enter To Play Again", 25, 250);
  }
  
  //making the mazes visible during play
  if (gameState === PLAY) {
    maze.visible = maze1.visible = maze2.visible = maze3.visible = maze4.visible = true;
  maze5.visible = maze6.visible = maze7.visible = maze8.visible = maze10.visible = true;
  maze11.visible = maze12.visible = color2.visible = ball.visible  = true;
  } else {
    maze.visible = maze1.visible = maze2.visible = maze3.visible = maze4.visible = false;
  maze5.visible = maze6.visible = maze7.visible = maze8.visible = maze10.visible = false;
  maze11.visible = maze12.visible = color2.visible = ball.visible  = false;
  }
  
  //setting the gameState "rules"
  if (gameState === RULES) {
    fill("black");
    text("Use Arrow Keys To Move", 145, 100);
    text("Press Space To Stop", 150, 150);
    text("The Controls Will Change When You Cross The Dotted Line", 50, 200);
    text("Press Enter To Continue", 150, 250);
  
    
  if(keyWentDown("ENTER")) {
    //bringing the ball back to the beginning
    ball.x = 10;
    ball.y = 10;
    
    ball.visible = true
  
    //stopping the ball's movement  
    ball.velocityX = 0;
    ball.velocityY = 0;
      
    //changing the gameState
    gameState = PLAY;
    }
  }
    
  //setting gameState "play"
  if (gameState === PLAY) {
  
     //showing the boundary where the controls will switch
     boundary();
    //moving the ball up
  
      if (keyDown("up")) {
        ball.velocityX = 0;
        ball.velocityY = -4;
  }
  
      //moving the ball down
      if (keyDown("down")) {
        ball.velocityX = 0;
        ball.velocityY = 4;
  }
  
      //moving the ball right
      if (keyDown("right")) {
        ball.velocityX = 4;
        ball.velocityY = 0;
  }
  
      //moving the ball left
      if (keyDown("left")) {
        ball.velocityX = -4;
        ball.velocityY = 0;
  }
  
      //stopping/pausing the ball's movement
      if (keyDown("space")) {
        ball.velocityX = 0;
        ball.velocityY = 0;
  
  }
  
      //switching the controls
      if (ball.x > 200) {
        if (keyDown("left")) {
          ball.velocityX = 4;
          ball.velocityY = 0;
    }
    
        if (keyDown("right")) {
          ball.velocityX = -4;
          ball.velocityY = 0;
    }
    
        if (keyDown("up")) {
          ball.velocityX = 0;
          ball.velocityY = 4;
    }
    
        if (keyDown("down")) {
          ball.velocityX = 0;
          ball.velocityY = -4;
        }
      }
  }
  
  //setting gameState "lose"
  if (gameState === LOSE && keyWentDown("ENTER")) {
    
    //changing the gameState
    gameState = PLAY;
  }
  
  //setting gameState "win"
  if (gameState === WIN && keyWentDown("ENTER")) {
        
    //changing the gameState
    gameState = PLAY;
  }
  
  //when the ball loses
  if (  ball.isTouching(edges[0]) ||
      ball.isTouching(edges[3]) ||
      ball.isTouching(edges[2]) ||
      ball.isTouching(maze)  ||
      ball.isTouching(maze1) ||
      ball.isTouching(maze2) ||
      ball.isTouching(maze3) ||
      ball.isTouching(maze4) ||
      ball.isTouching(maze5) ||
      ball.isTouching(maze6) ||
      ball.isTouching(maze7) ||
      ball.isTouching(maze8) ||
      ball.isTouching(maze10)||
      ball.isTouching(maze11)) {
      _lose_();
      lose.play();      
  }
  
  //when the ball wins
  if (ball.isTouching(win)) {
     wiN();
  }
  
//drawing the sprites
 drawSprites();
}

//what happens when you lose
function _lose_() {
  gameState = LOSE;
  
  //stopping the ball's movement
  ball.velocityX = 0;
  ball.velocityY = 0;
  
   //bringing the ball back to the beginning
    ball.x = 10;
    ball.y = 10;
}

//what happens when you win
function wiN() {
  gameState = WIN;
  
  //bringing the ball back to the beginning
  ball.x = 10;
  ball.y = 10;
  
  //stopping the ball's movement
  ball.velocityX = 0;
  ball.velocityY = 0;
  win.play();  
}

function boundary() {
  for (var i = 0; i < 400; i = i+10) {
   line(200, i, 200, i+5);
  }
}