define(['box2dweb', 'underscore'], function(Box2D, _) {
	var PhysicsWorldProvider = function() {};

	PhysicsWorldProvider.prototype = _.extend(PhysicsWorldProvider.prototype, {
		getWorld: function(){
			// http://stackoverflow.com/a/1608546/614523
			return new Box2D.Dynamics.b2World(
				new Box2D.Common.Math.b2Vec2(0, 30),
				true
			);
		}
	});

	return PhysicsWorldProvider;
});