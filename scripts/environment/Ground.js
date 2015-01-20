define(['underscore'], function (_) {
	return function(groundSegmentProvider){
		var _this = this;
		this.groundSegmentProvider = groundSegmentProvider;

		_this.segments = [];

		this.initialisePhysicsBodies = function(world){
			_.each(_this.points, function(point, index){
				var nextPoint = _this.points[index + 1];
				if (nextPoint)
					_this.segments.push(_this.groundSegmentProvider.makeGroundSegment(point, nextPoint, index, world));
			});
		};

		this.setData = function(data){
			_this.points = data;
		};
	};
});