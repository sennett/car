define(['underscore'], function (_) {
	var ground = function(groundSegmentProvider){
		var _this = this;
		this.groundSegmentProvider = groundSegmentProvider;

		this.initialisePhysicsBodies = function(world){
			_.each(_this.points, function(point, index){
				var nextPoint = _this.points[index + 1];
				if (nextPoint)
					_this.groundSegmentProvider.makeGroundSegment(point, nextPoint).createPhysicsBody(world);
			});
		};

		this.setData = function(data){
			_this.points = data;
		};
	};
	return ground;
});