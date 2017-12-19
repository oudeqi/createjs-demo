import 'createjs';
console.log(createjs)

var canvas = document.getElementById("myCanvas");
var stage = new createjs.Stage(canvas);
var manifest;
var preload;
var progressText = new createjs.Text("", "20px Arial", "#dd4814");
progressText.x = 125 - progressText.getMeasuredWidth() / 2;
progressText.y = 20;
stage.addChild(progressText);
stage.update();

//定义相关JSON格式文件列表
function setupManifest() {
    manifest = [{
        src:  "http://cdn.gbtags.com/EaselJS/0.7.1/easeljs.min.js", 
        id: "easeljs"
    }, {
        src: "http://www.gbtags.com/gb/networks/uploadimgthumb/4d8f3f13-89c0-455c-95f3-ba5120c2f123.jpg",
        id: "logo"
    }, {
        src:  "http://www.gbtags.com/tutorials/html5-tutorial/html5-demos/assets/song.ogg",
        id: "audiofile"
    }
 
    ];
    for(var i=1; i<=10; i++){
        manifest.push({src:"http://www.gbtags.com/gb/laitu/200x200"})
    }
}

//开始预加载
function startPreload() {
    preload = new createjs.LoadQueue(true);
    //注意加载音频文件需要调用如下代码行
    preload.installPlugin(createjs.Sound);         
    preload.on("fileload", handleFileLoad);
    preload.on("progress", handleFileProgress);
    preload.on("complete", loadComplete);
    preload.on("error", loadError);
    preload.loadManifest(manifest);
 
}

//处理单个文件加载
function handleFileLoad(event) {
    console.log("文件类型: " + event.item.type);
    if(event.item.id == "logo"){
        console.log("logo图片已成功加载");
    }
}
 
//处理加载错误：大家可以修改成错误的文件地址，可在控制台看到此方法调用
function loadError(evt) {
    console.log("加载出错！",evt.text);
}
 
//已加载完毕进度 
function handleFileProgress(event) {
    progressText.text = "已加载 " + (preload.progress*100|0) + " %";
    stage.update();
}

//全度资源加载完毕
function loadComplete(event) {
    console.log("已加载完毕全部资源");
}

setupManifest();
startPreload();

/*
PreloadJS是一个用来管理和协调相关资源加载的类库，它可以方便的帮助你预先加载相关资源，
例如:图片、文件、音频、数据、其他
*/

/*
它使用了XHR2来提供实时的加载进度信息，如果不支持则使用标签式的简化进度来实现进度展示。
支持多队列，多连接，暂停队列等等功能
*/

/*
在PreloadJS中，LoadQueue是主要来API用来预加载内容。
LoadQueue是一个加载管理器，可以预先加载一个文件或者一个文件队列。

var queue = new createjs.LoadQueue(true);
//以上代码中，传递一个false参数则强制使用标签式的加载。LoadQueue包含了几个可以订阅的事件：
//complete: 当队列完成全部加载后触发
//error: 当队列遇到错误时触发
//progress: 整个队列变化时展示的进度
//fileload: 一个单独文件加载完毕
//fileprogress: 一个单独文件变化的进度，请注意只有文件使用XHR加载才会触发，其它只会显示0或者100%

可以通过调用loadfile("文件路径")加载一个文件或者调用 loadMnifest ()来加载多个文件

*/


/*
LoadQueue支持相关文件类型如下：
BINARY:  XHR调用的二进制文件
CSS: CSS文件
IMAGE: 一般图片文件格式
JAVASCRIPT: JavaScript文件
JSON: JSON数据
JSONP: 跨域JSON文件
MANIFEST: JSON格式的文件列表
SOUND: 音频文件
SVG: SVG文件
TEXT: 文本文件 - 仅支持XHR
XML: XML数据
*/


