
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint = Matter.Constraint;
var treeObj, stoneObj, groundObject, launcherObject;
var chain, mango1;
var world, boy;

function preload() {
	boy = loadImage("images/boy.png");
}

var boyPosition = { x: 240, y: 420 };

function setup() {
	createCanvas(1300, 600);
	engine = Engine.create();
	world = engine.world;

	mango1 = new Mango(1100, 100, 30);
	mango2 = new Mango(1150, 100, 30);
	mango3 = new Mango(1050, 150, 30);
	mango4 = new Mango(1000, 100, 30);
	mango5 = new Mango(900, 200, 30);
	mango6 = new Mango(1000, 200, 30);
	mango7 = new Mango(1200, 200, 30);
	mango8 = new Mango(1250, 150, 30);

	treeObj = new Tree(1050, 580);
	groundObject = new ground(width / 2, 600, width, 20);
	stone = new Stone(240, 500, 50, 100);
	chain = new ChainClass(stone.body, boyPosition);

	Engine.run(engine);

}

function draw() {

	background(230);
	//Add code for displaying text here!
	image(boy, 200, 340, 200, 300);

	treeObj.display();
	mango1.display();
	mango2.display();
	mango3.display();
	mango4.display();
	mango5.display();
	mango6.display();
	mango7.display();
	mango8.display();

	groundObject.display();
	stone.display();
	chain.display();


	detectCollision(stone, mango1);
	detectCollision(stone, mango2);
	detectCollision(stone, mango3);
	detectCollision(stone, mango4);
	detectCollision(stone, mango5);
	detectCollision(stone, mango6);
	detectCollision(stone, mango7);
	detectCollision(stone, mango8);

}

function mouseDragged() {
	Matter.Body.setPosition(stone.body, { x: mouseX, y: mouseY });
}

function mouseReleased() {
	chain.fly();
}

function detectCollision(lstone, lmango) {

	mangoBodyPosition = lmango.body.position;
	stoneBodyPosition = lstone.body.position;

	var distance = dist(stoneBodyPosition.x, stoneBodyPosition.y, mangoBodyPosition.x, mangoBodyPosition.y);
	//console.log('distance is', distance, lmango.r, lstone.height, lstone.width);


	if (distance <= lmango.r + lstone.height) {
		console.log(`dropping...`);
		Matter.Body.setStatic(lmango.body, false)
	}
}

function keyPressed() {
	if (keyCode === 32) {
		Matter.Body.setPosition(stone.body, boyPosition);
		chain.attach(stone.body);
	}
}