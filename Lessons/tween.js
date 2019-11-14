function init() {
    console.info("initialized"); //console.log,info,error,warn,debug

    var canvas = document.getElementById("game");

    // Stage - это контейнер для всех DisplayObject
    var stage = new createjs.Stage(canvas);

    //on = addEventListener + доп полезные аргументы
    var field = new createjs.Shape();
    field.graphics
        .beginFill("#D3D3D3")
        .rect(0,0,500,300);

    stage.addChild(field);

    var square = new createjs.Shape();
    square.graphics
        .beginFill('navy')
        .rect(0,0,30,30);
    stage.addChild(square);

    stage.on("click", function(e) {
        console.log('stage click', e.stageX, e.stageY); //getMouseX(e) , getMouseY(e));
        createjs.Tween.get(square, {}).to({x: e.stageX, y: e.stageY}, 1000)
    });

    function getMouseX(e) {
        return { stageX: e.stageX }
    }

    function getMouseY(e) {
        return { stageY: e.stageY }
    }

    createjs.Ticker.framerate = 60;
    createjs.Ticker.on("tick", tick);

    function tick() {
        //Это перерисовка
        stage.update();
    }

    //Функция get создает tween
    //указываем сначала у какого объекта будут изменяться параметры. Второй аргумент - объект с настройками.
    //Например, loop: true, т.е. анимация зациклится
    var moveTool = createjs.Tween.get(square, {})
    //Какие установить значения параметрам,
    //и сколько на это отведено времени
        .to({x: 400}, 2000)
        //что изменить после этого
        .to({y: 200}, 2000)
        .wait(500) //подождать 0.5c
        .to({x: 0, alpha: 0.5}, 2000, createjs.Ease.elasticInOut);



}