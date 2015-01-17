define(function(){
	var groundData = [];
	for (var i = 0; i < 100; i++) {
		var previousPoint = groundData[i - 1];
		var newPoint = !previousPoint ? {x:2, y:16} : {x: previousPoint.x + 2, y: Math.random() * 3 - 1.5 + previousPoint.y};
		groundData.push(newPoint);
	}
	return groundData;
});