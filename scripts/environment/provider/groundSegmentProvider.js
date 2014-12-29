define(function(){
	// takes two coordinates and generates numbers from a
	return function(groundBodyConstructor) {
		var _this = this;

		this.groundBodyConstructor = groundBodyConstructor;

		this.makeGroundSegment = function(point1, point2){
			//function(length, angle, x, y){
			var length = point2.x - point1.x,
				angle = 0,
				xLocation = (point2.x + point1.x) / 2,
				yLocation = (point2.y + point1.y) / 2;
			return _this.groundBodyConstructor.construct(length, angle, xLocation, yLocation);
		}
	}
});