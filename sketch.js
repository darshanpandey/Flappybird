var bg_image,bg
var ground_image,ground
var northPipe,southPipe,northPipe_image,southPipe_image
var bird_image,bird
var score 
var PLAY = 1
var END = 0
var gameState = PLAY
var restart,r




function preload(){
 bg_image = loadImage("Images/bg.png")
 ground_image = loadImage("Images/ground.png")
 northPipe_image =  loadImage("Images/north.jpg")
 southPipe_image = loadImage("Images/south.jpg")
 bird_image = loadImage("Images/flappybird.jpg")
 r = loadImage("Images/r.png")
}

function setup(){
    createCanvas(288,512);
    bg = createSprite(144,256,10,10)
    bg.addImage(bg_image)
    score = 0

   ground = createSprite(144,700,20,20)
   ground.addImage(ground_image)

    
    northPipeGroup = new Group()
    southPipeGroup = new Group()
    

    restart = createSprite(144,256,10,10)
    restart.addImage(r)
    restart.visible = false
    restart.scale = 0.4
   
    

   bird = createSprite(25, 250, 20,20)
   bird.addImage(bird_image)
   bird.scale = 0.1



}

function draw(){
background(0)


if(gameState === PLAY){
    ground.velocityX = -1

    if(ground.x < 137){
        ground.x = ground. width/2
    }

    if(keyDown("space")){
        bird.y = bird.y -10
    }

    else{
        bird.velocityY = 5
    }
 
  pipe_move()
 
  if(frameCount % 75 === 0){
    score++
}
  //Game END

 if(bird.isTouching(northPipeGroup)|| bird.isTouching(southPipeGroup)){
     gameState = END
 }
  
 if(bird.isTouching(ground)){
     gameState = END
 }
}
 else if(gameState === END){
     ground.velocityX = 0
     bird.visible = false
     bird.x = 25
     bird.y =250
     northPipeGroup.setVelocityXEach(0)
     southPipeGroup.setVelocityXEach(0)
     northPipeGroup.setLifetimeEach(-1)
     southPipeGroup.setLifetimeEach(-1)
     restart.visible = true
   
 }
  if(mousePressedOver(restart)){
      reset()
  }


    drawSprites()
    textSize(20)
    text("Score: "+score,150,500)
}



function pipe_move(){

    if(frameCount % 75 === 0){
        northPipe = createSprite(144, 0, 3,10)
        northPipe.addImage(northPipe_image)
        northPipe.scale = 0.1
        northPipe.y = random(0,50)
        northPipe.velocityX = -2
        northPipeGroup.add(northPipe)
        northPipeGroup.setLifetimeEach(144)







        southPipe = createSprite(144, 512, 3,10)
        southPipe.addImage(southPipe_image)
        southPipe.scale = 0.1
        southPipe.y = random(460,512)
        southPipe.velocityX = -2
        southPipeGroup.add(southPipe)
        southPipeGroup.setLifetimeEach(144)
        
    }
}


function reset(){
    gameState = PLAY
    northPipeGroup.destroyEach()
    southPipeGroup.destroyEach()
    bird.visible = true
    score = 0
    restart.visible = false
}