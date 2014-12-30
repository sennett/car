define(function(){
	return function(groundBodyConstructor) {
		var _this = this;

		this.groundBodyConstructor = groundBodyConstructor;

		this.makeGroundSegment = function(point1, point2){
			var xdiff = point2.x - point1.x,
				ydiff = point2.y - point1.y,
				length = Math.sqrt(Math.pow(xdiff, 2) + Math.pow(ydiff, 2)),
				angle = Math.atan2(ydiff, xdiff),
				xLocation = (point2.x + point1.x) / 2,
				yLocation = (point2.y + point1.y) / 2;
			return _this.groundBodyConstructor.construct(length, angle, xLocation, yLocation);
		}
	}
});