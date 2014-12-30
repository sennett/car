define(function () {
	return function(point1, point2, bodyProvider) {
		var _this = this;
		this.point1 = point1;
		this.point2 = point2;

		var makeBody = function(point1, point2){
			var xdiff = point2.x - point1.x,
				ydiff = point2.y - point1.y,
				length = Math.sqrt(Math.pow(xdiff, 2) + Math.pow(ydiff, 2)),
				angle = Math.atan2(ydiff, xdiff),
				xLocation = (point2.x + point1.x) / 2,
				yLocation = (point2.y + point1.y) / 2;
			return bodyProvider.construct(length, angle, xLocation, yLocation);
		};

		this.getPhysicsBody = function(){
			if (!_this.physicsBody)
				_this.physicsBody = makeBody(_this.point1, _this.point2);
			return _this.physicsBody;
		};
	};
});