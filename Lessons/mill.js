function init() {
    console.info("initialized"); //console.log,info,error,warn,debug

    var canvas = document.getElementById("game");
    var c = canvas.getContext("2d"); /*или назвать ctx*/

    /*drawings go here*/

    //CONSTANTS
    var rotAngle = 1;
    var rotSpeed = 0.020;

    var bladesCount = 5;
    var bladesHeight = 120;
    var bladesWidth = 30;

    var smallBladesCount = 3;
    var smallBladeHeight = 30;
    var smallBladeWidth = 10;

    var ropeHeight = 80;
    var ropeWidth = 4;



    function drawBlade(i) {
        c.save();
        c.strokeRect(0,0, bladesWidth, bladesHeight);

        //TODO prepare cord system
        c.translate(bladesWidth / 2, bladesHeight);
        //drawCords();

        //TODO call drawRope()
        c.rotate(-rotAngle + -i/bladesCount * 2 * Math.PI);
        drawRope();
        c.restore();
    }

    function drawSmallBlade() {
        c.save();
        for (var i = 1; i <= smallBladesCount; i++) {
            c.rotate(2 * Math.PI / smallBladesCount);
            c.strokeRect(0,0,smallBladeWidth, smallBladeHeight);
            //drawCords();
        }
        c.restore();
    }

    function drawRope() {
        c.save();
        c.strokeRect(0,0, ropeWidth, ropeHeight);

        c.translate(ropeWidth / 2, ropeHeight);
        c.rotate(-rotAngle);
        drawSmallBlade();
        //drawCords();
        c.restore();
    }


    //Функция рисования кадров
    function drawFrame() {
        c.save();

        c.clearRect(0, 0, canvas.width, canvas.height);
        c.translate(canvas.width / 2, canvas.height / 2);
        c.rotate(rotAngle);

        //TODO in loop
        for (var i = 1; i <= bladesCount; i++) {
            c.rotate(2 * Math.PI / bladesCount);
            drawBlade(i);
        }

        //drawCords();

        c.restore();
    }

    //РИСУЕМ КООРДИНАТЫ
    function drawCords() {
        c.save();

        //x axis
        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(20, 0);
        c.strokeStyle = 'blue';
        c.stroke();

        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(0, 20);
        c.strokeStyle = 'red';
        c.stroke();

        c.restore();
    }


    function animate() {
        rotAngle += rotSpeed;
    }

    //"Игровой Цикл"
    function loop() {
        animate();
        drawFrame();
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
}