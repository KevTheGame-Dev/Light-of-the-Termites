"use strict"
var app = app || {};

app.stateManager = (function (){

    //Level management
    let stage = 0;
    let stageCap = 1;
    let firstLevelLoop = true;

    function getStage(){
        return stage;
    }

    function nextStage(){
        if(stage != stageCap){
            stage = stage + 1;
            console.log("Moving on to level " + stage);
            firstLevelLoop = true;
        }
        else{
            console.log("Stage limit reached");
        }
    }

    function jumpToStage(newStage){
        stage = newStage;
        firstLevelLoop = true;
    }


    //Level Code
    function mainMenuLoop(debug, classes, interaction, stateManager, ctx, drawables, clickables, hoverables, screenWidth, screenHeight){
        if(firstLevelLoop){//init Main menu loop items
            if(debug){
                console.log("main menu init");
            }
            let myButton = classes.createButton(screenWidth/2-130, screenHeight*1/2, 260, 100, "white", "black", "30px", "Play!", () => {
                stateManager.nextStage();
            });
            drawables.push(myButton);
            clickables.push(myButton);

            firstLevelLoop = false;
        }

        //Give main menu a brown background
        ctx.save();
        ctx.fillStyle = "#b5651d";
        ctx.fillRect(0, 0, screenWidth, screenHeight);
        ctx.restore();

        ctx.save();
        ctx.fillStyle = "#000000";
        ctx.font = "60px Roboto";
        ctx.textAlign = "center";
        ctx.fillText("Light", screenWidth/2, screenHeight*1/4);
        ctx.font = "20px Roboto";
        ctx.fillText("of the", screenWidth/2, screenHeight*1/4+35);
        ctx.font = "60px Roboto";
        ctx.fillText("Termites", screenWidth/2, screenHeight*1/4+85);
        ctx.restore();
    }

    function levelOneLoop(debug, classes, interaction, stateManager, grid, player, ctx, drawables, clickables, hoverables, screenWidth, screenHeight){
        if(firstLevelLoop){
            if(debug){
                console.log("level one init");
            }

            drawables.splice(0, drawables.length);
            clickables.splice(0, drawables.length);
            hoverables.splice(0, drawables.length);

            drawables.push(player);

            firstLevelLoop = false;
        }

        ctx.save();
        ctx.fillStyle = "#ccccff";
        ctx.fillRect(0, 0, screenWidth, screenHeight);
        ctx.restore();

        grid.draw(ctx);
        player.draw(ctx);
    }

    return{
        getStage: getStage,
        nextStage: nextStage,
        jumpToStage: jumpToStage,
        mainMenuLoop: mainMenuLoop,
        levelOneLoop: levelOneLoop
    }
})();