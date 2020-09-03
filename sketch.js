//Create variables here
var dog, dogimg, happyDog, database, foodS, foodStock;
var a, b, c;

function preload()
{
  dog = createSprite(250, 300, 20, 20)
  dogimg = loadImage("images/dogImg1.png") 
  happyDog = loadImage("images/dogImg.png")  
  dog.addImage(dogimg)
  dog.scale = 0.2
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database()

  foodStock = database.ref('food')
  foodStock.on('value', readStock)

  a = random(0, 255)
  b = random(0, 255)
  c = random(0, 255)
}


function draw() {  
  background(rgb(46, 139, 87))

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog)
  }
  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogimg)
  }
  drawSprites();
  textSize(20)
  fill(rgb(a, b, c))
  text("PRESS UP ARROW KEY TO FEED SHERU MILK", 26, 75)
  text(foodS, 230, 220)
  text("New text color every time you refresh", 26, 475)
  //add styles here

}
function readStock(data){
  foodS = data.val()
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  }
  else{
    x = x-1
  }

  database.ref('/').update({
    food:x
  })

}

