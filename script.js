var deg = Math.PI/180;

function player(x,y,z,rx,ry){
    this.x = x;
    this.y = y;
    this.z = z;
    this.rx = rx;
    this.ry = ry;
}

var map = [
    // 0  1  2   3  4  5  6    7    8         9
    [0, 0, -1000, 0, 0, 0, 2000, 200, "wall.jpg"],
    [0, 0,  1000, 0, 0, 0, 2000, 200, "#F0C0FF"],
    [1000, 0, 0, 0, 90, 0, 2000, 200, "#F0C0FF", 0.5],
    [-1000, 0, 0, 0, 90, 0, 2000, 200, "#F0C0FF", 0.5],
    [0, 100, 0, 90, 0, 0, 2000, 2000, "floor.jpg"],
    [0, 0, -1000, 0, 0, 0, 180, 180, "door.jpg"],  
   
    [-200, 0, -670, 0, 90, 0, 700, 200, "#F0C0FF"],
    [-280, 0, -670, 0, 90, 0, 700, 200, "#F0C0FF"],  

    [0, 0, -420, 0, 0, 0, 600, 200, "#F0C0FF"],
    [0, 0, -340, 0, 0, 0, 600, 200, "#F0C0FF"],
    [0, 0, -340, 0, 0, 0, 180, 180, "door.jpg"],

    [200, 0, 80, 0, 90, 0, 600, 200, "#F0C0FF"],
    [120, 0, 80, 0, 90, 0, 600, 200, "#F0C0FF"],

    [320, 0, -220, 0, 0, 0, 400, 200, "#F0C0FF"],
    [320, 0, -140, 0, 0, 0, 400, 200, "#F0C0FF"],

    [600, 0, 600, 0, 90, 0, 800, 200, "#F0C0FF"],
    [520, 0, 600, 0, 90, 0, 800, 200, "#F0C0FF"],

    //те слева

    [-600, 0, -600, 0, 0, 0, 400, 200, "#F0C0FF"],
    [-600, 0, -520, 0, 0, 0, 400, 200, "#F0C0FF"],

    [-800, 0, -200, 0, 0, 0, 400, 200, "wall.jpg"],
    [-800, 0, -120, 0, 0, 0, 400, 200, "wall.jpg"],

    [-600, 0, 200, 0, 0, 0, 400, 200, "#F0C0FF"],
    [-600, 0, 280, 0, 0, 0, 400, 200, "#F0C0FF"],

    [-650, 0, 400, 0, 0, 0, 800, 200, "#F0C0FF"],
    [-650, 0, 480, 0, 0, 0, 800, 200, "#F0C0FF"],

    [-500, 0, 600, 0, 0, 0, 600, 200, "#F0C0FF"],
    [-500, 0, 680, 0, 0, 0, 600, 200, "#F0C0FF"],

    [-400, 0, 120, 0, 90, 0, 1500, 200, "wall.jpg"],
    [-480, 0, 120, 0, 90, 0, 1500, 200, "wall.jpg"],


    [400, 0, -600, 0, 90, 0, 400, 200, "#F0C0FF"],
    [320, 0, -600, 0, 90, 0, 400, 200, "#F0C0FF"],

    [400, 0, 0, 0, 90, 0, 400, 200, "#F0C0FF"],
    [320, 0, 0, 0, 90, 0, 400, 200, "#F0C0FF"],

    [400, 0, 400, 0, 0, 0, 400, 200, "#F0C0FF"],
    [400, 0, 480, 0, 0, 0, 400, 200, "#F0C0FF"],

    [800, 0, -200, 0, 90, 0, 1200, 200, "wall.jpg"],
    [720, 0, -200, 0, 90, 0, 1200, 200, "wall.jpg"],
    [720, 0, -200, 0, 90, 0, 180, 180, "door.jpg"],

    [800, 0, -600, 0, 0, 0, 400, 200, "#F0C0FF"],
    [800, 0, -680, 0, 0, 0, 400, 200, "#F0C0FF"],

    [800, 0, 600, 0, 90, 0, 400, 200, "#F0C0FF"],
    [720, 0, 600, 0, 90, 0, 400, 200, "#F0C0FF"],
];
var coins= [
    [300, 30, -500, 0, 0, 0, 50, 50, "sms.png", 50],
    [-300, 30, 800, 0, 0, 0, 50, 50, "sms.png", 50],
    [-100, 30, -200, 0, 0, 0, 50, 50, "sms.png", 50],
]

