define(['environment/groundSegment'], function(GroundSegment){
	return function(groundBodyProvider) {
		this.makeGroundSegment = function(point1, point2){
			return new GroundSegment(point1, point2, groundBodyProvider);
		}
	}
});