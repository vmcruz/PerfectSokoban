var imageSet = [
		{src : "player.png", name : "player", totalSprites : 2},
		{src : "box.png", name : "box" },
		{src : "box_ok.png", name : "box_ok"},
		{src : "goal.png", name : "goal"},
		{src : "block.png", name : "block"},
		{src : "header.png", name : "header", w: 300},
		{src : "ui/stats.png", name : "stats", w : 100},
		{src : "ui/_reset_level.png",
			name : "reset",
			events : ["onmousedown", "ontouchstart"],
			actions: [
					function() {
						if(mustach.state == "leveling")
							Map.makeLevel(Map.level);
					},
					function() {
						if(mustach.state == "leveling")
							Map.makeLevel(Map.level);
					}
			],
			eventable : true,
			x : 10,
			y : 400,
			w : 100
		},
		{src : "ui/next_level.png",
			name : "next_level",
			events : ["onmousedown", "ontouchstart"],
			actions: [
					function() {
						if(mustach.state == "leveling" && Map.isFinished())
							mustach.transition("leveling", 1000, function() {	Map.level++; Map.makeLevel(Map.level); });
					},
					function() {
						if(mustach.state == "leveling" && Map.isFinished())
							mustach.transition("leveling", 1000, function() {	Map.level++; Map.makeLevel(Map.level); });
					}
			],
			eventable : true,
			x : 850,
			y : 190,
			w : 100
		},
		{src : "ui/_home.png",
			name : "home",
			events : ["onmousedown", "ontouchstart"],
			actions: [
					function() {
						if(mustach.state != "preloading") {
							mustach.transition("home", 1000, function() { Map.makeLevel(Map.level);} );
						}
					},
					function() {
						if(mustach.state != "preloading") {
							mustach.transition("home", 1000, function() { Map.makeLevel(Map.level);} );
						}
					}
			],
			eventable : true,
			x : 10,
			y : 270,
			w : 100
		},
		{src : "ui/_undo.png",
			name : "undo",
			events : ["onmousedown", "ontouchstart"],
			actions : [
				function() {
					if(mustach.state == "leveling")
						Sokoban.undo();
				},
				function() {
					if(mustach.state == "leveling")
						Sokoban.undo();
				}
			],
			eventable : true,
			x : 10,
			y : 530,
			w : 100
		},
		{src : "ui/_joypad_up.png",
			name : "joypad_up",
			events : ["onmousedown", "ontouchstart"],
			actions : [
				function() {
					if(mustach.state == "leveling")
						Player.move(-1, 0);
				},
				function() {
					if(mustach.state == "leveling")
						Player.move(-1, 0);
				},
			],
			eventable : true,
			x : 750,
			y : 330,
			w : 100
		},
		{src : "ui/_joypad_right.png",
			name : "joypad_right",
			events : ["onmousedown", "ontouchstart"],
			actions : [
				function() {
					if(mustach.state == "leveling") {
						Player.move(0, 1);
						Player.facingRight = true;
					}
				},
				function(evt) {
					if(mustach.state == "leveling") {
						Player.move(0, 1);
						Player.facingRight = true;
					}
				},
			],
			eventable : true,
			x : 850,
			y : 430,
			w : 100
		},
		{src : "ui/_joypad_down.png",
			name : "joypad_down",
			events : ["onmousedown", "ontouchstart"],
			actions : [
				function() {
					if(mustach.state == "leveling")
						Player.move(1, 0);
				},
				function(evt) {
					if(mustach.state == "leveling")
						Player.move(1, 0);
				},
			],
			eventable : true,
			x : 750,
			y : 530,
			w : 100
		},
		{src : "ui/_joypad_left.png",
			name : "joypad_left",
			events : ["onmousedown", "ontouchstart"],
			actions : [
				function() {
					if(mustach.state == "leveling") {
						Player.move(0, -1);
						Player.facingRight = false;
					}
				},
				function(evt) {
					if(mustach.state == "leveling") {
						Player.move(0, -1);
						Player.facingRight = false;
					}
				},
			],
			eventable : true,
			x : 650,
			y : 430,
			w : 100
		},
		{src : "ui/sound.png",
			name : "sound",
			events : ["onmousedown", "ontouchstart"],
			actions : [
				function() {
					if(mustach.music.paused)
						mustach.music.play();
					else
						mustach.music.pause();
				},
				function() {
					if(mustach.music.paused)
						mustach.music.play();
					else
						mustach.music.pause();
				},
			],
			eventable : true,
			x : 850,
			y : 50,
			w : 100,
			totalSprites : 2,
			displaySprite: 0
		},
		{src : "ui/play.png",
			name : "play",
			events : ["onmousedown", "ontouchstart"],
			actions : [
				function() {
					if(mustach.state == "home") {
						mustach.transition("leveling", 1000, function() { Map.makeLevel(Map.level);} );
					}
				},
				function(evt) {
					if(mustach.state == "home") {
						mustach.transition("leveling", 1000, function() { Map.makeLevel(Map.level);} );
					}
				},
			],
			eventable : true,
			x : 38,
			y : 547,
			w : 200
		},
		{src : "ui/select_prev.png",
			name : "select_prev",
			events : ["onmousedown", "ontouchstart"],
			actions : [
				function() {
					if(mustach.state == "home") {
						if(Map.level > 1) {
							Map.level--;
							Map.makeLevel(Map.level);
						} else {
							Map.level = Sokoban.levels.length;
							Map.makeLevel(Map.level);
						}
					}
				},
				function(evt) {
					if(mustach.state == "home") {
						if(Map.level > 1) {
							Map.level--;
							Map.makeLevel(Map.level);
						} else {
							Map.level = Sokoban.levels.length;
							Map.makeLevel(Map.level);
						}
					}
				},
			],
			eventable : true,
			x : 266,
			y : 547,
			w : 100
		},
		{src : "ui/select_next.png",
			name : "select_next",
			events : ["onmousedown", "ontouchstart"],
			actions : [
				function() {
					if(mustach.state == "home") {
						if(Map.level < Sokoban.levels.length) {
							Map.level++;
							Map.makeLevel(Map.level);
						} else {
							Map.level = 1;
							Map.makeLevel(Map.level);
						}
					}
				},
				function(evt) {
					if(mustach.state == "home") {
						if(Map.level < Sokoban.levels.length) {
							Map.level++;
							Map.makeLevel(Map.level);
						} else {
							Map.level = 1;
							Map.makeLevel(Map.level);
						}
					}
				},
			],
			eventable : true,
			x : 366,
			y : 547,
			w : 100
		},
		{src : "ui/controls.png",
			name : "controls",
			events : ["onmousedown", "ontouchstart"],
			actions : [
				function() {
					if(mustach.state == "home") {
						mustach.transition("controls", 1000);
					}
				},
				function(evt) {
					if(mustach.state == "home") {
						mustach.transition("controls", 1000);
					}
				},
			],
			eventable : true,
			x : 494,
			y : 547,
			w : 200
		},
		{src : "ui/about.png",
			name : "about",
			events : ["onmousedown", "ontouchstart"],
			actions : [
				function() {
					if(mustach.state == "home") {
						mustach.transition("about", 1000);
					}
				},
				function(evt) {
					if(mustach.state == "home") {
						mustach.transition("about", 1000);
					}
				},
			],
			eventable : true,
			x : 722,
			y : 547,
			w : 200
		}
		/*{src: "twitter.png",
			name : "twitter",
			events : ["onmousedown", "ontouchstart"],
			actions : [
				function() {
					if(mustach.state == "leveling" && Map.isFinished()) {
						var msg = "My time in level " + Map.level + " was " + Map.actualTime + "s. Can you make it better?, try!: http://perfectsokoban.clay.io";
						Clay.Twitter.post( { message:msg, editable: true});
					}
				},
				function(evt) {
					if(mustach.state == "leveling" && Map.isFinished()) {
						var msg = "My time in level " + Map.level + " was " + Map.actualTime + "s. Can you make it better?, try!: http://perfectsokoban.clay.io";
						Clay.Twitter.post( { message:msg, editable: true});
					}
				},
			],
			eventable : true,
			x : 840,
			y : 330,
			w: 50
		},
		{src: "facebook.png",
			name : "facebook",
			events : ["onmousedown", "ontouchstart"],
			actions : [
				function() {
					if(mustach.state == "leveling" && Map.isFinished()) {
						var msg = "My time in level " + Map.level + " was " + Map.actualTime + "s. Can you make it better?, try!: http://perfectsokoban.clay.io";
						Clay.Facebook.post( { message:msg, editable: true });
					}
				},
				function(evt) {
					if(mustach.state == "leveling" && Map.isFinished()) {
						var msg = "My time in level " + Map.level + " was " + Map.actualTime + "s. Can you make it better?, try!: http://perfectsokoban.clay.io";
						Clay.Facebook.post( { message:msg, editable: true });
					}
				},
			],
			eventable : true,
			x : 900,
			y : 330,
			w: 50
		}*/
	];