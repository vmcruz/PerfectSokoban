/*
Game Engine Mustach v1.0
Developed by Víctor Cruz - 2014
All rights reserved
			   ▄▄▄▄▄▄▄           ▄▄▄▄▄▄▄
            ▄███████████▄     ▄███████████▄
          ▄███████████████▄ ▄███████████████▄
■▄▄▄    ▄██████████████████▀███████████████████▄   ▄▄▄■
   ▀▀████████████████████▀   ▀████████████████████▀▀


*/

/*
http://paulirish.com/2011/requestanimationframe-for-smart-animating/
http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
MIT license
*/

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

var mustach = $ = {
	fontSize : undefined,
	fontFamily : undefined,
	sprites : undefined,
	spriteSize : undefined,
	state : undefined,
	fps: undefined,
	_runIntervalID : undefined,
	_preloadIntervalID : undefined,
	canvas : undefined,
	ctx : undefined,
	spriteSize : undefined,
	customWidth : undefined,
	customHeight : undefined,
	loadedSprites : undefined,
	gameObj : undefined,
	widthResolution : undefined,
	heightResolution : undefined,
	intro : new Audio("assets/mustach/intro.wav"),
	music : new Audio(),
	paused : false,

	newGame : function(gameObj, canvasID, width, height, fps, sprSize) {
		//Where the magic is written in
		document.body.style.margin = "0";
		document.body.style.padding = "0";
		mustach.canvas = document.getElementById(canvasID);
		mustach.ctx = mustach.canvas.getContext("2d");
		mustach.fps = fps;
		mustach.spriteSize = sprSize;
		mustach.gameObj = gameObj;
		mustach.canvas.style.position = "absolute";
		mustach.state = "preloading";
		mustach.setCanvasColor("#000");
		mustach.customWidth = width;
		mustach.customHeight = height;
		mustach.version = "1.0";
		mustach.intro.load();
		
		
		//The resizing function, which adapts to innerScreenSize
		window.onresize = window.onorientationchange = function() {
			var newWidth;
			var newHeight;
			
			newWidth = window.innerWidth;
			newHeight = mustach.customHeight / mustach.customWidth * newWidth;
			
			if(newHeight > window.innerHeight) {
				newHeight = window.innerHeight;
				newWidth = mustach.customWidth / mustach.customHeight * newHeight;
			}
			
			mustach.canvas.style.left = (window.innerWidth - newWidth) / 2 + "px";
			mustach.canvas.style.top = (window.innerHeight - newHeight) / 2 + "px";
			
			mustach.widthResolution = newWidth / mustach.customWidth;
			mustach.heightResolution = newHeight / mustach.customHeight;
			
			mustach.canvas.width = newWidth;
			mustach.canvas.height = newHeight;
		}
		
		//We call the event
		window.onresize();
		var bigote = "            \u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584     \u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\n          \u2584\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2584 \u2584\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2584\n\u25A0\u2584\u2584\u2584    \u2584\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2580\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2584    \u2584\u2584\u2584\u25A0\n   \u2580\u2580\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2580   \u2580\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2580\u2580\nMustach v" + mustach.version + " :{D";
		console.log(bigote);
	},

	setCanvasColor : function(hexColor) {
		mustach.canvas.style.backgroundColor = hexColor;
	},

	execMobile : function() {
		if(typeof window.orientation !== 'undefined')
			return true;
		return false;
	},

	loadSprites : function(path, imgs) {
		imgs.reverse();
		mustach.sprites = new Array();
		var presentationObj = {
							 src : "mustach/_presentation_color.png",
							 name : "presentation_color"
						  };
		imgs.push(presentationObj);
		imgs.reverse();

		imgs.forEach(function(item, index) {
			var spriteImg = new Image();
			mustach.loadedSprites = 0;
			spriteImg.name = item.name;
			spriteImg.eventable = item.eventable;
			spriteImg.change = item.change;
			spriteImg.totalSprites = (item.totalSprites) ? item.totalSprites : 1;
			if(item.displaySprite != undefined)
				spriteImg.displaySprite = item.displaySprite
			else
				spriteImg.displaySprite = 0;
			spriteImg.xPos = item.x;
			spriteImg.yPos = item.y;

			spriteImg.onload = function() {
				mustach.loadedSprites++;
				if(item.w)
					this.w = item.w;
				else
					this.w = mustach.spriteSize;
				if(item.events && item.actions) {
					if(item.eventable && item.events.length == item.actions.length && item.events.length > 0) {
						item.events.forEach(function(e, a) {
							e = ((e.substr(0, 2).toLowerCase() == "on") ? e.substr(2, e.length - 2) : e).toLowerCase();
							mustach.canvas.addEventListener(e, function(event) {
									if(event.pageX >= mustach.canvas.offsetLeft + spriteImg.xPos * mustach.widthResolution && event.pageX <= mustach.canvas.offsetLeft + spriteImg.xPos * mustach.widthResolution + spriteImg.w * mustach.widthResolution && event.pageY >= mustach.canvas.offsetTop + spriteImg.yPos * mustach.heightResolution && event.pageY <= mustach.canvas.offsetTop + spriteImg.yPos * mustach.heightResolution + ((spriteImg.height / spriteImg.totalSprites) / spriteImg.width) * spriteImg.w * mustach.heightResolution) {
										eval("(" + item.actions[a].toString().replace("this", "mustach.sprites[" + index + "]") + ")()");
										if(spriteImg.displaySprite != 0)
											mustach.drawSprite(spriteImg.name, spriteImg.displaySprite);
									}
							}, false);
						});
					} else {
						var error = "Unable to add event listeners to image '" + spriteImg.name + "'\n    -> ";
						if(!item.eventable)
							error += "Image is not set to 'eventable', use { eventable : true }";
						else if(item.events.length != item.actions.length)
							error += "Events array and Actions array have different sizes";
						else if(item.events.length == 0)
							error += "Events array length has size of 0";
						console.error(error);
						return false;
					}
				}
			};
			
			spriteImg.src = path + "/" + item.src;
			mustach.sprites.push(spriteImg);
		});
	},

	getSprite : function(spr) {
		for(var i = 0; i < mustach.sprites.length; i++) {
			if(mustach.sprites[i].name == spr)
				return mustach.sprites[i];
		}
		return undefined;
	},
	
	drawSprite : function(name, sprite, x, y) {
		var img = mustach.getSprite(name);
		if(x == undefined && y == undefined) {
			x = img.xPos;
			y = img.yPos;
		} else if(x == undefined && y == undefined && img.xPos == undefined && img.yPos == undefined) {
			img.xPos = 0;
			img.yPos = 0;
			x = 0;
			y = 0;
		}
		
		if(!sprite) sprite = 0;
		mustach.ctx.drawImage(img, 0, (img.height / img.totalSprites) * sprite, img.width, img.height / img.totalSprites, x * mustach.widthResolution, y * mustach.heightResolution, img.w * mustach.widthResolution, ((img.height / img.totalSprites) / img.width) * img.w * mustach.heightResolution);
	},
	
	getCenteredX : function(cellRangeWidth) {
		return Math.floor((mustach.customWidth / 2) - (cellRangeWidth * $.spriteSize / 2))
	},
	
	getCenteredY : function(cellRangeHeight) {
		return Math.floor((mustach.customHeight / 2) - (cellRangeHeight * $.spriteSize / 2))
	},
	
	drawCenteredText : function(text, color) {
		mustach.ctx.font = mustach.fontSize * mustach.heightResolution + "px " + mustach.fontFamily;
		mustach.ctx.fillStyle = color;
		var lines = text.split("\n");
		for(var i = 0; i < lines.length; i++)
			mustach.ctx.fillText(lines[i], (mustach.canvas.width / 2) - (lines[i].length * (mustach.fontSize / 2) * mustach.widthResolution / 2), (mustach.canvas.height / 2) - (lines.length / 2 * mustach.fontSize * mustach.heightResolution) + (i * mustach.fontSize * mustach.heightResolution));
	},

	run : function() {
		if(mustach.state != "stopped") {
			if(!mustach.paused) {
				mustach.cleanCanvas();
				eval(mustach.gameObj + ".scenes." + ((/\(.*\)+/.test(mustach.state)) ? mustach.state : mustach.state + "()"));
				if(mustach.music.paused)
					mustach.drawSprite("sound", 1);
				else
					mustach.drawSprite("sound", 0);
			}
			mustach._runIntervalID = requestAnimationFrame(mustach.run);
		} else
			cancelAnimationFrame(mustach._runIntervalID);
	},

	presentation : function() {
		mustach.cleanCanvas();
		mustach.ctx.font = "16px '8bits'";
		mustach.ctx.fillStyle = "white";
		
		mustach.ctx.fillText("Loading [" + mustach.padNumber(Math.ceil(mustach.loadedSprites / mustach.sprites.length) * 100, 3, " ") + "%]", (mustach.canvas.width / 2), (mustach.canvas.height / 2) + 100);
		mustach.ctx.drawImage(mustach.getSprite("presentation_color"), (mustach.canvas.width / 2) - 76, (mustach.canvas.height / 2) - 58);
	},

	cleanCanvas : function() {
		mustach.canvas.width = mustach.canvas.width;
	},

	hasLoadedEverything : function() {
		return mustach.loadedSprites == mustach.sprites.length;
	},

	padNumber : function(number, zeroPadding, symbol) {
		var pad = "";
		for(var i = 0; i < zeroPadding; i++)
			pad += symbol;
		return (pad + number).substr(-1 * zeroPadding, zeroPadding);
	},
	
	transition : function(scene, timer, callback) {
		if(scene != mustach.scene) {
			mustach.canvas.style.opacity = 0;
			setTimeout(function(){
				mustach.state = scene;
				if(callback != undefined)
					callback();
				mustach.canvas.style.opacity = 1
			}, timer);
		}
	},
	
	preloadEverything : function(callback) {
		if((mustach.execMobile() && (window.orientation == 90 || window.orientation == -90)) || !mustach.execMobile()) {
			setTimeout(function() { mustach.canvas.style.opacity = 1; }, 10);
			setTimeout(function() { mustach.presentation(); }, 200);
			setTimeout(function() { mustach.intro.play(); }, 700);
			if(mustach.hasLoadedEverything()) {
				clearInterval(mustach._preloadIntervalID);
				setTimeout(function () {
					mustach.canvas.style.opacity = 0;
				}, 4000);
				setTimeout(function () {
					mustach.canvas.style.opacity = 1;
					callback();
				}, 5000);
			}
		}
	}
};
