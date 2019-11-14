function init() {
    console.info("initialized"); //console.log,info,error,warn,debug

    var canvas = document.getElementById("game");

    // Stage - это контейнер для всех DisplayObject
    var stage = new createjs.Stage(canvas);

    var charSpeed = 8;
    var col = false;

    var shape = new createjs.Shape();
    shape.graphics
        .beginFill("#FFEBCD")
        .beginStroke("#8B4513")
        .rect(0, 0, 50,50)
        .endFill()
        .endStroke()
        .beginStroke( "#8B0000")
        .beginFill("#FF6347")
        .lineTo(0,0).lineTo(25,-25).lineTo(50,0).lineTo(0,0)
        .endFill()
        .endStroke()
        .beginStroke( "#808000")
        .beginFill("#BDB76B")
        .rect(17,25,16,25);

    shape.regX = 25;
    shape.regY = 25;
    shape.x = 300;
    shape.y = 135;

    stage.addChild(shape);

    //Character Sprite --->
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

    //DRAG AND DROP HOUSE
    shape.on("pressmove",function(evt) {
        evt.currentTarget.x = evt.stageX;
        evt.currentTarget.y = evt.stageY;
    });

    stage.update(); //это команда на рисование сцены!

    createjs.Ticker.framerate = 15; //FPS
    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    createjs.Ticker.on("tick", tick);

    var is_dead = false;

    //GAME LOOP
    function tick() {
        if (!is_dead) {
            //Это обновление данных
            var d = Math.sqrt((sprite.x - shape.x) * (sprite.x - shape.x) + (sprite.y - shape.y) * (sprite.y - shape.y));
            //console.log(d);
            sprite.x += (shape.x - sprite.x) / d * charSpeed;
            sprite.y += (shape.y - sprite.y) / d * charSpeed;

            //console.log(sprite.x);
            //console.log(shape.x);
            //console.log(Math.abs((sprite.x - shape.x)));
            if (Math.abs((sprite.x - shape.x)) <= 5 && Math.abs((sprite.y - shape.y)) <= 5) {
                //charSpeed = 0;
                is_dead = true;
                dieClick();
            }
        }

        //console.log(pixelData);

        //Это перерисовка
        stage.update();
    }

    //var pixelData = canvas.getContext('2d').getImageData(, sprite.y, 1, 1).data;


    //sprite.on("click", dieClick);

    function dieClick() {
        sprite.gotoAndPlay("die");
        console.log("die_anim");

        sprite.on("animationend", function () {
            console.log("die finished");
            stage.removeChild(sprite);
        })
    }




}