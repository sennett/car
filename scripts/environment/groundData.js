define(function(){
	var ground = {
		points: []
	};
	for (var i = 0; i < 100; i++) {
		var previousPoint = ground.points[i - 1];
		var newPoint = !previousPoint ? {x:2, y:16} : {x: previousPoint.x + 2, y: Math.random() * 3 - 1.5 + previousPoint.y};
		ground.points.push(newPoint);
	}
	return ground;
});