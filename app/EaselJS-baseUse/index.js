// import '../vendor/createjs-2015.11.26.combined.js';
// import 'imports-loader?this=>window!createjs';
import 'createjs';
console.log(createjs)

//CreateJS是一套包含了各种方便开发HTML5应用的Javascript类库和工具的套件，主要包含如下四个类库：
// EaselJS - 简化处理HTML5画布
// TweenJS - 用来帮助调整HTML5和Javascript属性
// SoundJS - 用来简化处理HTML5 audio
// PreloadJS - 帮助管理和协调加载中的一些资源

let stage = new createjs.Stage("myCanvas");
let circle = new createjs.Shape();
circle.graphics
.setStrokeStyle(5)
.beginStroke("rgba(0,0,0,.5)")
.beginFill("orange")
.drawCircle(0, 0, 50);
circle.x = 160;
circle.y = 100;
// 生成的图形必须使用addChild添加到stage中，并且最后需要调用update方法来更新Stage
stage.addChild(circle);
stage.update();

//Graphics类可以生成很多不同的图形
let stage2 = new createjs.Stage("myCanvas2");
function drawCircle(){
	var circle = new createjs.Shape();
	circle.graphics.setStrokeStyle(2).beginStroke("rgba(0,0,0,.5)").beginFill("orange").drawCircle(0, 0, 50);
	circle.x = 55;
	circle.y = 100;
	stage2.addChild(circle);
	stage2.update();
}
function rect(){
	var rect = new createjs.Shape();
	rect.graphics.beginFill("orange").drawRect(10, 10, 100, 100);
	rect.x = 120;
	rect.y = 40;
	stage2.addChild(rect);
	stage2.update();
}
function polystar(){
	//生成多角形
	var polystar = new createjs.Shape();
	polystar.graphics.setStrokeStyle(5).beginStroke("orange").drawPolyStar(290,100,5,10,10,110);
	stage2.addChild(polystar);  
	stage2.update();
}
drawCircle();
rect();
polystar();

// 添加一个Ticker类帮助避免多次调用update方法
// 这样绘制图形后，就不必调用相关update方法啦
createjs.Ticker.addEventListener("tick", handleTicker);
function handleTicker(){
	stage.update();
	stage2.update();
}

// Shape类方便的修改图形相关属性
// 坐标位置
// 图形缩放
// 透明度
// 旋转效果
// 鼠标点击或者移动事件

// 本节相关代码将生成5个不同属性的圆形，
// 并且给每一个圆形都添加相关的鼠标事件，
// 例如，点击，鼠标移动出图形等

var stage3 = new createjs.Stage("myCanvas3");

function createCircle(){
	//生成圆形
	var circle = new createjs.Shape();
	circle.graphics.beginFill("orange").drawCircle(0, 0, 50);
	//以下方式可以方便的修改图形相关的属性
	//修改图形坐标
	circle.x = Math.floor(Math.random() * 200);
	circle.y = Math.floor(Math.random() * 350);
	//修改图形缩放
	circle.scaleX = Math.floor(Math.random() * 2)+1;
	circle.scaleY = Math.floor(Math.random() * 2)+1;
	//修改alpha和旋转
	circle.alpha = Math.random() * 1;
	circle.rotation = Math.floor(Math.random() * 60);
	//设置图形相关的鼠标事件
	circle.on("click", handleClick, null, false);            
	circle.on("mouseout", handleMouseOut, null, false);
	//将生成图形添加到stage中，并且调用update方法更新
	stage3.addChild(circle);
	stage3.update();
}
function handleClick(e){
  alert("已经点击了圆形");
}
function handleMouseOut(e){
  console.log("鼠标移出了圆形");
}
//生成5个不同的圆形
for(var i=0; i<5; i++){
	createCircle();
}

// 调用Text类即可快速生成需要的文字
var stage4 = new createjs.Stage("myCanvas4");
//绘制10个随机属性的文字
function drawText(){
  for(var i=0; i<10; i++){
      var theText = new createjs.Text("oudeqi","normal 32px microsoft yahei","#222222");
      theText.x = Math.floor(Math.random() * 300);
      theText.y = Math.floor(Math.random() * 300);
      theText.rotation = Math.floor(Math.random() * 360);
      theText.alpha = Math.random() * 1;
      theText.color = "#"+Math.floor(Math.random()*16777215).toString(16);
      stage4.addChild(theText);
      stage4.update();
  }
}
//生成文字
drawText();