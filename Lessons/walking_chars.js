function init() {
    console.info("initialized"); //console.log,info,error,warn,debug

    var canvas = document.getElementById("game");
    var c = canvas.getContext("2d"); /*или назвать ctx*/

    function getCurrentTime() {
        //колличество миллисекунд, которые прошли с
        //1 января 1970
        return new Date().getTime();
    }

    var lastFrameTime = getCurrentTime();

    //Двигаем шарик
    var X0 = 50;
    var Y0 = 50;
    var H = 200;
    var W = 400;

    var R = 8;
    var x = 0;
    var y = 0;
    var SPEED = 40;

    var monsterWalk = new Image();
    monsterWalk.src = "Dude_Monster_Walk_6.png";

    //Параметры нашего спрайтАтласа
    var SPRITE_W = 32;
    var SPRITE_H = 32;
    var SPRITE_IN_LINE = 6;
    //Левый верхний угол, откуда начинать вырезать
    var SPRITE_X0 = 0, SPRITE_Y0 = 0;
    var FPS = 10;

    //var frameIndex = 0; // номер кадра, это парамтер который
    var animation_start_time = getCurrentTime() / 1000;

    canvas.addEventListener("click", canvasClicked);

    chars = [
        { x:80, y:80, rad:R, vx:60, vy:60, frameIndex: 0},
        { x:130, y:95, rad:R, vx:80, vy:70, frameIndex: 0},
        { x:180, y:90, rad:R, vx:60, vy:80, frameIndex: 0},
        { x:90, y:220, rad:R, vx:90, vy:80, frameIndex: 0}
    ];


    //Функция рисования кадров
    function drawFrame() {

        c.clearRect(0, 0, canvas.width, canvas.height);
        for (var char  of chars) {

            c.drawImage(
                monsterWalk,
                //x, y откуда вырезать
                SPRITE_X0 + SPRITE_W * char.frameIndex, SPRITE_Y0,
                //размер вырезания
                SPRITE_W, SPRITE_H,
                //где рисуем
                char.x - SPRITE_W/2 , char.y - SPRITE_H/2,
                //размер спрайта
                SPRITE_W, SPRITE_W
            );

        }

        //TABLE
        c.beginPath();
        c.strokeRect(X0, Y0, W ,H);
        c.strokeStyle = "black";
        c.stroke();
    }

    //сколько прошло времени с предыдущего кадра
    function animate(currentTime, elapsedTime) {

        //анимируем только координаты
        for (var char of chars) {
            char.x += char.vx * elapsedTime;
            char.y += char.vy * elapsedTime;

            if (char.y + char.rad > H + Y0) {
                let delta = char.y + char.rad - H - Y0;
                char.y = char.y - delta * 2;
                char.vy = -char.vy;
            }

            if (char.y - char.rad < Y0) {
                let delta = Y0 - char.y + char.rad;
                char.y = char.y + delta * 2;
                char.vy = -char.vy;
            }

            if (char.x + char.rad > W + X0) {
                let delta = char.x + char.rad - W - X0;
                char.x = char.x - delta * 2;
                char.vx = -char.vx;
            }

            if (char.x - char.rad < X0) {
                let delta = X0 - char.x + char.rad;
                char.x = char.x + delta * 2;
                char.vx = -char.vx;
            }
            
            char.frameIndex = Math.floor(FPS * (currentTime - animation_start_time)) % SPRITE_IN_LINE;
        }

    }

    //"Игровой Цикл"
    function loop() {
        //время
        var currentTime = getCurrentTime();
        animate(
            currentTime / 1000,
            (currentTime - lastFrameTime) / 1000
        );
        lastFrameTime = currentTime;
        drawFrame();
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
    // loop(); setTimeout(loop, 1000 / FPS)

    function canvasClicked(e) {
        //console.info("click", e);

        var rect = canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        // клик в (x, y)
        //console.info("click at", x, y);

        function findCharByCords(x, y) {
            for (var i = 0; i < chars.length; i++)
                if (Math.abs((x - chars[i].x)) <= chars[i].rad + 5 && Math.abs(y - chars[i].y) <= chars[i].rad + 5)
                    return i;
            return -1;
        }

        var ind = findCharByCords(x, y);
        if (ind !== -1)
            chars.splice(ind, 1);
        else if (x > X0 && x < W + X0 && y > Y0 && y < H + Y0)
            chars.push({x: x, y: y, rad: R, vx: 90, vy: 80, frameIndex: 0});


        /*var isCharacter = false;

        for (i = 0; i < chars.length; i++) {
            if (Math.abs((x - chars[i].x)) <= chars[i].rad + 5 && Math.abs(y - chars[i].y) <= chars[i].rad + 5) {
                chars.splice(i, 1);
                isCharacter = true;
                console.info(isCharacter);
                //console.info(i);
                //console.info(chars);
                break;
            }
        }

        if((x > X0 && x < W + X0) && (y > Y0 && y < H + Y0) && !isCharacter)
            chars.push( {x:x, y:y, rad:R, vx:90, vy:80, frameIndex: 0})*/
    }
}