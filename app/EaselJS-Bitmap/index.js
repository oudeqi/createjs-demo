import 'createjs';
console.log(createjs)

// 使用 Bitmap类可以非常方便的处理图片，
// Bitmap可以用来代表任何形式，比如，Canvas，视频或者图片，
// 可以使用已经存在的元素实例化，或者使用base64。

// 本节代码示例中将使用Bitmap生成5个图片，
// 并且随机位置，并且添加随机的阴影颜色

let stage = new createjs.Stage("myCanvas");
let img = new Image();
img.src = require("./test-pic.png");
img.onload = function () {
  for(let i = 0; i<3; i++){
      let tempBitMap = new createjs.Bitmap(img);
      let randX = Math.floor(Math.random()* 300);
      let randY = Math.floor(Math.random() * 300);
      let randomColor = "#"+Math.floor(Math.random()*16777215).toString(16);
      let randomXOffset  = Math.floor(Math.random() * 10) + 5;
      let randomYOffset  = Math.floor(Math.random() * 10) + 5;
      stage.addChild(tempBitMap);
      tempBitMap.x = randX;
      tempBitMap.y = randY;
      tempBitMap.rotation = Math.floor(Math.random() * 360);
      tempBitMap.shadow = new createjs.Shadow(randomColor, randomXOffset, randomYOffset, 10);
  }
  stage.update();
}

// Sprite用来在SpriteSheet中显示一个动画或者一系列的动画帧，
// SpriteSheet是一系列的图片整合到一张图片中，可以用来定义一个完整的动画

let stage2 = new createjs.Stage("myCanvas2");
function setup() {
	var spritesheet = new createjs.SpriteSheet({
		"images": [characterImage], //动画人物图片来自base64编码字符串
		"frames": {"height": 96, "count": 10, "width": 75},
		"animations": { run: [0,9]}
	});
	/*
	以上代码包含了三个重要的参数：
	--图片定义（这里使用base64字符串编码图片）
	--帧定义（定义图片中每一帧使用的图片大小）
	--定义动画（比如，从开始到结束，或者定义成[0,1,2,3,4,5,6...]
	播放动画可以使用sprite的play方法，停止可以使用stop或者gotoAndStop
	*/
	var character = new createjs.Sprite(spritesheet, "run");
	character.framerate = 10; 
	character.play();//播放动画
	stage2.addChild(character);
	createjs.Ticker.addEventListener("tick", function(event) {
		stage2.update();
	});
}

setup();

// Container类是EaselJS中用来管理符合图形的单位，
// 例如，我们可以将一个人物的，头，手，脚等等放置在统一的容器中，
// 这样一来，可以统一的管理或者动画图形。虽然容器中每一个部分都可以单独的生成动画，
// 但是容器中的子元素都可以统一使用容器的属性来控制

// 本节相关代码将演示如何使用容器来定义一系列图片，
// 并且通过定义容器来控制这一系列图片，实现统一的行为

var stage3 = new createjs.Stage("myCanvas3");
//创建容器
var container3 = new createjs.Container();
//添加容器到stage
stage3.addChild(container3);
stage3.on("stagemousedown", moveContainer, null, false);
function setup3(){
  for(var i = 0; i<2; i++){
      var tempBitMap = new createjs.Bitmap(require('./test-pic.png'));
      tempBitMap.x = 0;
      tempBitMap.y = i * 140;
      //添加图片到容器
      container3.addChild(tempBitMap);
  }
  stage3.update();
  setTimeout(function(){stage3.update()},1500);
}

//鼠标点击后出发的容器移动方法
function moveContainer(){
  container3.x +=20;
  stage3.update();
}
setup3();

// 在图形处理中，往往会有一些图形不太变化，而每次都重新渲染会使得性能比较受影响,
// 在EaselJS中提供了cache()方法，这个方法可以帮助生成绘制时需要使用的图形到新画布里，
// 它不会在每一个tick中被重新绘制，因此加载速度快，性能更好

// 被cache的显示图形也可以自由的控制移动，旋转，淡入淡出等等属性，
// 但图形变化了需要手动调用cache或者updateCache方法重新加载

// 需要指定cache的矩形区域相关x, y, w,和h参数。指定的这个矩形区域会被重新渲染和cache。
// 注意不要cache相关图形Bitmap类型元素，因为性能会受影响，但是可以cache相关的图片滤镜（filter）

// var canvas4 = document.getElementById("myCanvas4");
// var stage4 = new createjs.Stage(canvas4);
// var radius = 20;
// var colors = ["#828b20", "#b0ac31", "#cbc53d", "#fad779", "#f9e4ad", "#faf2db", "#563512", "#222222"];
// for(var i=0; i<500; i++){
// 	var shape = new createjs.Shape();
// 	shape.graphics.beginFill(colors[Math.random() * colors.length | 0]).drawCircle(0, 0, radius);
// 	//修改图形坐标
// 	shape.x = Math.floor(Math.random() * 200);
// 	shape.y = Math.floor(Math.random() * 300);
// 	shape.velX = Math.random() * 10 - 5;
// 	shape.velY = Math.random() * 10 - 5;
// 	shape.alpha = Math.random() * 1;
// 	//尝试注释掉如下cache代码，比较一下FPS值的区别和动画性能区别
// 	// shape.cache(-radius, -radius, radius * 2, radius * 2);
// 	stage4.addChild(shape);
// }

// //添加一个FPS，比较一下性能区别
// var fpsLabel = new createjs.Text("-- fps", "normal 24px Arial", "#FFF");
// stage4.addChild(fpsLabel);
// fpsLabel.x = 10;
// fpsLabel.y = 20;
// createjs.Ticker.addEventListener("tick", function(event) {
// 	var w = canvas4.width + radius * 2;
// 	var h = canvas4.height + radius * 2;
// 	var l = stage4.getNumChildren() - 1;
// 	for (var i = 1; i < l; i++) {
// 	var shape = stage4.getChildAt(i);
// 	shape.x = (shape.x + radius + shape.velX + w) % w - radius;
// 	shape.y = (shape.y + radius + shape.velY + h) % h - radius;
// 	}
// 	fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS()) + " fps";
// 	stage4.update(event);
// });


// 注意Filter需要在cache方法处理后的才可以执行，
// 一旦图形变化了，需要再次调用cache，或者使用updateCache方法

// EaselJS包含了一些内置的滤镜方法，如下：
// AlphaMapFilter : 将一个灰度图形映射到一个图形的阿尔法通道
// AlphaMaskFilter: 将一个图片的阿尔法通道映射到一个显示图形的阿尔法通道
// BlurFilter: 执行水平和垂直的模糊
// ColorFilter: 显示对象的颜色变形
// ColorMatrixFilter: 使用ColorMatrix1来变形图片

// 本节课程代码例子，使用了一个ColorFilter和一个BlurFilter，
// 请大家使用鼠标点击预览窗口中的图片，查看图片滤镜执行后的效果


var stage5 = new createjs.Stage("myCanvas5")
stage5.on("stagemousedown", colorPicture, null, false);
var randNum = Math.random();
var windmill;
function setup5(){
	windmill = new createjs.Bitmap(require('./test-pic.png'));
	stage5.addChild(windmill);
	stage5.update();
	setTimeout(function(){stage5.update()},2000);
}
function colorPicture(){
	windmill.filters = [
	 	new createjs.ColorFilter(1,0,0,1), 
	    new createjs.BlurFilter(5, 5, 10)
	];
	windmill.cache(0, 0, 600, 400);
	stage5.update();
}
setup5();
