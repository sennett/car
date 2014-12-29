define(['physicsjs'], function(Physics) {
	return {
		world: function(){
			// http://stackoverflow.com/a/1608546/614523
			function construct(constructor, args) {
				function F() {
					return constructor.apply(this, args);
				}
				F.prototype = constructor.prototype;
				return new F();
			}
			return construct(Physics.world, arguments);
		}
	};
});