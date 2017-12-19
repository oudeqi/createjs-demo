import 'createjs';
console.log(createjs)


var audioLabel;
var audioStage;

window.addEventListener("load", initAudioDemo, false);

function initAudioDemo() {
  audioStage = new createjs.Stage(document.getElementById("myCanvas"));
  startAudioDemo();
}

function startAudioDemo() {
  // audioDemoIndex = 0;
  audioLabel = new createjs.Text("加载中...", "24px microsoft yahei", "#dd4814");
  audioLabel.x = 175 - audioLabel.getMeasuredWidth() / 2;
  audioLabel.y = 200;
  audioStage.addChild(audioLabel);
  var loader = new createjs.LoadQueue(true);
  loader.installPlugin(createjs.Sound); 
  loader.on("complete", readytoplayAudio);
  loader.loadFile({id:"mysound", src:"http://www.gbtags.com/tutorials/html5-tutorial/html5-demos/assets/song.ogg"});
  audioLabel.text = "加载中...";
  audioStage.update();
}

function playAudio() {
  createjs.Sound.play("mysound");
  audioStage.update();
}

function readytoplayAudio() {
  audioLabel.text = "加载完毕，点击播放";
  audioLabel.x = 175 - audioLabel.getMeasuredWidth() / 2;
  audioLabel.y = 200;
  audioStage.on("stagemousedown",playAudio,null,false);
  audioStage.update();
}


/*
SoundJS提供了简单而强大的API来处理音频，
大多数情况下这个类库都静态方式使用（无需创建实例）。
通过插件来执行实际的音频实现，无需学习平台相关的知识，简单直接的处理声音
*/

/*
使用SoundJS，可以使用Sound类的公开API：
    安装回放插件
    登记声音
    创建和播放声音
    处理音量，静音，控制暂停
*/

/*
播放声音创建SoundInstance实例，可以单独控制，例如：
    暂停，继续，查找和停止
    控制音量，静音等
    监听声音实例的相关事件并且当播放完毕，循环或者失败时得到提示
*/

/*
下面是最少的代码实现声音播放
    createjs.Sound.initializeDefaultPlugins();
    createjs.Sound.alternateExtensions = ["ogg"];
    var myInstance = createjs.Sound.play("IntoxicatedRat.mp3");
*/

/*
以上代码在IE中可以工作，但是在firefox和chrome上不支持，
缺省使用的是webAudio，我们需要等级HTMLaudio，如下：
    createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);
    //console.log(createjs.Sound.activePlugin.toString());
    createjs.Sound.alternateExtensions = ["ogg"];
    var mySound = createjs.Sound.play("IntoxicatedRat.mp3");
以上代码中如果无法加载MP3的话，我们使用alternateExtensions属性来加载文件OGG
*/