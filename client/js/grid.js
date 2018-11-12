"use strict"
var app = app || {};

app.grid = (function (){

    let grid = {
        width: 0,
        height: 0,
        gridSpacing: 0,
        gridArray: undefined
    }

    function initGrid(ctx, gridWidth, gridHeight, gridSpacing){
        let g = Object.create(grid);

        let theGrid = new Array(gridWidth);

        for(let i = 0; i < Math.floor(gridWidth/gridSpacing); i++){
            theGrid.push(new Array(Math.floor(gridHeight/gridSpacing)));
        }

        g = Object.assign(g, {
            width: gridWidth,
            height: gridHeight,
            gridSpacing: gridSpacing,
            gridArray: theGrid,
            translateCoords(x,y){
                let coords = {realX: x * this.gridSpacing, realY: y * this.gridSpacing}
                return coords;
            },
            draw(ctx){
                
                console.log("drawing grid");
                for(let n = 0; n < this.width/this.gridSpacing; n++){
                    for(let m = 0; m < this.height/this.gridSpacing; m++){
                        let coords = this.translateCoords(n,m);
                        
                        ctx.save();
                        ctx.moveTo(coords.realX, coords.realY);
                        ctx.strokeStyle = "black";
                        ctx.beginPath();
                        ctx.lineTo(coords.realX + this.gridSpacing, coords.realY);
                        ctx.lineTo(coords.realX + this.gridSpacing, coords.realY + this.gridSpacing);
                        ctx.lineTo(coords.realX, coords.realY + this.gridSpacing);
                        ctx.lineTo(coords.realX, coords.realY);
                        ctx.closePath();
                        ctx.stroke();
                        ctx.restore();
                    }
                }
            }
        });

        return g;
    }

    function addDirt(x, y){

    }

    function addAir(x, y){

    }

    function addPulpBridge(x, y){

    }

    function addEnemy(x, y){

    }


    return{
        initGrid: initGrid
    }
})();