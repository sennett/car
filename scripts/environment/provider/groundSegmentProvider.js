define(['environment/groundSegment'], function(GroundSegment){
	return function() {
		this.makeGroundSegment = function(point1, point2, index, world){
			return new GroundSegment(point1, point2, index, world);
		}
	}
});