define(function(){
	var groundData = [{x:2, y:16}];

	for (var i = 1; i < 100; i++) {
		var previousPoint = groundData[i - 1];
		var newPoint = {x: previousPoint.x + 2, y: Math.random() * 3 - 1.5 + previousPoint.y};
		groundData.push(newPoint);
	}
	return groundData;
});