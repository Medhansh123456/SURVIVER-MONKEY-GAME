
var monkey , monkey_running;
var banana ,bananaImage;
var obstacle, obstacleImage
var foodGroup, obstacleGroup
var survivalTime,score;
var backg,jungle;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  jungle = loadImage("jungle.jpg")
 
}



function setup() {
  createCanvas(400,400)
  
  backg = createSprite(200,200,400,400,)
  backg.velocityX = -4
  backg.x = backg.width/2
  backg.addImage(jungle)
  
  monkey = createSprite(80,315,20,20)
  monkey.addAnimation("moving", monkey_running)
  monkey.scale = 0.1

  ground = createSprite(400,390,900,10)
  ground.velocityX = -4;
  ground.x = ground.width/2;

  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
  survivalTime = 0
  score = 0;

}



function draw() {
  
 ground.visible = true; 
  
if(ground.x<0){
  ground.x = ground.width/2;
}

if(backg.x<0){
  backg.x = backg.width/2
}
  
if(keyDown("space")){
  monkey.velocityY = -12  
}  
  monkey.velocityY = monkey.velocityY + 0.8   

  monkey.collide(ground);
  
if(foodGroup.isTouching(monkey)){
  score = score + 2
  foodGroup.destroyEach()
  monkey.scale=0.2;
}
  
if(obstacleGroup.isTouching(monkey)){
  monkey.scale = 0.1
  obstacleGroup.destroyEach()
}

  spawnFood();
  spawnObstacles();
  
  
  drawSprites(); 
  
  stroke("white")
  textSize(20);
  fill("white");
  text("Score: "+ score, 100,100)
  
  
  stroke("black")
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: " + survivalTime, 100,50)
  
  

  
  
}

function spawnFood(){
if(frameCount%80===0){
  banana = createSprite(600,250,40,10);
  banana.addImage(bananaImage);
  banana.y = Math.round(random(120,200));
  banana.velocityX = -7;
  banana.scale = 0.05;
  banana.lifetime = 200;
  foodGroup.add(banana);
}
}

function spawnObstacles(){
if(frameCount%300===0){
  obstacle = createSprite(250,370,40,10);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.10
  obstacle.velocityX = -5; 
  obstacle.lifetime = 300;
  obstacleGroup.add(obstacle);
}
}

function scoring(){
if(score % 10 === 0){
  switch(score){
    case 10: monkey.scale = 0.12;
      break;
    case 20: monkey.scale = 0.14;
      break;
    case 30: monkey.scale = 0.16;
      break;
    case 40: monkey.scale = 0.18;
      break;
    default : break;
  }
}
}
