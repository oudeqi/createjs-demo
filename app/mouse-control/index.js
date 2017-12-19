import 'createjs';
console.log(createjs)

//EaselJS生成游戏动画人物效果
// 本节中将使用SpriteSheet和Sprite生成HTML5游戏中的动画人物形象
// 使用SpriteSheet定义动画帧相关的图片，并且使用Sprite定义动画人物
// 最后调用Ticker来生成动画效果

var canvas = document.getElementById('myCanvas');
var stage = new createjs.Stage(canvas);
var stageWidth = canvas.width;
var stageHeight = canvas.height;
var characterWidth = 75;
var characterHeight = 96;
var spritesheet; 
var charactor;
var shape;

window.onload = function(){
	shape = new createjs.Shape();
	shape.graphics.setStrokeStyle(10).beginStroke("#9fa56e");
	stage.addChild(shape);

	spritesheet = new createjs.SpriteSheet({
	    'images': [require('./charactor.png')],
	    'frames': {"height": 96, "count": 10, "width": 75}
	});
	  
	charactor  = new createjs.Sprite(spritesheet);
	charactor.x = (stageWidth - characterWidth)/2;
	charactor.y = (stageHeight - characterHeight)/2;

	stage.addChild(charactor);
	charactor.play()
	createjs.Ticker.setFPS(35);
	createjs.Ticker.addEventListener("tick", tick);
}

function tick(){
	shape.graphics.lineTo(stage.mouseX, stage.mouseY);
	// charactor.x = stage.mouseX - characterWidth/2;
 //    charactor.y = stage.mouseY - characterHeight/2;
    //这里使用递增效果来动画设置人物的移动坐标，大家可以修改参数改变移动速度
    charactor.x += (stage.mouseX - charactor.x - characterWidth/2)*0.05;
    charactor.y += (stage.mouseY - charactor.y - characterHeight/2)*0.05;
// 使用Sprite的相关方法play和gotoAndStop可以控制游戏人物的动画效果播放或者暂停
    if((Math.abs(charactor.x - (stage.mouseX - characterWidth/2))<1)
        && (Math.abs(charactor.y - (stage.mouseY - characterHeight/2))<1)){
		charactor.gotoAndStop(0);
    }else{
      charactor.play();
    }
	stage.update();
}
