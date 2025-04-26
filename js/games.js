"use strict"
/*
1. Game Setup ---C
2. Player Creation ----
3. Gravity
4. Player Movement (Velocity)
5. Platforms
6. Scroll the background
7. Win Scenario
8. Death Pits
9. Image Platform
10 Parallex Scroll
11 Fine Tuning
12. Enemies
*/
let mode = "walk";
const canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");
//canvas.style.background = "#ff8";
canvas.style.backgroundImage = "url('../images/background.png')";
let offset = 0;

//PLAYER CREATION CLASS
/*
this.position.x
this.position.y
1. Single Platform
2. Multiple Platform
3. Multiple Platform(Array)
4. X Blocking with size large
5. Below the platform
6. Scroll the background

*/
let key="start";

let gravity = 0.5;

class Platform {
    constructor(x, y, width, height,) {
        this.position = { x: x, y: y };
        this.width = platformImage.width;
        this.height = platformImage.height;

    }
    draw() {
        context.fillStyle = "blue";
        context.drawImage(platformImage, this.position.x, this.position.y)
        //context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
class Player {
    constructor() {
        this.position = { x: 100, y: 100 };
        //this.position.x
        this.velocity = { x: 0, y: 4 }
        //this.velocity.x
        //this.position.x=100;
        //this.position.y=100;
        this.width = 50;
        this.height = 50;
        this.frames=0;

    }
    draw() 
    {

           context.fillRect(this.position.x, this.position.y, this.width, this.height);
              
    }
   
    playerMovement() {
        this.frames++;
       if(this.frames>28) this.frames=0;
        this.position.x += this.velocity.x;

        this.position.y += this.velocity.y;
        //console.log(player.velocity.y);

        if ((this.position.y + this.height + this.velocity.y) >= canvas.height)
            this.velocity.y = 0;
        else
            this.velocity.y += gravity;

        //PLATFORM STOP LOGIC  
        for (let i = 0; i < platforms.length; i++) {
            if ((this.position.x + this.width + this.velocity.x) > platforms[i].position.x &&
                (this.position.x + this.width <= platforms[i].position.x + platforms[i].width) &&
                (this.position.y + this.height >= platforms[i].position.y) &&
                (this.position.y + this.height < platforms[i].position.y + platforms[i].height + 20)
            ) {
                this.velocity.y = 0;

            }

            //HORIZONTAL STOP
            if (this.position.x + this.width == platforms[i].position.x && (this.position.y > platforms[i].position.y) && (this.position.y < platforms[i].position.y + platforms[i].height))
                this.velocity.x = 0;

            //MOVEMENT
            platforms[i].position.x += offset;





        }



        //PLATFORM STOP LOGIC COMPLETE

        //console.log(player.velocity.y);






        this.draw();

    }
}

//EVENT HANDLING
addEventListener("keyup", function (e) {

    if (e.key == "ArrowRight") {
        player.velocity.x = 0;
        moveOffset(0);
        frames = 1;

    }

    if (e.key == "ArrowLeft") {
        player.velocity.x = 0;
        moveOffset(0);

    }

});
addEventListener("keydown", function (e) {

    console.log(e.key);

    if (e.key == "ArrowUp") {
        // if(player.position.y+player.height>canvas.height-1)
        player.position.y = player.position.y - 3;
        player.velocity.y = -14;



    }
    if (e.key == "ArrowRight") {
        player.velocity.x = 5;
       // frames=1
        moveOffset(-5);


    }

    if (e.key == "ArrowLeft") {
        player.velocity.x = -5;
        moveOffset(5);
    }




})

function moveOffset(x) {
    if (player.position.x >= 410)
        offset = x;

}
//MAIN LOGIC

//create Images
let total=6;
const backImage = new Image();
backImage.src = "images/hills.png";

const platformImage = new Image();
platformImage.src = "images/platform.png";

const platformSmallImage = new Image();
platformSmallImage.src = "images/platformSmallTall.png";

const playerImage = new Image()
playerImage.src = "images/spriteStandRight.png";

const playerRightImage = new Image()
playerRightImage.src = "images/spriteRunRight.png";


const playerLeftImage = new Image()
playerLeftImage.src = "images/spriteRunLeft.png";



backImage.onload=loadingImages;
platformImage.onload=loadingImages;
platformSmallImage.onload=loadingImages;
playerImage.onload=loadingImages;
playerRightImage.onload=loadingImages;
playerLeftImage.onload=loadingImages;


function loadingImages()
{
    total--;
    
    if(total==0)
    {
        createPlatforms();
    }

}




//console.log(platformImage.width);

const platforms = [];
function createPlatforms()
{
const platform = new Platform(0, canvas.height - platformImage.height, 100, 200);
platform.draw();

const platform1 = new Platform(platformImage.width - 2, canvas.height - platformImage.height, 100, 20);
platform1.draw();


platforms.push(platform);
platforms.push(platform1);
}
//platforms.push(platform2);


const player = new Player();
player.draw();


let imagestart = 0;
//ANIMATION FRAME
function gameAnimation() {
    requestAnimationFrame(gameAnimation);
   // if(player.velocity.x!=0 || player.velocity.y!=0){
    context.clearRect(0, 0, canvas.width, canvas.height)
    imagestart = imagestart + offset
    context.drawImage(backImage, imagestart, 0);
    for (let i = 0; i < platforms.length; i++)
        platforms[i].draw();

    player.playerMovement();
    
//}

}
//start the game manimation
gameAnimation();

