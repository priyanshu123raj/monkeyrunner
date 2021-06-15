var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime=0;
var gameover,gameoverImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
   gameoverImage = loadImage("gameover.jpeg");
}

function setup() {
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  gameover = createSprite(200, 200, 20, 20);
  gameover.addImage("over", gameoverImage);
  
  gameover.scale = 0.5;
  
  foodsGroup = new Group();
  obstaclesGroup = new Group();
  
  score=0;
  
 
}


function draw() {
  //createCanvas(600,600);
  background("lightgreen");
   
  
  if(gameState===PLAY){
     survivalTime = Math.ceil(frameCount/frameRate());
    
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
  }
     monkey.velocityY = monkey.velocityY + 0.8;
    
    if (ground.x < 0){
      ground.x = ground.width/2;
   }
    monkey.collide(ground);
     console.log(monkey.y);
    
    foods();
   obstacles();
    
    gameover.visible = false;
    
     if(obstaclesGroup.isTouching(monkey)){ 
         gameState = END;
     }
  }
  else if(gameState===END){
    
    ground.velocityX = 0;
    monkey.velocityY = 0;   
    
    obstaclesGroup.setVelocityXEach(0); 
    foodsGroup.setVelocityEach(0,0); 
    
    obstaclesGroup.setLifetimeEach(-1);  
    foodsGroup.setLifetimeEach(-1); 
    
    survivalTime=0;
    
    gameover.visible = true;
    
    
  }
  
   stroke("white");
   textSize(20);
   fill("white");
   text("score: "+score,500,50);
  
   stroke("black");
   textSize(20);
   fill("black");
  
   text("SurvivalTime: "+survivalTime,100,50);
  
drawSprites();
  
}


function foods(){
   if (frameCount % 80 === 0) {
    var food = createSprite(400,120,20,20);
    food.y = Math.round(random(120,200));
    food.addImage(bananaImage);
    food.scale = 0.1;
    food.velocityX = -3;
    food.lifetime = 200;
    foodsGroup.add(food);
    
  }
}

function obstacles(){
   if(frameCount % 300 === 0) {
    var obstacle = createSprite(400,315,40,40);
     obstacle.y = Math.round(random(300,325));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstaclesGroup.add(obstacle);
     
  }
}


