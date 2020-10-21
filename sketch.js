var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage, bananaG, obstacleG;
var FoodGroup, obstacleGroup
var score, gameState, ground;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  monkeyCollided = loadAnimation("sprite_0.png", "sprite_5.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  building = loadImage("download.jpg");
}



function setup() {

  createCanvas(600, 400);
  gameState = "play";
  survivalTime = 0;

  score = 0;
  ground = createSprite(300, 410, 600, 20);

  monkey = createSprite(90, 340, 20, 20);
  monkey.addAnimation("monkey_running", monkey_running);
  monkey.addAnimation("collided", monkeyCollided);
  monkey.scale = 0.2;

  bananaG = new Group();
  obstacleG = new Group();
}


function draw() {
  background(building);

  if (gameState === "play") {
    spawnBanana();
    spawnObstacle();
    monkey.collide(ground);
  }
  if (keyDown("space")&& gameState === "play") {
    monkey.velocityY = -12;
  }

  monkey.velocityY = monkey.velocityY + 0.8

  if (monkey.isTouching(bananaG) && gameState === "play") {
    bananaG.destroyEach();
    score++;
  }
  if (monkey.isTouching(obstacleG) && gameState === "play") {
    gameState = "end";
  }
  if (gameState === "end") {
    obstacle.velocityX = 0;
    banana.velocityX = 0;
    obstacle.lietime = -1;
    banana.lifetime = -1;
    monkey.addAnimation("collided", monkeyCollided);
    banana.x = 800;
    obstacle.x = 800;
    monkey.changeAnimation("collided", monkeyCollided);
    monkey.x = 800;
    fill("black");
    textSize(100)
    text("GameOver", 80, 200);

    restart = createSprite(300, 200, 600, 400);
    restart.visible = false;

  }

  stroke("white");
  textSize(20);
  fill("white");
  text("score:" + score, 50, 50);

  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time:" + survivalTime, 250, 50);
  survivalTime = Math.ceil(frameCount / frameRate());

  drawSprites();
}

function spawnBanana() {
  if (frameCount % 130 === 0) {
    banana = createSprite(600, Math.round(random(80, 160)), 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    bananaG.add(banana);
    banana.lifetime = 150;
  }
}

function spawnObstacle() {
  if (frameCount % 60 === 0) {
    obstacle = createSprite(600, 390, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -4;
    obstacle.scale = 0.2;
    obstacle.lifetime = 150;
    obstacleG.add(obstacle);
    obstacle.veloityY=2;
    obstacle.collide(ground);
  }
}