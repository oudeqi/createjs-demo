import 'createjs';
console.log(createjs)

var canvas = document.getElementById("myCanvas");
var stage = new createjs.Stage(canvas);

var stageHeight = canvas.height;
var stageWidth = canvas.width;
var blockHeight = 70;

var spritesheet;
var character;
var characterHeight = 96;
var characterWidth = 75;
var characterGround = stageHeight - blockHeight - characterHeight;
var moveLeft = false;
var moveRight = false;
var isJumping = false;
var xVel = 5;
var yVel = 0;
var gravity = 1.2;
var KEYCODE_UP = 38;
var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;


function handleKeyDown(e) {
    switch (e.keyCode) {
        case KEYCODE_UP:
        case 87:  // W
            jump();
            break;
        case KEYCODE_LEFT:
        case 65:  // A
            moveLeft = true;
            character.play();
            break;
        case KEYCODE_RIGHT:
        case 68:  // D
            moveRight = true;
            character.play();
            break;
    }
}
function handleKeyUp(e) {
    switch (e.keyCode) {
        case KEYCODE_LEFT:
        case 65:  // A
            moveLeft = false;
            character.gotoAndStop(0);
            break;
        case KEYCODE_RIGHT:
        case 68:  // D
            moveRight = false;
            character.gotoAndStop(0);
            break;
    }
}

function jump() {
    if (isJumping == false) {
        yVel = -15;
        isJumping = true;
    }
}
  


window.onload=function(){
    var ground = new createjs.Bitmap(require('./ground.png'));
    //克隆5个地面图片生成游戏区域的地面效果
    for (var i = 0; i < 5; i++) {
        var tempBlockGround = ground.clone();
        tempBlockGround.x = i * 70;
        tempBlockGround.y = stageHeight - blockHeight;
        stage.addChild(tempBlockGround);
    }

    spritesheet = new createjs.SpriteSheet({
        "images": [require('./charactor.png')],
        "frames": {"height": 96, "count": 10, "width": 75},
        "animations": { run: [0,9]}
    });
    character = new createjs.Sprite(spritesheet);
    character.framerate = 30; 
    character.x = 50;
    character.y = characterGround;
    stage.addChild(character);

    createjs.Ticker.addEventListener("tick", tick);
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
};

function tick(event) {
    //控制人物的移动和翻转效果
    if (moveLeft) {
        character.x -= xVel;
        if (character.scaleX > 0) {
            character.scaleX *= -1;
            character.x += characterWidth;
        }
    }else if (moveRight) {
        character.x += xVel;
        if (character.scaleX < 0) {
            character.scaleX *= -1;
            character.x -= characterWidth;
        }
    }

    //控制跳跃
    if (isJumping) {
        yVel += gravity;
        character.y += yVel;
        if (character.y > characterGround) {
            character.y = characterGround;
            yVel = 0;
            isJumping = false;
        }          
    }
    stage.update();
}