var key=[
    [900, 30, 900, 0, 0, 0, 50,50, "#ff0000", 50],
]

var PressForward = 0;
var PressBack = 0;
var PressLeft = 0;
var PressRight = 0;
var PressUp = 0;
var mouseX = 0;
var mouseY = 0;
var lock = false;
var canlock = false;

var container = document.getElementById("container");

container.onclick = function(){
    if (canlock) container.requestPointerLock();
}

document.addEventListener("keydown", (event) => {
    if (event.key == "w" || event.key == "ArrowUp")       PressForward = 3;
    if (event.key == "s" || event.key == "ArrowDown")     PressBack = 1;
    if (event.key == "a" || event.key == "ArrowLeft")     PressLeft = 1;
    if (event.key == "d" || event.key == "ArrowRight")    PressRight = 1;
    if (event.key == " ")                                 PressUp = 1;
});

document.addEventListener("keyup", (event) => {
    if (event.key == "w" || event.key == "ArrowUp")       PressForward = 0;
    if (event.key == "s" || event.key == "ArrowDown")     PressBack = 0;
    if (event.key == "a" || event.key == "ArrowLeft")     PressLeft = 0;
    if (event.key == "d" || event.key == "ArrowRight")    PressRight = 0;
    if (event.key == " ")                                 PressUp = 0;
});

document.addEventListener("pointerlockchange", (event)=> {
    lock=!lock;
})

document.addEventListener("mousemove", (event) => {
     mouseX= event.movementX;
     mouseY= event.movementY;
});

var pawn = new player(0,0,0,0,0);
var world = document.getElementById("world");

function update(){
    //dx = PressRight - PressLeft;
    //dz = -(PressForward - PressBack);
    dx = Math.cos(pawn.ry * deg) * (PressRight - PressLeft) - Math.sin(pawn.ry * deg) * (PressForward - PressBack);
    dz = -Math.sin(pawn.ry * deg)* (PressRight - PressLeft) - Math.cos(pawn.ry * deg) * (PressForward - PressBack);
    dy = - PressUp;
    drx = mouseY/4;
    dry = - mouseX/4;
    mouseY = mouseX=0;
 
    pawn.x= pawn.x + dx;
    pawn.y= pawn.y + dy;
    pawn.z= pawn.z + dz;
    if (lock) { 
    pawn.rx= pawn.rx+drx;
    pawn.ry= pawn.ry+dry;
    }

    world.style.transform= "translateZ(600px)" + "rotateX(" + (-pawn.rx) +"deg)" + "rotateY("+ (-pawn.ry) + "deg)" + "translate3d(" + (-pawn.x) + "px," + (-pawn.y) + "px,"+ (-pawn.z) + "px)";
}

function CreateNewWorld(){
    CreateSquares(map, "map");

}

//CreateNewWorld()
 
//TimerGame = setInterval(update,10);

function CreateSquares(squares, string){
       for (let i=0; i< squares.length; i++){

        let newElement = document.createElement("div");
        newElement.className=string + " square";
        newElement.id= string +i;
        newElement.style.width = squares[i][6] + "px";
        newElement.style.height = squares[i][7] + "px";
        newElement.style.background = squares[i][8];
        newElement.style.backgroundImage = "url(" + squares[i][8] + ")";
        newElement.style.opacity=squares[i][9];
        newElement.style.borderRadius=squares[i][9] + "%";

        newElement.style.backgroundSize = "contain";
        newElement.style.backgroundRepeat = "no-repeat";
        newElement.style.backgroundPosition = "center";


        newElement.style.transform = "translate3d("+ 
        (600 - squares[i][6]/2 + squares[i][0]) + "px," + 
        (400 - squares[i][7]/2 + squares[i][1]) + "px," + 
        squares[i][2]+ "px)" + 
        "rotateX(" + squares[i][3] + "deg)" + 
        "rotateY(" + squares[i][4] + "deg)"+ 
        "rotateZ(" + squares[i][5] + "deg)";

        world.append(newElement);

    } 
}