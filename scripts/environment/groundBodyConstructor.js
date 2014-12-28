define(['physicsjs'], function(Physics){
	return {
		construct: function(length, angle, x, y){
			return Physics.body('rectangle', {
				x: x,
				y: y,
				width: length,
				height: 10,
				angle: angle,
				styles: {
					fillStyle: 'black', angleIndicator: '#3b3e6b'
				}
			});
		}
	};
});