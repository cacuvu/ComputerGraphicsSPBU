function init() {
    console.info("initialized"); //console.log,info,error,warn,debug

    var canvas = document.getElementById("game");
    var stage = new createjs.Stage(canvas);
    //CANVAS
    var ctx = canvas.getContext('2d');

    //KEYBOARD KEYS
    var keys = {};

    //WORLD FRAMES
    var worldFrames = new createjs.SpriteSheet({
        images: ["Sprites/World_Final.png"],
        frames: {
            width: 1000,
            height: 600,
            count: 25,
            regX: 0,
            regY: 0
        },
        animations: { //world frames
            f00: 0,  f01: 1,  f02: 2,  f03: 3,  f04: 4,
            f10: 5,  f11: 6,  f12: 7,  f13: 8,  f14: 9,
            f20: 10, f21: 11, f22: 12, f23: 13, f24: 14,
            f30: 15, f31: 16, f32: 17, f33: 18, f34: 19,
            f40: 20, f41: 21, f42: 22, f43: 23, f44: 24

        }
    });

    var test;

    //SET CURRENT FRAME
    var currentFrameCords = {i : 0, j: 0};
    function setCurrentFrame(i, j) {
        currentFrameCords = {i: i, j: j};
        return currentWorldFrame.gotoAndPlay("f" + i + j);
    }

    //CURRENT WORLD FRAME
    var currentWorldFrame = new createjs.Sprite(worldFrames);
    stage.addChild(currentWorldFrame);

    //CHARACTER
    var charAnims = new createjs.SpriteSheet({
      images: ["Sprites/Character_anim.png"],
      frames: {
          width: 64,
          height: 64,
          count: 16,
          regX: 32,
          regY: 64
      },
        animations: {
            idle: 0,
            runBottom: [0, 3, "runBottom", 1/6],
            runTop: [12, 15, "runTop", 1/6],
            runLeft: [4, 7, "runLeft", 1/6],
            runRight: [8, 11, "runRight", 1/6]
        }
    });
    var charSpeed = 4;
    var char = new createjs.Sprite(charAnims);
    char.x = 180;
    char.y = 220;
    char.gotoAndPlay("runLeft");
    stage.addChild(char);

    //DOORS
    var door_1 = new createjs.Bitmap("Sprites/Door_1.png");
    var door_2 = new createjs.Bitmap("Sprites/Door_2.png");
    var door_3 = new createjs.Bitmap("Sprites/Door_3.png");
    var door_4 = new createjs.Bitmap("Sprites/Door_4.png");

    //KEY_1
    var key_1 = new createjs.SpriteSheet({
        images: ["Sprites/1_key_anim.png"],
        frames: {
            width: 48,
            height: 48,
            count: 4
        },
        animations: {
            key_1: [0,3, "key_1", 1/8]
        }
    });
    var key_1Sp = new createjs.Sprite(key_1);
    key_1Sp.gotoAndPlay("key_1");

    //KEY_2
    var key_2 = new createjs.SpriteSheet({
        images: ["Sprites/2_key_anim.png"],
        frames: {
            width: 48,
            height: 48,
            count: 4
        },
        animations: {
            key_2: [0,3, "key_2", 1/8]
        }
    });
    var key_2Sp = new createjs.Sprite(key_2);
    key_2Sp.gotoAndPlay("key_2");

    var key_3 = new createjs.SpriteSheet({
        images: ["Sprites/3_key_anim.png"],
        frames: {
            width: 48,
            height: 48,
            count: 4
        },
        animations: {
            key_3: [0,3, "key_3", 1/8]
        }
    });
    var key_3Sp = new createjs.Sprite(key_3);
    key_3Sp.gotoAndPlay("key_3");

    var key_4 = new createjs.SpriteSheet({
        images: ["Sprites/4_key_anim.png"],
        frames: {
            width: 48,
            height: 48,
            count: 4
        },
        animations: {
            key_4: [0,3, "key_4", 1/8]
        }
    });
    var key_4Sp = new createjs.Sprite(key_4);
    key_4Sp.gotoAndPlay("key_4");

    stage.update();

    //TICKER
    createjs.Ticker.framerate = 60; //FPS
    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    createjs.Ticker.on("tick", tick);

    var game_objects = [
        {
            type: "door",
            frameX: 2,
            frameY: 0,
            posX: 593,
            posY: 310,
            bitmap: door_1
        },
        {
            type: "door",
            frameX: 0,
            frameY: 3,
            posX: 64,
            posY: 300,
            bitmap: door_2
        },
        {
            type: "door",
            frameX: 4,
            frameY: 0,
            posX: 355,
            posY: 218,
            bitmap: door_3
        },
        {
            type: "door",
            frameX: 4,
            frameY: 4,
            posX: 590,
            posY: 57,
            bitmap: door_4
        },
        {
            type: "key",
            frameX: 0,
            frameY: 2,
            posX: 100,
            posY: 80,
            bitmap: key_1Sp
        },
        {
            type: "key",
            frameX: 2,
            frameY: 2,
            posX: 360,
            posY: 500,
            bitmap: key_2Sp
        },
        {
            type: "key",
            frameX: 3,
            frameY: 4,
            posX: 810,
            posY: 440,
            bitmap: key_3Sp
        },
        {
            type: "key",
            frameX: 4,
            frameY: 2,
            posX: 460,
            posY: 140,
            bitmap: key_4Sp
        }
    ];

    //KEYBOARD INPUT
    this.document.onkeydown = keydown;
    this.document.onkeyup = keyup;

    //STARTING WORLD FRAME
    var frameCounterX = 0;
    var frameCounterY = 0;
    setCurrentFrame(frameCounterY, frameCounterX);
    console.log(currentFrameCords);

    function checkWorldNoCollision(x0, y0) {
        var col = ctx.getImageData(x0, y0, 1, 1).data;
        return col[0] === 61 || col[0] === 54 || col[0] === 0;
    }

    //SET ITEM
    function setItemInCurrentFrame(posX, posY, item) {
        item.x = posX;
        item.y = posY;
        return stage.addChildAt(item, 1);
    }

    //DELETE ITEM
    function deleteItemFromCurrentFrame(item) {
        return stage.removeChild(item)
    }

    //CHECK ITEM COLLISION
    function checkItemCollision(charX, itemX, charY, itemY) {
        return charY > itemY && charY < itemY + 60 && charX > itemX - 30 && charX < itemX + 80
    }

    function checkDoorCollision(charX, itemX, charY, itemY) {
        return charX > itemX && charX < itemX + 128 && charY < itemY + 95
    }

    //KEY INVENTORY
    var silverKey = false;
    var greenKey = false;
    var goldKey = false;
    var redKey = false;

    //DELETE DOORS
    var greenDoor = false;
    var silverDoor = false;
    var redDoor = false;
    var goldDoor = false;


    var currentCharAnim = "";
    function setCharAnimation(anim) {
        if (anim === currentCharAnim)
            return;
        currentCharAnim = anim;
        char.gotoAndPlay(anim);
    }

    //GAME LOOP
    function tick() {

        //PLACING GAME_OBJECTS IN RIGHT FRAME ---->
        for (let object of game_objects) {
            if (object.frameX === currentFrameCords.j && object.frameY === currentFrameCords.i && object.type === "door")
                setItemInCurrentFrame(object.posX, object.posY, object.bitmap);
            else if (object.frameX === currentFrameCords.j && object.frameY === currentFrameCords.i && object.type === "key")
                setItemInCurrentFrame(object.posX, object.posY, object.bitmap);
            else
                deleteItemFromCurrentFrame(object.bitmap)
        }

        //ADD KEY TO INVENTORY AND OPEN DOORS
        for (let object of game_objects) {
            if (object.frameX === currentFrameCords.j && object.frameY === currentFrameCords.i && object.type === "key") {
                if (checkItemCollision(char.x, object.posX, char.y, object.posY)) {
                    if (object.bitmap === key_1Sp)
                        silverKey = true;
                    if (object.bitmap === key_2Sp)
                        greenKey = true;
                    if (object.bitmap === key_3Sp)
                        redKey = true;
                    if (object.bitmap === key_4Sp)
                        goldKey = true;
                }
                if (silverKey && object.bitmap === key_1Sp)
                    deleteItemFromCurrentFrame(object.bitmap);
                if (greenKey && object.bitmap === key_2Sp)
                    deleteItemFromCurrentFrame(object.bitmap);
                if (redKey && object.bitmap === key_3Sp)
                    deleteItemFromCurrentFrame(object.bitmap);
                if (goldKey && object.bitmap === key_4Sp)
                    deleteItemFromCurrentFrame(object.bitmap);
            }
            if (object.frameX === currentFrameCords.j && object.frameY === currentFrameCords.i && object.type === "door") {
                if (checkDoorCollision(char.x, object.posX, char.y, object.posY)) {
                    if (object.bitmap === door_1 && silverKey)
                        silverDoor = true;
                    if (object.bitmap === door_2 && greenKey)
                        greenDoor = true;
                    if (object.bitmap === door_3 && redKey)
                        redDoor = true;
                    if (object.bitmap === door_4 && goldKey)
                        goldDoor = true;
                }
                if (silverDoor && object.bitmap === door_1)
                    deleteItemFromCurrentFrame(object.bitmap);
                if (greenDoor && object.bitmap === door_2)
                    deleteItemFromCurrentFrame(object.bitmap);
                if (redDoor && object.bitmap === door_3)
                    deleteItemFromCurrentFrame(object.bitmap);
                if (goldDoor && object.bitmap === door_4)
                    deleteItemFromCurrentFrame(object.bitmap);
            }
        }

        var nextAnimation = "idle";
        //MOVING ---->
        if (keys[37]) {
            if (checkWorldNoCollision(char.x - 23, char.y - 5) && checkWorldNoCollision(char.x - 23, char.y - 15)) {
                char.x -= charSpeed;
                nextAnimation = "runLeft";
            }
        }
        if (keys[38]) {
            if (checkWorldNoCollision(char.x - 18, char.y - 25) && checkWorldNoCollision(char.x + 18, char.y - 25)) {
                char.y -= charSpeed;
                nextAnimation = "runTop";
            }
        }
        if (keys[39]) {
            if (checkWorldNoCollision(char.x + 23, char.y - 5) && checkWorldNoCollision(char.x + 23, char.y - 15)) {
                char.x += charSpeed;
                nextAnimation = "runRight"
            }
        }
        if (keys[40]) {
            if (checkWorldNoCollision(char.x - 15, char.y) && checkWorldNoCollision(char.x + 15, char.y)) {
                char.y += charSpeed;
                nextAnimation = "runBottom"
            }
        }
        setCharAnimation(nextAnimation);
        //<----- MOVING

        //SWITCH FRAME
        if (char.x > 1000 && frameCounterX !== 4) {
            frameCounterX++;
            setCurrentFrame(frameCounterY, frameCounterX);
            console.log(currentFrameCords);
            char.x = 1;
        }
        if (char.x < 0 && frameCounterX !== 0) {
            frameCounterX--;
            setCurrentFrame(frameCounterY, frameCounterX);
            console.log(currentFrameCords);
            char.x = 999;
        }
        if (char.y > 600 && frameCounterY !== 4) {
            frameCounterY++;
            setCurrentFrame(frameCounterY, frameCounterX);
            console.log(currentFrameCords);
            char.y = 1;
        }
        if (char.y < 0 && frameCounterY !== 0) {
            frameCounterY--;
            setCurrentFrame(frameCounterY, frameCounterX);
            console.log(currentFrameCords);
            char.y = 599;
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

//WORLD BORDERS
/*if (frameCounterY === 0 && char.y - 10 < 0)
    char.y = 10;
if (frameCounterY === 4 && char.y + 10 > 600)
    char.y = 590;
if (frameCounterX === 0 && char.x - 10 < 0)
    char.x = 10;
if (frameCounterX === 4 && char.x + 10 > 1000)
    char.x = 990;*/