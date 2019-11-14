function init() {
    console.info("initialized"); //console.log,info,error,warn,debug

    var canvas = document.getElementById("game");
    var c = canvas.getContext("2d"); /*или назвать ctx*/

    function getCurrentTime() {
        //количество миллесекунд, которые просшли с какой точки отсчета
        return new Date().getTime();
    }

    var lastFrameTime = getCurrentTime();

    //Двигаем шарик
    var X0 = 50;
    var Y0 = 50;
    var H = 250;
    var W = 450;

    balls = [
        b1 = { x:60, y:60, rad:25, vx:180, vy:120, color:"green"},
        b2 = { x:130, y:55, rad:25, vx:60, vy:80, color:"red"},
        b3 = { x:180, y:90, rad:25, vx:120, vy:80, color:"yellow"},
        b3 = { x:90, y:220, rad:25, vx:160, vy:120, color:"blue"}
    ];


    //Функция рисования кадров
    function drawFrame() {

        //CIRCLE
        c.clearRect(0, 0, canvas.width, canvas.height);
        for (var b of balls) {
            c.beginPath();
            c.arc(b.x, b.y, b.rad, 0, 2 * Math.PI);
            c.fillStyle = b.color;
            c.fill();
            c.stroke();
        }

        //TABLE
        c.beginPath();
        c.strokeRect(25, 25, 450 ,250);
        c.strokeStyle = "black";
        c.stroke();
    }

    //сколько прошло времени с предыдущего кадра
    function animate(elapsedTime) {
        //анимируем только координаты
        for (var b of balls) {
            b.x += b.vx * elapsedTime;
            b.y += b.vy * elapsedTime;

            if (b.y + b.rad > H + b.rad)
                b.vy = -b.vy;

            if (b.y + b.rad < Y0 + b.rad)
                b.vy = -b.vy;

            if(b.x + b.rad > W + b.rad)
                b.vx = -b.vx;

            if(b.x + b.rad < X0 + b.rad)
                b.vx = -b.vx;
        }

    }

    //"Игровой Цикл"
    function loop() {
        //время
        var currentTime = getCurrentTime();
        animate((currentTime - lastFrameTime) / 1000);
        lastFrameTime = currentTime;

        drawFrame();
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
    // loop(); setTimeout(loop, 1000 / FPS)
}