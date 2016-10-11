"use strict";

/**
 * All pacman things
 */
var pacman = {
	
	gen: {
		/**
		 * The different states that a block can be in
		 */
		State: {
			SOLID: '#',
			EMPTY: '~',
      PATH: '-'
		},
		
		/**
		 * Gets the valid directions for the maze maker to
		 * progress to
		 */
		validDirs: function(map, p) {
			
			var solid = this.State.SOLID;
			var empty = this.State.EMPTY;
      var path = this.State.PATH;
      
      function get(map, x, y) {
        if (x < 0 || y < 0 || x >= map.length || y >= map[x].length) {
          return empty;
        } else {
          var value = map[x][y];
          if (value == path)
            value = empty;
          return value;
        }
      }
      
			function checkDir(map, p, xStep, yStep) {
				// the normal to xStep/yStep
        var nxStep = (xStep == 0 ? 1 : 0);
        var nyStep = (yStep == 0 ? 1 : 0);
        
        var x = p.x + xStep;
        var y = p.y + yStep;
        
        if (get(map, x, y) == empty)
          return false;
        if (get(map, x+nxStep, y+nyStep) == empty)
          return false;
        if (get(map, x-nxStep, y-nyStep) == empty)
          return false;    
        if (get(map, x+xStep, y+yStep) == empty)
          return false;
        if (get(map, x+nxStep+xStep, y+yStep+nyStep) == empty)
          return false;
        if (get(map, x-nxStep+xStep, y-nyStep+yStep) == empty)
          return false;
				return true;
			}
			
			var valid = [];
			
			if (checkDir(map, p, -1, 0))
				valid.push(Direction.LEFT);
      if (checkDir(map, p, 1, 0))
				valid.push(Direction.RIGHT);
      if (checkDir(map, p, 0, -1))
				valid.push(Direction.UP);
      if (checkDir(map, p, 0, 1))
				valid.push(Direction.DOWN);
			
			return valid;
		},
    
    // takes a single step in one direction
    advance: function(map, p, direction) {
      switch(direction) {
        case Direction.LEFT:
          p.add(-1, 0); break;
        case Direction.RIGHT:
          p.add(1, 0); break;
        case Direction.UP:
          p.add(0, -1); break;
        case Direction.DOWN:
          p.add(0, 1); break;
      }
      map[p.x][p.y] = this.State.EMPTY;
    },
    
    // generates a blank grid with walls around
    newMap: function(width, height) {
      var map = [];
      for (var i = 0; i < width; i++) {
        map[i] = [];
        for (var j = 0; j < height; j++) {
          map[i][j] = this.State.SOLID;
        }
      }
      
      return map;
    },
    
    forgePath: function(map, p) {
      var dirs = this.validDirs(map, p);
      while (dirs.length != 0) {
        var dir = dirs[Math.floor(Math.random()*dirs.length)];
        this.advance(map, p, dir);
        dirs = this.validDirs(map, p);
      }
      return p;
    },
    
    backtrace: function(map, p) {
      
      function stepBack(map, p) {
        map[p.x][p.y] = pacman.gen.State.PATH;
        
        var optionCount = 0;
        var extraPaths = 0;
        var xStep = 0;
        var yStep = 0;
        for (var i = -1; i <= 1; i++) {
          for (var j = -1; j <= 1; j++) {
            if (Math.abs(i) == 1 && Math.abs(j)) {
              continue;
            }
            if (map[p.x+i][p.y+j] == pacman.gen.State.EMPTY) {
              var dirs = pacman.gen.validDirs(map, p);
              
              if (dirs.length > 0) {
                optionCount++;
                xStep = i;
                yStep = j;
              }
            }
          }
        }
        
        console.log(optionCount);
        console.log(p);
        
        if (optionCount == 1) {
          p.add(xStep, yStep);
          return false;
        } else if (optionCount > 1) {
          return true;
        } else {
          throw "Cannot start off a path";
        }
      }
      
      while (!stepBack(map, p)) {};
      
    },
    
    generate: function() {
      var map = this.newMap(WIDTH, HEIGHT);
      var position = new Point(1, 1);
      map[1][1] = this.State.EMPTY;
      
      this.forgePath(map, position);
      return map;
    }
	}
}


$(function() {
	grid().clear().color('white').back('#111').char('');	
});