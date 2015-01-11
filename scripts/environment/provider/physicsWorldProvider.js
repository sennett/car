define(['box2dweb'], function(box2dweb) {
	return {
		world: function(){
			// http://stackoverflow.com/a/1608546/614523
			return new Box2D.Dynamics.b2World(
				new box2dweb.Common.Math.b2Vec2(0, 9.8),
				true
			)
		}
	};
});