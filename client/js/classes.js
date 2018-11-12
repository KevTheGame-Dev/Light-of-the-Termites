"use strict";

var app = app || {};

app.classes = (function (){
	
	let basicObject = {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		containsMouse(mouseX, mouseY){
			if(mouseX > this.x && mouseX < this.x+this.width && mouseY > this.y && mouseY < this.y + this.height){		
				return true;
			}
			else{
				return false;
			}
		}
	}

	function createButton(posX=0, posY=0, width=100, height=50, color="white", fontColor="black",
						fontSize="30px", text="", onClickEvent=function(){console.log("default button click")}){
		let b = Object.create(basicObject);
		b = Object.assign(b, {
			x: posX,
			y: posY,
			width: width,
			height: height,
			color: color,
			fontColor: fontColor,
			fontSize: fontSize,
			text: text,
			onClick: onClickEvent,
			draw(ctx){
				//Button Box
				ctx.save();
				ctx.beginPath();
				ctx.rect(this.x, this.y, this.width, this.height);
				ctx.closePath();
				ctx.fillStyle = this.color;
				ctx.fill();
				//Button Text
				ctx.font = `${this.fontSize} Roboto`;
				ctx.fillStyle = this.fontColor;
				ctx.textAlign = "center";
				ctx.fillText(this.text, this.x+this.width/2, this.y+this.height/2);
				ctx.restore();
			}
		});

		return b;
	}
	
	return {
		createButton: createButton
	}
}());