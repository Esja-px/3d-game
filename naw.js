    var menu1 = document.getElementById("menu1");
    var menu2 = document.getElementById("menu2");
    var menu3 = document.getElementById("menu3");
    var button1 = document.getElementById("button1");
    var button2 = document.getElementById("button2");
    var button3 = document.getElementById("button3");
    var button4 = document.getElementById("button4");
    var button5 = document.getElementById("button5");
    var menu4 = document.getElementById("menu4");
    var button6 = document.getElementById("button6");

var hasKey = false;
var win = false;
    var clickSound= new Audio;
    var clickSound1= new Audio;

    clickSound.src="so/click.wav";
    clickSound1.src="so/coin.wav";

    button2.onclick=function(){
        clickSound.play();
        menu1.style.display="none";
        menu2.style.display="block";
    };

    button3.onclick=function(){
        clickSound.play();
        menu2.style.display="none";
        menu1.style.display="block";
    };

    button4.onclick=function(){
        clickSound.play();
        menu1.style.display="none";
        menu3.style.display="block";
    };

    button5.onclick=function(){
        clickSound.play();
        menu1.style.display="block";
        menu3.style.display="none";
    };
    
    button1.onclick=function(){
        clickSound.play();
        menu1.style.display="none";
        CreateNewWorld();
        CreateSquares(coins,"coin");
        CreateSquares(key,"key");
        TimerGame = setInterval(repeatForewer,10);
        canlock= true;
    };
    button6.onclick = function(){
    clickSound.play();

    menu4.style.display = "none";
    menu1.style.display = "block";

    // сброс состояния
    hasKey = false;
    win = false;

    world.innerHTML = "";
};


    function iteration(squares, string){
    for(let i=0; i < squares.length; i++){
        let r =
            (squares[i][0] - pawn.x) ** 2 +
            (squares[i][1] - pawn.y) ** 2 +
            (squares[i][2] - pawn.z) ** 2;

        let r1 = squares[i][6] ** 2;

        if (r < r1){
            clickSound1.play();
            document.getElementById(string + i).style.display = "none";

            squares[i][0] = 100000;
            squares[i][1] = 100000;
            squares[i][2] = 100000;

            if (string === "key") {
                hasKey = true;
            }
        }
    }
}
function checkDoorWin(){
    if (!hasKey || win) return;

    // координаты главной двери (первая door в map)
    let doorX = 0;
    let doorY = 0;
    let doorZ = -1100;

    let dist =
        (doorX - pawn.x) ** 2 +
        (doorY - pawn.y) ** 2 +
        (doorZ - pawn.z) ** 2;

    if (dist < 200 * 200) {
        win = true;
        clearInterval(TimerGame);
        document.exitPointerLock();

        menu4.style.display = "block";
    }
}


    function repeatForewer(){
    update();
    iteration(coins,"coin");
    iteration(key,"key");
    checkDoorWin();
}
