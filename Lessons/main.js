function init() {
  console.info("initialized"); //console.log,info,error,warn,debug

  var canvas = document.getElementById("game");
  var c = canvas.getContext("2d"); /*или назвать ctx*/
  
  /*drawings go here*/
  //Двигаем шарик
  var x = 0;
  var y = 0;

  //Функция рисования кадров
  function drawFrame() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.beginPath();
    c.arc(x, y, 25, 0, 2 * Math.PI);
    c.fillStyle = "red";
    c.strokeStyle = "green";
    c.fill();
    c.stroke();
  }

  //изменить анимируемые параметры
  function animate() {
    //анимируем только координаты
    x += 1;
    y += 0.575;
  }

  //"Игровой Цикл"
  function loop() {
    animate();
    drawFrame();
    requestAnimationFrame(loop);
    //var FPS = 30
    //setTime(loop, 1000 / FPS)
    // - если важно "точно" управлять FPS
  }

  requestAnimationFrame(loop);
  // loop(); setTimeout(loop, 1000 / FPS)
}