function init() {
    console.info("initialized"); //console.log,info,error,warn,debug

    var canvas = document.getElementById("game");
    var stage = new createjs.Stage(canvas);

    //KEYBOARD KEYS
    var keys = {};

    //WORLD FRAMES
    var worldFrames = new createjs.SpriteSheet({
        images: ["testWorld.png"],
        frames: {
            width: 500,
            height: 300,
            count: 9,
            regX: 0,
            regY: 0
        },
        animations: { //world frames
            f00: 0,
            f01: 1,
            f02: 2,
            f10: 3,
            f11: 4,
            f12: 5,
            f20: 6,
            f21: 7,
            f22: 8
        }
    });

    /*var worldArr = [
        [0,1,2],
        [3,4,5],
        [6,7,8]
    ];*/

    var currentFrameCords = {i : 0, j: 0};

    function setCurrentFrame(i, j) {
        currentFrameCords = {i: i, j: j};

        return currentWorldFrame.gotoAndPlay("f" + i + j);

    }

    //CURRENT WORLD FRAME
    var currentWorldFrame = new createjs.Sprite(worldFrames);
    stage.addChild(currentWorldFrame);

    //CHARACTER
    var charSpeed = 4;

    var testChar = new createjs.Shape();
    testChar.graphics
        .beginFill("green")
        .rect(0, 0, 20, 20);

    testChar.regX = 10;
    testChar.regY = 10;
    testChar.x = 250;
    testChar.y = 150;

    stage.addChild(testChar);

    stage.update();

    //TICKER
    createjs.Ticker.framerate = 60; //FPS
    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    createjs.Ticker.on("tick", tick);

    //KEYBOARD INPUT
    this.document.onkeydown = keydown;
    this.document.onkeyup = keyup;

    //STARTING WORLD FRAME
    var frameCounterX = 0;
    var frameCounterY = 0;
    setCurrentFrame(frameCounterY, frameCounterX);
    console.log(currentFrameCords);

    //TEST
    var ctx = canvas.getContext('2d');
    //var pixelData = ctx.getImageData(testChar.x + 12, testChar.y, 1, 1).data;

    //GAME LOOP
    function tick() {

        /*var pixelDataRight = ctx.getImageData(testChar.x + 11, testChar.y - 11, 1,20).data;
        var pixelDataLeft = ctx.getImageData(testChar.x - 11, testChar.y - 11,1, 20).data;
        var pixelDataTop = ctx.getImageData(testChar.x - 11, testChar.y + 11, 20, 1).data;
        var pixelDataBottom = ctx.getImageData(testChar.x - 11, testChar.y - 11, 20, 1).data;*/

        //MOVING ---->
        /*if (keys[37] && (pixelDataLeft[1] === 255 && pixelDataLeft[77] === 255 || pixelDataLeft[1] === 0 && pixelDataLeft[77] === 0)) testChar.x -= charSpeed;
        if (keys[38] && (pixelDataBottom[1] === 255 && pixelDataBottom[77] === 255 || pixelDataBottom[1] === 0 || pixelDataBottom[77] === 0)) testChar.y -= charSpeed;
        if (keys[39] && (pixelDataRight[1] === 255 && pixelDataRight[77] === 255 || pixelDataRight[1] === 0 && pixelDataRight[77] === 0)) testChar.x += charSpeed;
        if (keys[40] && (pixelDataTop[1] === 255 && pixelDataTop[77] === 255 || pixelDataTop[1] === 0 && pixelDataTop[77] === 0)) testChar.y += charSpeed;*/

        if (keys[37]) {
            var pixelDataLeft = ctx.getImageData(testChar.x - 15, testChar.y,1, 1).data;
            console.log(pixelDataLeft);
            if ((pixelDataLeft[1] === 255 || pixelDataLeft[1] === 0))
                testChar.x -= charSpeed;
        }
        if (keys[38] ) {
            var pixelDataBottom = ctx.getImageData(testChar.x, testChar.y - 15, 1, 1).data;
            console.log(pixelDataBottom);
            if (pixelDataBottom[1] === 255 || pixelDataBottom[1] === 0)
                testChar.y -= charSpeed;
        }
        if (keys[39]) {
            var pixelDataRight = ctx.getImageData(testChar.x + 15, testChar.y, 1,1).data;
            console.log(pixelDataRight);
            if (pixelDataRight[1] === 255 || pixelDataRight[1] === 0)
                testChar.x += charSpeed;
        }
        if (keys[40]) {
            var pixelDataTop = ctx.getImageData(testChar.x, testChar.y + 13, 1, 1).data;
            console.log(pixelDataTop);
            if (pixelDataTop[1] === 255 || pixelDataTop[1] === 0)
                testChar.y += charSpeed;
        }




        //WORLD BORDERS
        if (frameCounterY === 0 && testChar.y - 10 < 0)
            testChar.y = 10;
        if (frameCounterY === 2 && testChar.y + 10 > 300)
            testChar.y = 290;
        if (frameCounterX === 0 && testChar.x - 10 < 0)
            testChar.x = 10;
        if (frameCounterX === 2 && testChar.x + 10 > 500)
            testChar.x = 490;
        //<----- MOVING

        //SWITCH FRAME
        if (testChar.x > 500 && frameCounterX !== 2) {
            frameCounterX++;
            setCurrentFrame(frameCounterY, frameCounterX);
            console.log(currentFrameCords);
            testChar.x = 1;
        }
        if (testChar.x < 0 && frameCounterX !== 0) {
            frameCounterX--;
            setCurrentFrame(frameCounterY, frameCounterX);
            console.log(currentFrameCords);
            testChar.x = 499;
        }
        if (testChar.y > 300 && frameCounterY !== 2) {
            frameCounterY++;
            setCurrentFrame(frameCounterY, frameCounterX);
            console.log(currentFrameCords);
            testChar.y = 1;
        }
        if (testChar.y < 0 && frameCounterY !== 0) {
            frameCounterY--;
            setCurrentFrame(frameCounterY, frameCounterX);
            console.log(currentFrameCords);
            testChar.y = 299;
        }


        stage.update();
    }

    //KEYBOARD INPUT EVENTS ----->
    function keydown(event) {
        keys[event.keyCode] = true;
    }

    function keyup(event) {
        delete keys[event.keyCode];
    }
    //<----- KEYBOARD INPUT EVENTS
}