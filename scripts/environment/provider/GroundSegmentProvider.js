define(['environment/GroundSegment'], function(GroundSegment){
	var GroundSegmentProvider = function() {};
	GroundSegmentProvider.prototype = {
		makeGroundSegment: function(point1, point2, index, world){
			return new GroundSegment(point1, point2, index, world);
		}
	};

	return GroundSegmentProvider;
});