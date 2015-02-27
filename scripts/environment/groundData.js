define(function(){
	var groundData = [
		{x:-10, y:16},
		{x:8, y:16},
		{x:10, y:16},
		{x:12, y:16},
		{x:14, y:16}];

	for (var i = groundData.length; i < 1000; i++) {
		var previousPoint = groundData[i - 1];
		var newPoint = {x: previousPoint.x + 2, y: Math.random() * 3 - 1.5 + previousPoint.y};
		groundData.push(newPoint);
	}
	return groundData;
});