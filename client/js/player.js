"use strict"
var app = app || {};

app.player = (function (){

    let player = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        image: undefined,
        grid: []
    }

    function initPlayer(startX, startY, width, height, textureString, grid){
        let p = Object.create(player);

        let img = new Image();
        img.src = textureString;

        p = Object.assign(p, {
            x: startX,
            y: startY,
            image: img,
            grid: grid,
            move(newX, newY){//TP player to new position
                this.x = newX;
                this.y = newY;
            },
            moveRight(){//Move the player one space right
                if(this.x >= grid.length){
                    if(debug){ console.log("Right edge hit!"); }
                }
                else{
                    this.x++;
                }
            },
            moveDown(){//Move the player one space down
                if(this.y >= grid[0].length){
                    if(debug){ console.log("Bottom edge hit!"); }
                }
                else{
                    this.y++;
                }
            },
            moveLeft(){//Move the player one space left
                if(this.x <= 0){
                    if(debug){ console.log("Left edge hit!"); }
                }
                else{
                    this.x--;
                }
            },
            moveUp(){//Move the player one space up
                if(this.y <= 0){
                    if(debug){ console.log("Top edge hit!"); }
                }
                else{
                    this.y--;
                }
            },
            draw(ctx){//Draw player within grid
                console.log("drawing player");
                ctx.save();
                ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
                ctx.restore();
            }
        });

        return p;
    }

    return{
        initPlayer: initPlayer
    }
})();