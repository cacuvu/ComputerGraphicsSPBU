function init() {
    console.info("initialized"); //console.log,info,error,warn,debug

    var canvas = document.getElementById("game");
    var c = canvas.getContext("2d");

    /*или назвать ctx*/

    function getCurrentTime() {
        //колличество миллисекунд, которые прошли с
        //1 января 1970
        return new Date().getTime();
    }

    var lastFrameTime = getCurrentTime();

    /*drawings go here*/

    //Двигаем спрайт
    var x = 0;
    var y = 0;
    var SPEED = 40;

    //Загружаем картинку из HTML
    //var monsterImageFromHTML =
      // document.getElementById('sprite');

    //Загружаеи картинку из JS
    var monsterWalk = new Image();
    monsterWalk.src = "Dude_Monster_Walk_6.png";

    //Параметры нашего спрайтАтласа
    var SPRITE_W = 32;
    var SPRITE_H = 32;
    var SPRITE_IN_LINE = 6;
    //Левый верхний угол, откуда начинать вырезать
    var SPRITE_X0 = 0, SPRITE_Y0 = 0;
    var FPS = 10;

    var frameIndex = 0; // номер кадра, это парамтер который
    var animation_start_time = getCurrentTime() / 1000;

    //Функция рисования кадров
    function drawFrame() {
        c.clearRect(0, 0, canvas.width, canvas.height);

        c.drawImage(
            monsterWalk,
            //x, y откуда вырезать
            SPRITE_X0 + SPRITE_W * frameIndex, SPRITE_Y0,
            //размер вырезания
            SPRITE_W, SPRITE_H,
            //где рисуем
            x, y,
            //размер спрайта
            SPRITE_W, SPRITE_H
        )

        //Рисуем картинку из HTML --->
        //c.drawImage(monsterImageFromHTML, 0, 0, 32, 32, x, y, 32,32)
    }

    //изменить анимируемые параметры
    function animate(currentTime, elapsedTime) {
        //анимируем только координаты
        x += SPEED * elapsedTime;
        y += SPEED * elapsedTime;
        frameIndex = Math.floor(FPS * (currentTime - animation_start_time)) % SPRITE_IN_LINE;

    }

    //"Игровой Цикл"
    function loop() {
        var currentTime = getCurrentTime();
        animate(
            currentTime / 1000,
            (currentTime - lastFrameTime) / 1000
        );
        lastFrameTime = currentTime;

        drawFrame();
        requestAnimationFrame(loop);
        //var FPS = 30
        //setTime(loop, 1000 / FPS)
        // - если важно "точно" управлять FPS
    }

    requestAnimationFrame(loop);
    // loop(); setTimeout(loop, 1000 / FPS)
}