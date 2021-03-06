"use strict";

/**
 * All maze things. Most of the work is done in maze-gen.js
 */
var maze = {
  draw: function(map) {
    /**
     * Converts the state of a tile into a character
     */
    function translate(value) {
      if (value == mazegen.State.PATH)
        return ' ';
      return '#';
    }
    
    grid().clear().color('#aaa').back('#111').char('');    
    var stringArray = [];
    for (var i = 0; i < map.length; i++) {
      for (var j = 0; j < map[i].length; j++) {
        var ch = translate(map[i][j]);
        var str = stringArray[j];
        if (str == undefined) {
          str = '';
        }
        str += ch;
        stringArray[j] = str;
      }
    }
    
    for (var i in stringArray) {
      var line = stringArray[i];
      row(i).centerText(line);
    }
  }
}


$(function() {
  var start = new Point(Math.floor(WIDTH/2), 1);
  var end = new Point(start.x, HEIGHT-4);
  
  var map = mazegen.generate(WIDTH, HEIGHT-2, end, start);
  var player = new Point(start.x, start.y);
  maze.draw(map, player, end);
  movePlayer(0, 0);
  cell(end.x, end.y).char('F').color('red');
  
  var score = 100;
  var scoreRow = row(HEIGHT-1);
  scoreRow.color('white');
  function counter() {
    score--;
    scoreRow.centerText('SCORE: ' + score);
    setTimeout(counter, 1000);
  }
  counter();
  
  function movePlayer(xStep, yStep) {
    var xNew = player.x + xStep;
    var yNew = player.y + yStep;
    if (end.x == xNew && end.y == yNew) {
      submitHighScore(GameID.MazeGame, score);
      return;
    }
    if (map[xNew][yNew] == mazegen.State.SOLID) {
      return;
    } else {
      cell(player.x, player.y).char(' ');
      player.set(xNew, yNew);
      cell(player.x, player.y).char('@').color('red');
    }
  }
  
  onButtonLeft(function() {
    movePlayer(-1, 0);
  });
  onButtonRight(function() {
    movePlayer(1, 0);
  });
  onButtonDown(function() {
    movePlayer(0, 1);
  });
  onButtonUp(function() {
    movePlayer(0, -1);
  });
});
