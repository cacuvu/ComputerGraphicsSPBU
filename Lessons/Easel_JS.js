function init() {
    console.info("initialized"); //console.log,info,error,warn,debug

    var canvas = document.getElementById("game");

    // Stage - это контейнер для всех DisplayObject
    var stage = new createjs.Stage(canvas);

    //Сначало добавим на сцену Shape
    /*var shape = new createjs.Shape();
    //Нарисуем на нем квадратик
    //graphics - это аналог контекста, рисовать надо на нем
    shape.graphics
        .beginFill("green")
        .rect(0, 0, 20,20);

    shape.regX = 10;
    shape.regY = 10;
    shape.x = 100;
    shape.y = 100;
    shape.rotation = 90;

    //добавить shape на сцену
    stage.addChild(shape);*/

    //добавим спрайт на сцену
    //SpriteSheet - рисунок с кадрами
    var ss = new createjs.SpriteSheet ( {
        images: ["Character1.png"],
        frames: {
            width: 32,
            height: 32,
            count: 12,
            regX: 16,
            regY: 16
        },
        animations: { //список анимаций
            //названия придумываем сами
            one: 0, //один кадр номер 0
            run: [0, 5, "run"], //с 0 по 6, а потом опять run
            die: [6, 11]
        }
    });

    var sprite = new createjs.Sprite(ss);
    sprite.x = 50;
    sprite.y = 150;
    sprite.gotoAndPlay("run");
    stage.addChild(sprite);

    stage.update(); //это команда на рисование сцены!

    //либо давайте запустим таймер, который будет постоянно перерисовывать сцену
    createjs.Ticker.framerate = 60; //FPS
    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    //createjs.Ticker.timingMode = createjs.Ticker.RAF;
    //createjs.Ticker.timingMode = createjs.Ticker.TIMEOUT;

    //метод on = addEventListener
    //добавить слушателя, что делать когда сработал таймер.
    //Особый случай, если сцена указана как слушатель, тогда каждый
    //раз вызывается stage.update()
    createjs.Ticker.on("tick", tick);

    //GAME LOOP
    function tick() {
        //Теперь это тело игровоко цикла

        //Это обновление данных
        sprite.x += 2;
        if (sprite.x > 450)
            sprite.x = 50;

        //Это перерисовка
        stage.update();
    }

    sprite.on("click", dieClick);

    function dieClick() {
        sprite.gotoAndPlay("die");
        console.log("die_anim");
        sprite.on("animationend", function () {
            console.log("die finished");
            //уберем со сцены, объект больше
            //не будет рисоваться
            stage.removeChild(sprite);
            //sprite.gotoAndPlay("run");
        })
    }

    //Добавим на сцену контейнер с теугольником
    //и квадратом внутри

    var container = new createjs.Container();
    var triag = new createjs.Shape();
    var sq = new createjs.Shape();

    //Метод addChild аналогичен методу Stage.addChild,
    //потому что сцена - тоже контейнер.

    container.addChild(triag);
    container.addChild(sq);
    stage.addChild(container);

    stage.aaa = "stage";
    container.aaa = "container";
    sq.aaa = "sq";
    triag.aaa = "triag";

    triag.graphics
        .beginFill('green')
        .moveTo(0,0)
        .lineTo(40,0)
        .lineTo(20,20)
        .endFill();

    sq.graphics
        .beginFill('red')
        .rect(0,0,30,40);

    triag.x = 20;
    container.x = 100;
    container.y = 240;

    //on = addEventListener + доп полезные аргументы
    stage.on("click", function(e) {
        console.log('stage click', showEvent(e));
    });

    sq.on("click", function(e) {
        console.log('sq click', showEvent(e));
    });

    container.on("click", function(e) {
        console.log('container click', showEvent(e));
    });

    triag.on("click", function(e) {
        console.log('triag click', showEvent(e));
    });

    function showEvent(e) {
        return {
            localX: e.localX,
            localY: e.localY,
            stageX: e.stageX,
            stageY: e.stageY,
            currentTarget: e.currentTarget.aaa,
            target: e.target.aaa
        }
    }

    //click срабатывает при нажатии на "нарисованный" пиксель
    //События срабатывают в порядке "всплывания" к вершине списка отоброжения (к сцене, от потомка к предку)
    //Информация о событии е соддержит:
    // - координаты нажатия stageX, stageY на сцене
    // - координаты нажатия в системе координат
    // - -//- объекта localX, localY
    // - currentTarget - объект на котором произошло событие. target - всегда красный квадрат.
    // currentTarget - квадрат, контейнерь сцена.
    // Другие данные внутри e: Документация MouseEvent

    //продемонстрируем фазу захвата и то, что один ылушатель может висеть на разынх объектах
    function clickListener(e) {
        console.log("click", showEvent(e));
    }

    stage.addEventListener('click', clickListener, true);
    sq.addEventListener('click', clickListener, true);
    triag.addEventListener('click', clickListener, true);
    container.addEventListener('click', clickListener, true);

    //события о движении мыши не обходимо явно включить. Можно указать частоту проверки.
    stage.enableMouseOver();
    //два события "навели мышь"
    container.on("rollover", function() {
       console.log("container rollover");
    });

    container.on("mouseover", function() {
        console.log("container mouseover");
    });

    //два события  "убрали мышь"
    container.on("rollout", function() {
        console.log("container rollout");
    });

    container.on("mouseout", function() {
        console.log("container mouseout");
    });

    //события mouseover/mouseout всплывают из квадрата и треугольника, поэтому при переходк между квадратом
    // и треугольником мы получаем эти мобытия га контейнере. Хотя фактически мы из контейнера мышь не уводили.
    //они сработают только при реальном входе и выходе из контейнера.

    /* TweenJS
    Параматрическая анимация. Т.е. мы меняем параметры объектов например, их координаты, цвета, с течением времени
    по определенному закону
     */

    var square = new createjs.Shape();
    square.graphics
        .beginFill('navy')
        .rect(0,0,40,40);
    stage.addChild(square);

    //Функция get создает tween
    //указываем сначала у какого объекта будут изменяться параметры. Второй аргумент - объект с настройками.
    //Например, loop: true, т.е. анимация зациклится
    createjs.Tween.get(square, {})
        //Какие установить значения параметрам,
        //и сколько на это отведено времени
        .to({x: 400}, 2000)
        //что изменить после этого
        .to({y: 200}, 2000)
        .wait(500) //подождать 0.5c
        .to({x: 0, alpha: 0.5}, 2000, createjs.Ease.elasticInOut);



}