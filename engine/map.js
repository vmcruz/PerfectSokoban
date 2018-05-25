var Map = {};

Map = {
		map : undefined,
		level : 0,
		boxesLeft : 0,
		startDrawingX : 0,
		startDrawingY : 0,
		time : 0,
		actualTime : 0,
		makeLevel : function(levelID) {
			Map.boxesLeft = 0;
			Player.moves = 0;
			Player.pushes = 0;
			Player.movesStack = new Array();
			Map.time = 0;
			var lines = Sokoban.levels[levelID - 1].split("|");
			Map.map = new Array();
			var maxWIndex = 0;
			
			for(var i = 0; i < lines.length; i++) {
				if(lines[i].length > lines[maxWIndex].length) maxWIndex = i;
				Map.map[i] = new Array();
				for(var j = 0; j < lines[i].length; j++) {
					Map.map[i][j] = lines[i].charAt(j);
					if(Map.map[i][j] == "$")
						Map.boxesLeft++;
				}
			}
			Map.level = levelID;
			Map.startDrawingX = $.getCenteredX(lines[maxWIndex].length);
			Map.startDrawingY = $.getCenteredY(lines.length);
			$.paused = false;
		},
		drawMap : function() {
			for(var i = 0; i < Map.map.length; i++) {
				for(var j = 0; j < Map.map[i].length; j++) {
					var x = j * $.spriteSize;
					var y = i * $.spriteSize;
					switch(Map.map[i][j]) {
						case "#":
							$.drawSprite("block", 0, Map.startDrawingX + x, Map.startDrawingY + y);
							break;
						case "@":
							Player.position = [i, j, false];
							if(Player.facingRight)
								$.drawSprite("player", 0, Map.startDrawingX + x, Map.startDrawingY + y);
							else
								$.drawSprite("player", 1, Map.startDrawingX + x, Map.startDrawingY + y);
							break;
						case "+":
							Player.position = [i, j, false];
							$.drawSprite("goal", Map.startDrawingX + x, Map.startDrawingY + y);
							if(Player.facingRight)
								$.drawSprite("player", 0, Map.startDrawingX + x, Map.startDrawingY + y);
							else
								$.drawSprite("player", 1, Map.startDrawingX + x, Map.startDrawingY + y);
							break;
						case "$":
							$.drawSprite("box", 0, Map.startDrawingX + x, Map.startDrawingY + y);
							break;
						case "*":
							$.drawSprite("box_ok", 0, Map.startDrawingX + x, Map.startDrawingY + y);
							break;
						case ".":
							$.drawSprite("goal", 0, Map.startDrawingX + x, Map.startDrawingY + y);
					}
				}
			}
			return true;
		},
		isFinished : function() {
			if(Map.boxesLeft == 0)
				return true;
			return false;
		}
};