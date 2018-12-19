// canvasタグ作成
var createcvs = document.createElement("canvas");
createcvs.id = "drawseason";
var objBody = document.getElementsByTagName("body").item(0);
objBody.appendChild(createcvs);

var createcvs2 = document.createElement("canvas");
createcvs2.id = "drawseason2";
var objBody2 = document.getElementsByTagName("body").item(0);
objBody2.appendChild(createcvs2);


  $('#drawseason').get(0).width = $(window).width();
  $('#drawseason').get(0).height = $(window).height();
  $('#drawseason2').get(0).width = $(window).width();
  $('#drawseason2').get(0).height = $(window).height();


var cvs = document.getElementById("drawseason");
var cvsgt = cvs.getContext("2d");
var cvsgt2 = cvs.getContext("2d");
var cvs2 = document.getElementById("drawseason2");
var cvsgt3 = cvs2.getContext("2d");

var images = 100; // 星の数
var imgbox = []; // 星(大きい方)
var imgbox2 = []; // 星(小さい方)
var windowsizewidth = window.parent.screen.width;
var windowsizeheight = window.parent.screen.height;
var bgsetting = true;

// 流れ星の移動軸
var x = windowsizewidth;
var y = 0;

// fpsチェック
var fpsboolean = false;

function fpsCheck() {
  var requestAnimationFrame = window.requestAnimationFrame;
  var st, et, d, count = 0, max = 30, fps = 0;
  var counter = function () {
    count++;
    if (count === 1) {
      st = new Date().getTime();
    }
    if (count === max) {
      et = new Date().getTime();
      d = et - st;
      fps = count / d * 1000;
      // スペックによって流れ星のスピードが異なる
      if (fps >= 60) {
        fpsboolean = true;
      }
      count = 0;
    }
    requestAnimationFrame(counter);
  };
  requestAnimationFrame(counter);
};

fpsCheck();

function Shootingstar() {
  // 画像軸設定
  function setImagas() {
    for (var i = 0; i < images; i++) {
      imgbox.push({
        "x": Math.random() * windowsizewidth,
        "y": Math.random() * 400,
        "sizex": 10,
        "sizey": 10,
      });
      imgbox2.push({
        "x": Math.random() * windowsizewidth,
        "y": Math.random() * 400,
        "sizex": 5,
        "sizey": 5,
      });
    }
  }

  // 背景星作成
  var i = 0;
  function imagesin() {
    cvsgt.clearRect(0, 0, windowsizewidth, windowsizeheight + 10);
    cvsgt2.clearRect(0, 0, windowsizewidth, windowsizeheight + 10);
    for (i = 0; i < images; i++) {
      //ここで円を描く
      cvsgt.beginPath();
      cvsgt.fillStyle = 'rgb(255, 255, 255)';
      cvsgt.arc(imgbox[i].x, imgbox[i].y, 1, 0, Math.PI * 2, false);
      cvsgt.fill();

      cvsgt2.beginPath();
      cvsgt2.fillStyle = 'rgba(255, 255, 255,.4)';
      cvsgt2.arc(imgbox2[i].x, imgbox2[i].y, .5, 0, Math.PI * 2, false);
      cvsgt2.fill();
    }
  }
  // 流れ星線作成
  function Starline() {
    // 流れ星
    // ここでスペックによって落ちるスピードが異なる
    if (fpsboolean) {
      x -= 10;
      y += 10;
    } else {
      x -= 15;
      y += 15;
    }
    window.requestAnimationFrame(Starline);
    cvsgt3.clearRect(0, 0, windowsizewidth, windowsizeheight);
    cvsgt3.beginPath();
    cvsgt3.fillStyle = 'rgba(255, 255, 255,1)';
    cvsgt3.arc(x + 400, y, 2, 0, Math.PI * 1.5, false);
    cvsgt3.fill();

    // 流れ星線
    cvsgt3.lineWidth = 1;
    // ここで線を書く
    cvsgt3.beginPath();
    // グラデーション設定
    var grad = cvsgt3.createLinearGradient(0, 0, 0, windowsizeheight / 4);
    // 1:終点 0.5:中間 0:始点
    grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
    grad.addColorStop(0.5, 'rgba(255, 255, 255, .6)');
    grad.addColorStop(1, 'rgba(255, 255, 255, .6)');
    cvsgt3.strokeStyle = grad;
    cvsgt3.moveTo(x + 400, y);
    cvsgt3.lineTo(x + 800, y - 400);
    cvsgt3.stroke();

    // 星位置判定
    if (y > windowsizeheight / 2.5) {
      cvsgt3.globalAlpha -= 0.1;
    } else {
      cvsgt3.globalAlpha = 1;
    }
    if (y > windowsizeheight + 10) {
      x = Math.random() * windowsizewidth;
      y = 0;
    }

  }

  function setting() {
    setImagas();
    setTimeout(imagesin, 10);
    Starline();
  }
  setting();
}
Shootingstar();