QUnit.test('snake direction', function(assert) {
	var snkRight = Direction.RIGHT;
	var snkLeft = Direction.LEFT;
	var snkUp = Direction.UP;
	var snkDown = Direction.DOWN;
  
	var result1 = Direction.flip(snkRight);
	var result2 = Direction.flip(snkLeft);
	var result3 = Direction.flip(snkUp);
	var result4 = Direction.flip(snkDown);

	assert.equal(result1, Direction.LEFT);
	assert.equal(result2, Direction.RIGHT);
	assert.equal(result3, Direction.DOWN);
	assert.equal(result4, Direction.UP);
});

QUnit.test("Check if grid was created correctly", function(assert) {
  var space = document.getElementById('cell-0x0');
  var space2 = document.getElementById('cell-'+(WIDTH-1)+'x'+(HEIGHT-1));
  
  assert.ok(space != null);
  assert.ok(2 != null);
});
