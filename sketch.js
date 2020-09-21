var dogImg,happyDogImg,database,foodS,foodStock;
var dog;
var fedTime,lastFed,foodObj;
var feed,addFood;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(600,600);
  
  dog = createSprite(200,200,10.10);
  dog.addImage("dog",dogImg);
  dog.scale = 0.2;

  database = firebase.database();

  foodObj =  new Food(foodS,lastFed);


  feed = createButton("Feed the Dog");
  feed.position(700,135);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,135);
  addFood.mousePressed(addFoods)

}


function draw() {  
  background(46, 139, 87);
  textSize(20);
  fill(0, 255, 55)
  stroke(0, 255, 55)
  strokeWeight(1)
  text("Note: Press UP_Arrow key to feed Drago milk!",50,50);
  text("Bottles Remaining:" + foodS,300,200);

   fedTime = database.ref('FedTime')
   fedTime.on("value",function(data){
     lastFed = data.val();
   })

   fill(255,255,254)
   textSize(15)
   if(lastFed>=12){
     text("Last Feed: " + lastFed%12 + "PM" ,350,30) 
   } else if(lastFed==0){
     text("Last Feed : 12 AM",350,30)
   } else { 
     text("Last Feed: "+lastFed+"AM",350,30)
   }


 

  foodObj.display();
  foodObj.getFoodStock();
  //  foodObj.updateFoodStock();
  foodObj.deductFoodStock();
  

  drawSprites();
  
}

function feedDog(){
  dog.addImage("dog",happyDogImg);


  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('Food').set({
    Food : foodObj.getFoodStock()
  })
  database.ref('FedTime').set({
    fedTime : hour()
  })
}

function addFoods(){
  foodS++
  database.ref('/').set({
    Food: foodS
  })
}