
var climber, climberImage, climberGroup
var tower, towerImage
var doorImage , door, doorGroup
var ghost, ghostImage
var invisibleblock, invisibleblockGroup
var gameState="PLAY" 
var spookySound
function preload (){
 towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png")
  climberImage=loadImage("climber.png")
  ghostImage=loadImage("ghost-standing.png")
  spookySound=loadSound("spooky.wav")
}

function setup(){
  createCanvas(600,600);
  spookySound.loop()
  tower=createSprite(300,300);
  tower.addImage(towerImage)
  tower.velocityY=1;
  doorGroup= new Group()
  climberGroup= new Group()
  invisibleblockGroup= new Group()
  ghost=createSprite(200,200,50,50)
  ghost.addImage(ghostImage)
  ghost.scale=0.3
}

function draw (){
  background(0);
  if(gameState==="PLAY"){
      if(tower.y>400){
        tower.y=300
      }
      if(keyDown("space")){
        ghost.velocityY=-5
      }
      if(keyDown("left_arrow")){
        ghost.x=ghost.x-3
      }
      if(keyDown("right_arrow")){
        ghost.x=ghost.x+3
      }
      if(climberGroup.isTouching(ghost)){
        ghost.velocityY=0
      }
      if(invisibleblockGroup.isTouching(ghost)||ghost.y >600){
       ghost.destroy() 
        gameState="END"
      }
      ghost.velocityY=ghost.velocityY+0.8
      spawnDoors()
    drawSprites();
  }
  

if(gameState==="END"){
  stroke("purple")
  fill("purple")
  textSize(30)
  text("GAME OVER",230,250)
}}
function spawnDoors(){
  if(frameCount %240===0){
    door= createSprite(200,-50)
door.addImage(doorImage)
 door.x=Math.round(random(120,400))   
  door.velocityY=1
    door.lifetime=800
    doorGroup.add(door)
    ghost.depth=door.depth
    ghost.depth+=1
    climber=createSprite(200,10)
    climber.addImage(climberImage)
    climber.x=door.x
    climber.velocityY=1
    climber.lifetime=800
    climberGroup.add(climber)
    invisibleblock= createSprite(200,15)
    invisibleblock.width= climber.width
    invisibleblock.visible=false 
    invisibleblock.x=door.x
    invisibleblock.velocityY=1
    invisibleblock.height=2
    invisibleblockGroup.add(invisibleblock)
  }
}