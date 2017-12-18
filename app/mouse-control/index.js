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

spritesheet = new createjs.SpriteSheet({
    'images': ['http://cdn.gbtags.com/gblibraryassets/libid108/charactor.png'],
    'frames': {"height": 96, "count": 10, "width": 75}
});
  
charactor  = new createjs.Sprite(spritesheet);
charactor.x = (stageWidth - characterWidth)/2;
charactor.y = (stageHeight - characterHeight)/2;

stage.addChild(charactor);

charactor.play()

// createjs.Ticker.setFPS(35);

createjs.Ticker.addEventListener("tick", tick);

function tick(){
	stage.update();
}