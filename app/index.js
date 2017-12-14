// import '../vendor/createjs-2015.11.26.combined.js';
// import 'imports-loader?this=>window!createjs';
import 'createjs';
console.log(createjs)

let stage = new createjs.Stage("demoCanvas");
let circle = new createjs.Shape();
circle.graphics.beginFill("red").drawCircle(0, 0, 40);
circle.x = circle.y = 50;
stage.addChild(circle);
stage.update();