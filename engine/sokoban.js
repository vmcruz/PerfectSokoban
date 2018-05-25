var Sokoban = {};

Sokoban = {
	adStarted: 0,
	levels : [
				"    #####|    #   #|    #$  #|  ###  $##|  #  $ $ #|### # ## #   ######|#   # ## #####  ..#|# $  $          ..#|##### ### #@##  ..#|    #     #########|    #######",
				"############|#..  #     ###|#..  # $  $  #|#..  #$####  #|#..    @ ##  #|#..  # #  $ ##|###### ##$ $ #|  # $  $ $ $ #|  #    #     #|  ############",
				"        ########|        #     @#|        # $#$ ##|        # $  $#|        ##$ $ #|######### $ # ###|#....  ## $  $  #|##...    $  $   #|#....  ##########|########",
				"           ########|           #  ....#|############  ....#|#    #  $ $   ....#|# $$$#$  $ #  ....#|#  $     $ #  ....#|# $$ #$ $ $########|#  $ #     #|## #########|#    #    ##|#     $   ##|#  $$#$$  @#|#    #    ##|###########",
				"        #####|        #   #####|        # #$##  #|        #     $ #|######### ###   #|#....  ## $  $###|#....    $ $$ ##|#....  ##$  $ @#|#########  $  ##|        # $ $  #|        ### ## #|          #    #|          ######",
				"######  ###|#..  # ##@##|#..  ###   #|#..     $$ #|#..  # # $ #|#..### # $ #|#### $ #$  #|   #  $# $ #|   # $  $  #|   #  ##   #|   #########",
				"       #####| #######   ##|## # @## $$ #|#    $      #|#  $  ###   #|### #####$###|# $  ### ..#|# $ $ $ ...#|#    ###...#|# $$ # #...#|#  ### #####|####",
				"  ####|  #  ###########|  #    $   $ $ #|  # $# $ #  $  #|  #  $ $  #    #|### $# #  #### #|#@#$ $ $  ##   #|#    $ #$#   # #|#   $    $ $ $ #|#####  #########|  #      #|  #      #|  #......#|  #......#|  #......#|  ########",
				"          #######|          #  ...#|      #####  ...#|      #      . .#|      #  ##  ...#|      ## ##  ...#|     ### ########|     # $$$ ##| #####  $ $ #####|##   #$ $   #   #|#@ $  $    $  $ #|###### $$ $ #####|     #      #|     ########",
				" ###  #############|##@####       #   #|# $$   $$  $ $ ...#|#  $$$#    $  #...#|# $   # $$ $$ #...#|###   #  $    #...#|#     # $ $ $ #...#|#    ###### ###...#|## #  #  $ $  #...#|#  ## # $$ $ $##..#|# ..# #  $      #.#|# ..# # $$$ $$$ #.#|##### #       # #.#|    # ######### #.#|    #           #.#|    ###############",
				"          ####|     #### #  #|   ### @###$ #|  ##      $  #| ##  $ $$## ##| #  #$##     #| # # $ $$ # ###| #   $ #  # $ #####|####    #  $$ #   #|#### ## $         #|#.    ###  ########|#.. ..# ####|#...#.#|#.....#|#######",
				"################|#              #|# # ######     #|# #  $ $ $ $#  #|# #   $@$   ## ##|# #  $ $ $###...#|# #   $ $  ##...#|# ###$$$ $ ##...#|#     # ## ##...#|#####   ## ##...#|    #####     ###|        #     #|        #######",
				"   #########|  ##   ##  ######|###     #  #    ###|#  $ #$ #  #  ... #|# # $#@$## # #.#. #|#  # #$  #    . . #|# $    $ # # #.#. #|#   ##  ##$ $ . . #|# $ #   #  #$#.#. #|## $  $   $  $... #| #$ ######    ##  #| #  #    ##########| ####",
				"       #######| #######     #| #     # $@$ #| #$$ #   #########| # ###......##   #| #   $......## # #| # ###......     #|##   #### ### #$##|#  #$   #  $  # #|#  $ $$$  # $## #|#   $ $ ###$$ # #|#####     $   # #|    ### ###   # #|      #     #   #|      ########  #|             ####",
				"   ########|   #   #  #|   #  $   #| ### #$   ####| #  $  ##$   #| #  # @ $ # $#| #  #      $ ####| ## ####$##     #| # $#.....# #   #| #  $..**. $# ###|##  #.....#   #|#   ### #######|# $$  #  #|#  #     #|######   #|     #####",
				"#####|#   ##|#    #  ####|# $  ####  #|#  $$ $   $#|###@ #$    ##| #  ##  $ $ ##| # $  ## ## .#| #  #$##$  #.#| ###   $..##.#|  #    #.*...#|  # $$ #.....#|  #  #########|  #  #|  ####",
				"   ##########|   #..  #   #|   #..      #|   #..  #  ####|  #######  #  ##|  #            #|  #  #  ##  #  #|#### ##  #### ##|#  $  ##### #  #|# # $  $  # $  #|# @$  $   #   ##|#### ## #######|   #    #|   ######",
				"     ###########|     #  .  #   #|     # #.    @ #| ##### ##..# ####|##  # ..###     ###|# $ #...   $ #  $ #|#    .. ##  ## ## #|####$##$# $ #   # #|  ## #    #$ $$ # #|  #  $ # #  # $## #|  #               #|  #  ###########  #|  ####         ####",
				"  ######|  #   @####|##### $   #|#   ##    ####|# $ #  ##    #|# $ #  ##### #|## $  $    # #|## $ $ ### # #|## #  $  # # #|## # #$#   # #|## ###   # # ######|#  $  #### # #....#|#    $    $   ..#.#|####$  $# $   ....#|#       #  ## ....#|###################",
				"    ##########|#####        ####|#     #   $  #@ #|# #######$####  ###|# #    ## #  #$ ..#|# # $     #  #  #.#|# # $  #     #$ ..#|# #  ### ##     #.#|# ###  #  #  #$ ..#|# #    #  ####  #.#|# #$   $  $  #$ ..#|#    $ # $ $ #  #.#|#### $###    #$ ..#|   #    $$ ###....#|   #      ## ######|   ########",
				"#########|#       #|#       ####|## #### #  #|## #@##    #|# $$$ $  $$#|#  # ## $  #|#  # ##  $ ####|####  $$$ $#  #| #   ##   ....#| # #   # #.. .#| #   # # ##...#| ##### $  #...#|     ##   #####|      #####",
				"######     ####|#    #######  #####|#   $#  #  $  #   #|#  $  $  $ # $ $  #|##$ $   # @# $    #|#  $ ########### ##|# #   #.......# $#|# ##  # ......#  #|# #   $........$ #|# # $ #.... ..#  #|#  $ $####$#### $#|# $   ### $   $  ##|# $     $ $  $    #|## ###### $ ##### #|#         #       #|###################",
				"    #######|    #  #  ####|##### $#$ #  ##|#.. #  #  #   #|#.. # $#$ #  $####|#.  #     #$  #  #|#..   $#  # $    #|#..@#  #$ #$  #  #|#.. # $#     $#  #|#.. #  #$$#$  #  ##|#.. # $#  #  $#$  #|#.. #  #  #   #   #|##. ####  #####   #| ####  ####   #####",
				"###############|#..........  .####|#..........$$.#  #|###########$ #   ##|#      $  $     $ #|## ####   #  $ #  #|#      #   ##  # ##|#  $#  # ##  ### ##|# $ #$###    ### ##|###  $ #  #  ### ##|###    $ ## #  # ##| # $  #  $  $ $   #| #  $  $#$$$  #   #| #  #  $      #####| # @##  #  #  #| ##############",
				"####|#  ##############|#  #   ..#......#|#  # # ##### ...#|##$#    ........#|#   ##$######  ####|# $ #     ######@ #|##$ # $   ######  #|#  $ #$$$##       #|#      #    #$#$###|# #### #$$$$$    #|# #    $     #   #|# #   ##        ###|# ######$###### $ #|#        #    #   #|##########    #####",
				" #######| #  #  #####|##  #  #...###|#  $#  #...  #|# $ #$$ ...  #|#  $#  #... .#|#   # $########|##$       $ $ #|##  #  $$ #   #| ######  ##$$@#|      #      ##|      ########",
				" #################| #...   #    #   ##|##.....  $## # #$ #|#......#  $  #    #|#......#  #  # #  #|######### $  $ $  #|  #     #$##$ ##$##| ##   $    # $    #| #  ## ### #  ##$ #| # $ $$     $  $  #| # $    $##$ ######| #######  @ ##|       ######",
				"         #####|     #####   #|    ## $  $  ####|##### $  $ $ ##.#|#       $$  ##..#|#  ###### ###.. #|## #  #    #... #|# $   #    #... #|#@ #$ ## ####...#|####  $ $$  ##..#|   ##  $ $  $...#|    # $$  $ #  .#|    #   $ $  ####|    ######   #|         #####",
				"#####|#   ##|# $  #########|## # #       ######|## #   $#$#@  #   #|#  #      $ #   $ #|#  ### ######### ##|#  ## ..*..... # ##|## ## *.*..*.* # ##|# $########## ##$ #|#  $   $  $    $  #|#  #   #   #   #  #|###################",
				"       ###########|       #   #     #|#####  #     $ $ #|#   ##### $## # ##|# $ ##   # ## $  #|# $  @$$ # ##$$$ #|## ###   # ##    #|## #   ### #####$#|## #     $  #....#|#  ### ## $ #....##|# $   $ #   #..$. #|#  ## $ #  ##.... #|#####   ######...##|    #####    #####",
				"  ####|  #  #########| ##  ##  #   #| #  $# $@$   ####| #$  $  # $ $#  ##|##  $## #$ $     #|#  #  # #   $$$  #|# $    $  $## ####|# $ $ #$#  #  #|##  ###  ###$ #| #  #....     #| ####......####|   #....####|   #...##|   #...#|   #####",
				"      ####|  #####  #| ##     $#|## $  ## ###|#@$ $ # $  #|#### ##   $#| #....#$ $ #| #....#   $#| #....  $$ ##| #... # $   #| ######$ $  #|      #   ###|      #$ ###|      #  #|      ####",
				"############|##     ##  #|##   $   $ #|#### ## $$ #|#   $ #    #|# $$$ # ####|#   # # $ ##|#  #  #  $ #|# $# $#    #|#   ..# ####|####.. $ #@#|#.....# $# #|##....#  $ #|###..##    #|############",
				" #########| #....   ##| #.#.#  $ ##|##....# # @##|# ....#  #  ##|#     #$ ##$ #|## ###  $    #| #$  $ $ $#  #| # #  $ $ ## #| #  ###  ##  #| #    ## ## ##| #  $ #  $  #| ###$ $   ###|   #  #####|   ####",
				"############ ######|#   #    # ###....#|#   $$#   @  .....#|#   # ###   # ....#|## ## ###  #  ....#| # $ $     # # ####| #  $ $##  #      #|#### #  #### # ## #|#  # #$   ## #    #|# $  $  # ## #   ##|# # $ $    # #   #|#  $ ## ## # #####|# $$     $$  #|## ## ### $  #| #    # #    #| ###### ######",
				"            #####|#####  ######   #|#   ####  $ $ $ #|# $   ## ## ##  ##|#   $ $     $  $ #|### $  ## ##     ##|  # ##### #####$$ #| ##$##### @##     #| # $  ###$### $  ##| # $  #   ###  ###| # $$ $ #   $$ #| #     #   ##  #| #######.. .###|    #.........#|    #.........#|    ###########",
				"###########|#......   #########|#......   #  ##   #|#..### $    $     #|#... $ $ #   ##   #|#...#$#####    #  #|###    #   #$  #$ #|  #  $$ $ $  $##  #|  #  $   #$#$ ##$ #|  ### ## #    ##  #|   #  $ $ ## ######|   #    $  $  #|   ##   # #   #|    #####@#####|        ###",
				"      ####|####### @#|#     $  #|#   $## $#|##$#...# #| # $...  #| # #. .# ##| #   # #$ #| #$  $    #| #  #######| ####",
				"             ######| #############....#|##   ##     ##....#|#  $$##  $ @##....#|#      $$ $#  ....#|#  $ ## $$ # # ...#|#  $ ## $  #  ....#|## ##### ### ##.###|##   $  $ ##   .  #|# $###  # ##### ###|#   $   #       #|#  $ #$ $ $###  #|# $$$# $   # ####|#    #  $$ #|######   ###|     #####",
				"    ############|    #          ##|    #  # #$$ $  #|    #$ #$#  ## @#|   ## ## # $ # ##|   #   $ #$  # #|   #   # $   # #|   ## $ $   ## #|   #  #  ##  $ #|   #    ## $$# #|######$$   #   #|#....#  ########|#.#... ##|#....   #|#....   #|#########",
				"           #####|          ##   ##|         ##     #|        ##  $$  #|       ## $$  $ #|       # $    $ #|####   #   $$ #####|#  ######## ##    #|#.            $$$@#|#.# ####### ##   ##|#.# #######. #$ $##|#........... #    #|##############  $ #|             ##  ##|              ####",
				"     ########|  ####      ######|  #    ## $ $   @#|  # ## ##$#$ $ $##|### ......#  $$ ##|#   ......#  #   #|# # ......#$  $  #|# #$...... $$# $ #|#   ### ###$  $ ##|###  $  $  $  $ #|  #  $  $  $  $ #|  ######   ######|       #####",
				"        #######|    #####  #  ####|    #   #   $    #| #### #$$ ## ##  #|##      # #  ## ###|#  ### $#$  $  $  #|#...    # ##  #   #|#...#    @ # ### ##|#...#  ###  $  $  #|######## ##   #   #|          #########",
				" #####| #   #| # # #######| #      $@######| # $ ##$ ###   #| # #### $    $ #| # ##### #  #$ ####|##  #### ##$      #|#  $#  $  # ## ## #|#         # #...# #|######  ###  ...  #|     #### # #...# #|          # ### # #|          #       #|          #########",
				"##### ####|#...# #  ####|#...###  $  #|#....## $  $###|##....##   $  #|###... ## $ $ #|# ##    #  $  #|#  ## # ### ####|# $ # #$  $    #|#  $ @ $    $  #|#   # $ $$ $ ###|#  ######  ###|# ##    ####|###",
				"##########|#        ####|# ###### #  ##|# # $ $ $  $ #|#       #$   #|###$  $$#  ###|  #  ## # $##|  ##$#   $ @#|   #  $ $ ###|   # #   $  #|   # ##   # #|  ##  ##### #|  #         #|  #.......###|  #.......#|  #########",
				"         ####| #########  ##|##  $      $ #####|#   ## ##   ##...#|# #$$ $ $$#$##...#|# #   @   #   ...#|#  $# ###$$   ...#|# $  $$  $ ##....#|###$       #######|  #  #######|  ####",
				"  #########|  #*.*#*.*#|  #.*.*.*.#|  #*.*.*.*#|  #.*.*.*.#|  #*.*.*.*#|  ###   ###|    #   #|###### ######|#           #|# $ $ $ $ $ #|## $ $ $ $ ##| #$ $ $ $ $#| #   $@$   #| #  #####  #| ####   ####",
				"       ####|       #  ##|       #   ##|       # $$ ##|     ###$  $ ##|  ####    $   #|###  # #####  #|#    # #....$ #|# #   $ ....# #|#  $ # #.*..# #|###  #### ### #|  #### @$  ##$##|     ### $     #|       #  ##   #|       #########",
				"      ############|     ##..    #   #|    ##..* $    $ #|   ##..*.# # # $##|   #..*.# # # $  #|####...#  #    # #|#  ## #          #|# @$ $ ###  #   ##|# $   $   # #   #|###$$   # # # # #|  #   $   # # #####|  # $# #####      #|  #$   #   #    # #|  #  ###   ##     #|  #  #      #    ##|  ####      ######"
			],
	scenes : {
		leveling : function() {
				$.ctx.font = $.fontSize * $.heightResolution + "px " + $.fontFamily;
				$.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
				
				var midStatsBoxW = 23 * $.widthResolution;
				$.drawSprite("stats", 0, 10, 30);
				$.drawSprite("stats", 0, 10, 140);
				$.ctx.fillText("MOVES", midStatsBoxW, 57 * $.heightResolution)
				$.ctx.fillText($.padNumber(Player.moves, 6, " "), midStatsBoxW, 74 * $.heightResolution);
				$.ctx.fillText("PUSHS", midStatsBoxW, 103 * $.heightResolution);
				$.ctx.fillText($.padNumber(Player.pushes, 6, " "), midStatsBoxW, 119 * $.heightResolution);
				$.ctx.fillText("BOXES", midStatsBoxW, 168 * $.heightResolution);
				$.ctx.fillText($.padNumber(Map.boxesLeft, 6, " "), midStatsBoxW, 185 * $.heightResolution);
				$.ctx.fillText("TIME", midStatsBoxW, 214 * $.heightResolution);
				Map.actualTime = ((Map.time > 0) ? Math.floor(((new Date()).getTime() - Map.time) / 1000) : 0);
				
				/*var ads = document.getElementById("ads");
				if(Map.actualTime % 30 == 0 && Map.actualTime > 0) {
					Sokoban.adStarted = Map.actualTime;
					ads.setAttribute("style", "width: 468px; height: 60px; display: block; position: absolute; top: 100%; margin-top: -65px; left: 100%; margin-left: -468px; z-index: 2;");
				}
				else if(Map.actualTime - Sokoban.adStarted >= 7)
					ads.setAttribute("style", "display: none;");*/
				
				$.ctx.fillText($.padNumber(Map.actualTime, 6, " "), midStatsBoxW, 230 * $.heightResolution);
								
				Map.drawMap();
				$.ctx.fillStyle = "white";
				$.ctx.fillText("LEVEL #" + $.padNumber(Map.level, 2, "0"), ($.canvas.width / 2) - (8 * $.fontSize / 2 * $.widthResolution), 50 * $.heightResolution);
				$.drawSprite("home");
				$.drawSprite("undo");
				$.drawSprite("reset");
				if($.execMobile()) {
					$.drawSprite("joypad_up");
					$.drawSprite("joypad_down");
					$.drawSprite("joypad_left");
					$.drawSprite("joypad_right");
				}
				if(Map.isFinished()) {
					$.paused = true;
					if(Map.level + 1 <= Sokoban.levels.length) {
						$.drawSprite("next_level");
						//$.drawSprite("facebook");
						//$.drawSprite("twitter");
					}
				}
			},
		about : function() {
			$.drawSprite("home");
			$.drawCenteredText("Sokoban is an old Japanese Puzzle, first introduced by\nThinking Rabbit in 1982. The main goal is to arrange all boxes\nin the places marked in the map. You can push the boxes\nbut you can't pull them. Always use the 'undo icon'\nto undo movements whenever you want.\n\nDeveloped by\nVictor Cruz - 2014.\nAll rights reserved", "white");
		},
		controls : function() {
			$.drawSprite("home");
			if($.execMobile()) {
				$.drawCenteredText("Controls?, you don't need to know 'controls'\nall you need is your finger ;),", "white");
			}
			else {
				$.drawCenteredText("Whoa!, so you are in a web browser.\nHere is how you wanna use your keyboard:\n\n- Use arrow keys to move the player\n- Ctrl + Z: Undo movements\n- Ctrl + R: Restart level\n\nThat's it!", "white");
			}
		},
		home : function() {
			Map.drawMap();
			$.ctx.font = $.fontSize * $.heightResolution + "px " + $.fontFamily;
			$.ctx.fillStyle = "white";
			$.ctx.fillText("LEVEL #" + $.padNumber(Map.level, 2, "0"), ($.canvas.width / 2) - (8 * $.fontSize / 2 * $.widthResolution), 50 * $.heightResolution);
			$.drawSprite("header", 0, 10, 10);
			$.drawSprite("play");
			$.drawSprite("select_prev");
			$.drawSprite("select_next");
			$.drawSprite("controls");
			$.drawSprite("about");
		}
	},
	onmousedown : function(evt) {
		evt.preventDefault();
	},
	onmouseup : function(evt) {
		evt.preventDefault();
	},
	undo : function() {
		if(Player.movesStack.length > 0) {
			Player.moves--;
			var lastMove = Player.movesStack.pop();
			var x = lastMove[1] - Player.position[1];
			var y = lastMove[0] - Player.position[0];
			if(lastMove[2] === true) {
				Player.pushes--;
				if(Map.map[Player.position[0] - y][Player.position[1] - x] == "*" && Map.map[Player.position[0]][Player.position[1]] == "+") {
					Map.map[Player.position[0]][Player.position[1]] = "*";
					Map.map[Player.position[0] - y][Player.position[1] - x] = ".";
				}
				else if(Map.map[Player.position[0] - y][Player.position[1] - x] == "*" && Map.map[Player.position[0]][Player.position[1]] == "@") {
					Map.map[Player.position[0]][Player.position[1]] = "$";
					Map.map[Player.position[0] - y][Player.position[1] - x] = ".";
					Map.boxesLeft++;
				}
				else if(Map.map[Player.position[0] - y][Player.position[1] - x] == "$" && Map.map[Player.position[0]][Player.position[1]] == "+") {
					Map.map[Player.position[0]][Player.position[1]] = "*";
					Map.map[Player.position[0] - y][Player.position[1] - x] = " ";
					Map.boxesLeft--;
				}
				else {
					Map.map[Player.position[0]][Player.position[1]] = "$";
					Map.map[Player.position[0] - y][Player.position[1] - x] = " ";
				}
			} else
				Map.map[Player.position[0]][Player.position[1]] = (Map.map[Player.position[0]][Player.position[1]] == "+") ? "." : " ";
			
			if(Map.map[Player.position[0] + y][Player.position[1] + x] == ".") {
				Map.map[Player.position[0] + y][Player.position[1] + x] = "+";
				Player.position = [y, x, false];
			}
			else {
				Map.map[Player.position[0] + y][Player.position[1] + x] = "@";
				Player.position = [y, x, false];
			}
		}
	},
	handleInputs : function(evt) {
		evt.preventDefault();
		var up = (evt.keyCode == 38 || evt.keyCode == 87);
		var down = (evt.keyCode == 40 || evt.keyCode == 83);
		var left = (evt.keyCode == 37 || evt.keyCode == 65);
		var right = (evt.keyCode == 39 || evt.keyCode == 68);
		var ctrlz = (evt.keyCode == 90 && evt.ctrlKey);
		var ctrlr = (evt.keyCode == 82 && evt.ctrlKey);
		var ctrlh = (evt.keyCode == 72 && evt.ctrlKey);
		
		if($.state == "leveling") {
			if(up) Player.move(-1, 0);
			else if(down) Player.move(1, 0);
			else if(left) { Player.move(0, -1); Player.facingRight = false; }
			else if(right) { Player.move(0, 1); Player.facingRight = true; }
			else if(ctrlr) { Map.makeLevel(Map.level); }
			else if(ctrlz) { Sokoban.undo(); }
			else if(ctrlh) { $.transition("home", 1000); }
		}
	},
	newSokoban : function() {
		$.cleanCanvas();
		$.setCanvasColor("#d8a87f");
		setTimeout(function() { $.music.play(); }, 1000);
		document.onkeydown = Sokoban.handleInputs;
		$.canvas.onmousedown = Sokoban.onmousedown;
		$.canvas.onmouseup = Sokoban.onmouseup;
		$.canvas.addEventListener("touchstart", Sokoban.onmousedown, false);
		$.canvas.addEventListener("touchend", Sokoban.onmouseup, false);
		$.state = "home";
		$.fontSize = 24;
		$.fontFamily = "'8bits'";
		Map.makeLevel(1);
		$._runIntervalID = requestAnimationFrame($.run);
	}
};

$.newGame("Sokoban", "canvas", 960, 640, 30, 32);
$.loadSprites("assets", imageSet, true);
if(window.opr != undefined)
	$.music.src = "assets/theme.ogg";
else
	$.music.src = "assets/theme.mp3";
$.music.loop = true;
$.music.load();
$._preloadIntervalID = setInterval("$.preloadEverything(Sokoban.newSokoban)", 1000 / $.fps);