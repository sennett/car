define(['underscore'], function (_) {
	var Ground = function(groundSegmentProvider) {
		this.groundSegmentProvider = groundSegmentProvider;
	};

	Ground.prototype = {
		segments: [],
		initialisePhysicsBodies: function(world){
			_.each(this.points, function(point, index){
				var nextPoint = this.points[index + 1];
				if (nextPoint)
					this.segments.push(this.groundSegmentProvider.makeGroundSegment(point, nextPoint, index, world));
			}, this);
		},
		setData: function(data){
			this.points = data;
		}
	};

	return Ground;
});