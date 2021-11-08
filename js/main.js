//canvasについての記述

let canvas_mouse_event = false; //スイッチ[ true=線を引く、false=線は引かない]
let oldX = 0; //一つ前の座標を代入するための変数
let oldY = 0; //一つ前の座標を代入するための変数
let bold_line = 5; //ラインの太さをここで指定
let color = "#000"; //ラインの太さをここで指定

const can = $('#canvas')[0]; //キャンバスそのものを変数
const ctx = can.getContext("2d"); //canに対してgetContext関数を実行し書き込み権限を与える

$(can).on("mousedown", function (e) {
  console.log('on');
  oldX = e.offsetX;
  oldY = e.offsetY;
  canvas_mouse_event = true;
});


$(can).on("mousemove", function (e) {

  if (canvas_mouse_event === true) {

    const px = e.offsetX;//時点の座標
    const py = e.offsetY; //時点の座標
    ctx.strokeStyle = color; //色
    ctx.lineWidth = bold_line; //大きさ
    ctx.lineJoin = "round";
    ctx.lineCap = "round";//ペン先を丸く
    ctx.beginPath();//パスの開始
    ctx.moveTo(oldX, oldY);
    ctx.lineTo(px, py);
    ctx.stroke();//出発地点から現時点の線を描写
    oldX = px; //出発地点の入れ替え
    oldY = py; //出発地点の入れ替え
  }
});

$(can).on("mouseup", function (e) {
  canvas_mouse_event = false;//ボタンを上げたら
});

$(can).mouseleave(function () {
  canvas_mouse_event = false;
});

$('#clear_btn').on("click", function () {
  ctx.closePath();
  ctx.clearRect(0, 0, can.width, can.height);//canvasをクリア
})


//パスの開始
ctx.beginPath();

//色変更
$('#color').on('change', function () {
  let sel_color = $('#color').val();
  console.log(sel_color);
  color = sel_color;
})

//ラインを変更
$('#line').on('change', function () {
  let line = $('#line').val();
  console.log(line);
  console.log('change');
  bold_line = line;
})

//画像を送信
$('#image_send').on('click', function () {
  console.log('click');
  const img_data = canvas.toDataURL("image/jpg");

  const data = {//データ送信用の変数
    name: "",
    text: "",
    img: img_data,//name欄に入力されたもの                
    time: serverTimestamp(),//現在時間
  };
  addDoc(collection(db, "chat"), data);//Firebaseのchatコレクションにデータを送る
  ctx.closePath();
  ctx.clearRect(0, 0, can.width, can.height);
});