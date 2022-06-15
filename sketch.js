//creating variables
var start, startImg;
var sword, fruits, fruits1, alien, alien1, gameOver, fruitGrp, alienGrp, score=0, highScore=0, ground, restart;
var ob1Img,ob2Img,ob3Img;
var PLAY=1,END=0,gameState=1,position;

function preload(){
  //loading images
  alienImg=loadImage("Image/500-note-front-770x535.webp");
  ob1Img=loadImage("Image/Green-Slot-Machine-Dollar-Sign.png");
  
  ob2Img=loadImage("Image/yellow-gold-biscuits-transparent-background-png-11577023406ezovhuk72u.png");
  
  ob3Img=loadImage("Image/Transparent-Diamond-Galaxy-Design-PNG.png");
  fruitImg1=loadImage("Image/cryptocurrency-icons-clipart.png");
  fruitImg2=loadImage("Image/59726-cryptocurrency-bitcoin-gold-png-free-photo.png");
  fruitImg3=loadImage("Image/cryptocurrency_blockchain_crypto-16-512.webp");
  fruitImg4=loadImage("Image/42-512.webp");
  gameOverImg=loadImage("Image/bc193a_65802df31fe24c0a96e90bd3576bcee1_mv2.png");
  swordImg=loadImage("Image/phone-animation-clipart-11.png");
  
  groundImg=loadImage("Image/52bc1038100123.5755f24f023a3.png");
  restartImg=loadImage("Image/restart-button.png");
  startImg=loadImage("Image/logo-fruit-ninja.jpg")

  swordCut=loadSound("https://static.wixstatic.com/mp3/bc193a_ac4e2b9865df4fa29d4af30179ff7569.mp3");
  alienEnd=loadSound("https://static.wixstatic.com/mp3/bc193a_e6a2deb76dd449e2b8743e1742b7b09d.mp3");
  fruitFall=loadSound("https://static.wixstatic.com/mp3/bc193a_0d471245d9144179bc2f3570bc8aab13.mp3");
}
function setup(){
  //creating canvas, sprites, groups and adding images
  createCanvas(1500,600);
  ground=createSprite(1500,600,0,0);
  ground.addImage("background",groundImg);
  ground.scale=5;
  sword=createSprite(300,200,0,0);
  gameOver=createSprite(800,200,0,0);
  gameOver.addImage("over",gameOverImg);
  gameOver.visible=false;
  sword.addImage('sword',swordImg);
  fruitGrp=new Group();
  alienGrp=new Group();
  sword.scale=0.1;
  bottom=createSprite(300,420,650,1);
  restart=createSprite(300,310,0,0);
  restart.addAnimation("restart",restartImg);
  restart.visible=false;
}
function draw(){
  //creating background and drawing sprites
  background("lightblue");
  drawSprites();
  //showing scores
  stroke("100")
  fill("white");
  textSize(20);
  text("High Score: "+highScore,310,50);
  text("Points: "+score,470,50);
  //starting when gameState=1
  if(gameState==PLAY){
    sword.x=mouseX;
    sword.y=mouseY;
    fruit();
    aliens();
    if(sword.isTouching(fruitGrp)){
      swordCut.play();
      score=score+1;
      fruitGrp.destroyEach();
    }
    if(alienGrp.isTouching(sword)){
       gameState=0;
       alienEnd.play();
    }
    position=Math.round(random(0,1));
  }else if(gameState==0){
  //stopping when gameState=0
    gameOver.visible=true;
    gameOver.scale=2.5;
    restart.visible=true;
    restart.scale=0.2;
    //restarting game
    if(mousePressedOver(restart)){
       restart.visible=false; 
       gameOver.visible=false;
       score=0;
       Count=0;
       gameState=1;
    }
    fruitGrp.destroyEach();
    alienGrp.destroyEach();
  }
  restart.debug=false;
  restart.setCollider("circle",0,-140,230);
  sword.debug=false;
  sword.setCollider("circle",20,-20,40);
  //making high score
  if(highScore<score){
     highScore=score;
  }
}
//creating fruit and aliens functions
function fruit(){
  if(World.frameCount%120==0){
    fruits=createSprite(0,random(0,400),0,0);
    if(position==0){
       fruits.x=0;
       fruits.velocityX=(7+score/4);
    }else if(position==1){
       fruits.x=600;
       fruits.velocityX=-(7+score/4);
    }
    fruits.lifetime=900;
    fruits.scale=0.1;
    fruitGrp.add(fruits);
    rand=Math.round(random(1,4));
    if(rand==1){
      fruits.addImage('fruit',fruitImg1);
    }else if(rand==2){
      fruits.addImage('fruit',fruitImg2);
    }else if(rand==3){
      fruits.addImage('fruit',fruitImg3);
    }else if(rand==4){
      fruits.addImage('fruit',fruitImg4);
    }
  }
}
function aliens(){
  if (World.frameCount%100==0){
    alien=createSprite(0,random(0,400),0,0);
    if(position==0){
       alien.x=0;
       alien.velocityX=(8+score/10);
    }else if(position==1){
       alien.x=600;
       alien.velocityX=-(8+score/10);
    }
    
    alien.lifetime=900;
     alien.scale=0.1;
    alienGrp.add(alien);
   
    
    rand=Math.round(random(1,4));
    if(rand==1){
      alien.addImage('fruit',ob1Img);
    }else if(rand==2){
      alien.addImage('fruit',ob2Img);
    }else if(rand==3){
      alien.addImage('fruit',ob3Img);
    }else if(rand==4){
      alien.addImage('fruit',alienImg);
    }
  }
}