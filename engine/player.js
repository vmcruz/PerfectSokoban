var Player = {};

Player = {
		facingRight : true,
		position : [0, 0, false],
		moves : 0,
		pushes : 0,
		movesStack : new Array(),
		move : function(yaxis, xaxis) {
			var cellValue = Map.map[Player.position[0] + yaxis][Player.position[1] + xaxis];
			switch(cellValue) {
				case " ":
					Map.map[Player.position[0] + yaxis][Player.position[1] + xaxis] = "@";
					Player.cleanMapOnMove();
					break;
				case ".":
					Map.map[Player.position[0] + yaxis][Player.position[1] + xaxis] = "+";
					Player.cleanMapOnMove();
					break;
				case "$":
				case "*":
					if(Box.isPushable(Player.position[0] + yaxis, Player.position[1] + xaxis, Player.position[0] + yaxis * 2, Player.position[1] + xaxis * 2)) {
						switch(cellValue) {
							case "$":
								Map.map[Player.position[0] + yaxis][Player.position[1] + xaxis] = "@";
								if(Map.map[Player.position[0] + yaxis * 2][Player.position[1] + xaxis * 2] == ".") {
									Map.map[Player.position[0] + yaxis * 2][Player.position[1] + xaxis * 2] = "*";
									Map.boxesLeft--;
								}
								else
									Map.map[Player.position[0] + yaxis * 2][Player.position[1] + xaxis * 2] = "$";
								Player.position[2] = true;
								Player.cleanMapOnMove();
								Player.pushes++;
								break;
							case "*":
								Map.map[Player.position[0] + yaxis][Player.position[1] + xaxis] = "+";
								if(Map.map[Player.position[0] + yaxis * 2][Player.position[1] + xaxis * 2] == ".")
									Map.map[Player.position[0] + yaxis * 2][Player.position[1] + xaxis * 2] = "*";
								else {
									Map.map[Player.position[0] + yaxis * 2][Player.position[1] + xaxis * 2] = "$";
									Map.boxesLeft++;
								}
								Player.position[2] = true;
								Player.cleanMapOnMove();
								Player.pushes++;
								break;
								
						}
					}
					break;
			}
		},
		cleanMapOnMove : function() {
			Player.moves++;
			if(Map.time == 0)
				Map.time = (new Date()).getTime();
			Player.movesStack.push([Player.position[0], Player.position[1], Player.position[2]]);
			Player.position[2] = false;
			switch(Map.map[Player.position[0]][Player.position[1]]) {
				case "@":
					Map.map[Player.position[0]][Player.position[1]] = " ";
					break;
				case "+":
					Map.map[Player.position[0]][Player.position[1]] = ".";
					break;
			}
		}
};