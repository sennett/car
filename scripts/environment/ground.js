define(['underscore'], function (_) {
	var ground = function(groundSegmentProvider){
		var _this = this;
		this.groundSegmentProvider = groundSegmentProvider;

		_this.segments = [];

		var contactListener = {

			BeginContact: function(){
				console.log('begin');
			},
			EndContact: function(){
				console.log('end');
			},
			PostSolve:function(){

			},
			PreSolve:function(){

			}
		};

		this.initialisePhysicsBodies = function(world){
			world.SetContactListener(contactListener);
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
	return ground;
});