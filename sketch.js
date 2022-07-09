//declaring various variables and images
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var gameState = "Play";
var gameover, gameoverImg;

function preload(){
  
  //loading various images
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 gameoverImg = loadImage("gameover.png");
}



function setup() {
  //creating the canvas
  createCanvas(400,400);
  //creating the monkey sprite
  monkey = createSprite(75,302,10,10);
  monkey.addAnimation("monky",monkey_running);
  monkey.scale = 0.13;
  //creating the ground sprite
  ground = createSprite(200,340,800,13);
  ground.velocityX = -4;
  //creating groups
  FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  //giving the background
  background("white");
  //giving game state play
  if(gameState === "Play"){
  //making the monkey collide the ground
  monkey.collide(ground);
  //giving keyDown keys
  if(keyDown("space")){
    monkey.velocityY = -10;
  }
    //destroying the fruit when the monkey touches it
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score = score + 1;
  }
    //creating the score
      textSize(30);
  text("SCORE : "+score,150,30);
    
      spawnBanana();
    spawnObstacles();
    //giving the infinite scrolling for the ground
   if(ground.x<0){
     ground.x = 200;
   }
    //giving gravity
  monkey.velocityY = monkey.velocityY + 0.8;
    //giving game state end
    if(monkey.isTouching(obstacleGroup)){
      gameState = "End";
      FoodGroup.destroyEach();
      obstacleGroup.destroyEach();
      FoodGroup.lifetime = 0;
      obstacleGroup.lifetime = 0;
      ground.lifetime = 0;
      FoodGroup.visible = "false";
      obstacleGroup.visible = "false";
      FoodGroup.setVelocityXEach(0);
      obstacleGroup.velocityX = 0;
      monkey.visible = "false";
      monkey.lifetime = 0;
      ground.velocityX = 0;
      ground.visible = "false";
      gameover = createSprite(200,190,10,10);
      gameover.addImage("game",gameoverImg);
      gameover.scale = 0.5;
    }
    
  }
 
  drawSprites();

}
function spawnBanana(){
  if(World.frameCount % 175===0){
    //creating the banana srite
    banana = createSprite(200,200,10,10);
    banana.addImage("banan",bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.12 ;
    banana.lifetime = 75;
    banana.velocityX = -3;
    //making the banana and the monkey have the same depth
    banana.depth = monkey.depth;
    
    monkey.depth = monkey.depth + 1;
    //adding bananas to the food group
    FoodGroup.add(banana);
  }
}
function spawnObstacles(){
  if(World.frameCount % 250 === 0){
    //creating the obstacle sprite
    obstacle = createSprite(220,302,10,10);
    obstacle.addImage("obs",obstacleImage);
    obstacle.scale =  0.2;
    obstacle.lifetime = 75;
    obstacle.velocityX = -3;
    //making the obstacle and monkey have the same depth
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    //adding the obstacle to the obstacle group
    obstacleGroup.add(obstacle);
  }
}



