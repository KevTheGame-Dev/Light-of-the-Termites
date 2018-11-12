"use strict"
var app = app || {};

app.interaction = (function (){

    let mouse = {
        x: 0,
        y: 0,
        up: true
    }

    let updateMousePos = function(newX, newY){
        this.mouse.x = newX;
        this.mouse.y = newY;
    }

    let onMouseDown = function(){
        this.mouse.up = false;
    }

    let onMouseUp = function(){
        this.mouse.up = true;
    }

    let onKeyPress = function(keyString, player){
        switch (keyString) {
            case "Down": // IE specific value
            case "ArrowDown":
              player.move(player.x, player.y-1);
              break;
            case "Up": // IE specific value
            case "ArrowUp":
              // Do something for "up arrow" key press.
              break;
            case "Left": // IE specific value
            case "ArrowLeft":
              // Do something for "left arrow" key press.
              break;
            case "Right": // IE specific value
            case "ArrowRight":
              // Do something for "right arrow" key press.
              break;
            case "Enter":
              // Do something for "enter" or "return" key press.
              break;
            case "Escape":
              // Do something for "esc" key press.
              break;
            default:
              return; // Quit when this doesn't handle the key event.
          }
    }

    return{
        mouse: mouse,
        updateMousePos: updateMousePos,
        onMouseDown: onMouseDown,
        onMouseUp: onMouseUp
    }
})();