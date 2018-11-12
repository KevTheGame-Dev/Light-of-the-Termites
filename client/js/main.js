"use strict";

var app = app || {};

app.main = (function (){
    //activate debug?
    let debug = true;

	// these variables are in "Script scope" and will be available in this and other .js files
	const ctx = document.querySelector("canvas").getContext("2d");
	const screenWidth = 800;
    const screenHeight = 600;
    const screenCenter = {x: screenWidth /2, y: screenHeight/2};

    //Object storage - These exist for easy access, Objects can repeat through multiple lists
    let drawables = []; //Things that need to be drawn
    let clickables = []; //Things that are clickable
    let hoverables = []; //Things that are hoverable
    let sprites = [];
    
    //Import other sections of app
    let classes = app.classes;
    let interactions = app.interaction;
    let stateManager = app.stateManager;
    let gridClass = app.grid;
    let grid = gridClass.initGrid(ctx, screenWidth, screenHeight, 40);
    let playerClass = app.player;
    let playerSpriteSrc = "media/termite.png";
    let player = playerClass.initPlayer(0, 0, 40, 40, playerSpriteSrc, grid);

	function init(){
		let margin = 50;
		let rect = {left: margin, top: margin, width: screenWidth - margin*2, height: screenHeight-margin*2}
        let rect2 = {left: margin, top: margin, width: screenWidth - margin*2, height: screenHeight-margin*3}
		//sprites = sprites.concat(classes.createCircleSprites(10,rect), classes.createSquareSprites(10,rect), classes.createImageSprites(10,rect2));
		loop();
    }
    
    //Track mouse input
    (function(){
        document.onmousemove = function(event){
            interactions.updateMousePos(event.pageX - 57, event.pageY - 50);
        }

        document.onmousedown = function(){
            interactions.onMouseDown();
            for(let c of clickables){
                if(c.containsMouse(interactions.mouse.x, interactions.mouse.y)){
                    c.onClick();
                }
            }
        }

        document.onmouseup = function(){
            interactions.onMouseUp();
        }
    })();


	function loop(){
		// schedule a call to loop() in 1/60th of a second
        requestAnimationFrame(loop);
		
		// draw background
        ctx.fillRect(0,0,screenWidth,screenHeight)
        
        if(debug){ //DEBUG Mouse tracking
            ctx.save();
            ctx.fillStyle = "red";
            ctx.strokeStyle = "red";
            ctx.beginPath();
            ctx.arc(interactions.mouse.x, interactions.mouse.y, 5, 0, Math.PI*2, false);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();

            if(!interactions.mouse.up){
                ctx.save();
                ctx.fillStyle = "white";
                ctx.strokeStyle = "white";
                ctx.beginPath();
                ctx.arc(interactions.mouse.x, interactions.mouse.y, 5, 0, Math.PI*2, false);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.restore();
            }
        }
        
        //Which level loop should run?
        let level = stateManager.getStage();
        switch(level){
            case 0:
                stateManager.mainMenuLoop(debug, classes, interactions, stateManager, ctx, drawables, clickables, hoverables, screenWidth, screenHeight);
                break;
            case 1:
                stateManager.levelOneLoop(debug, classes, interactions, stateManager, grid, player, ctx, drawables, clickables, hoverables, screenWidth, screenHeight);
                break;
        }

		// loop through sprites
		for (let s of sprites){
			// move sprites
			s.move();
			
			// check sides and bounce
			if(s.radius){
			
				if (s.x <= s.radius || s.x >= screenWidth-s.radius){
					s.reflectX();
					s.move();
				}
				if (s.y <= s.radius || s.y >= screenHeight-s.radius){
					s.reflectY();
					s.move();
				}
			} else{ // `s` is not a circle
				// left and right
				if (s.x <= 0 || s.x >= screenWidth-s.width){
					s.reflectX();
					s.move();
				}
				
				if (s.y <= 0 || s.y >= screenHeight-s.height){
					s.reflectY();
					s.move();
				}
				
			} // end if s.radius
        } // end for
        
        for(let d of drawables){
            d.draw(ctx);
        }
	} // end loop()

	return{
        init: init,
        screenCenter: screenCenter
	};
}());
