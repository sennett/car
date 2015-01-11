define(['box2dweb'], function(box2dweb){
	return {
		getPhysicsBodies: function(){
			var wheel1, wheel2, body, constraints;
			var compound = Physics.body('compound',{
				//x: 200,
				//y: 200
			});
			body = Physics.body('rectangle', {
				width: 100,
				height: 50,
				x: 100,
				y: 100
			});
			wheel1 = Physics.body('circle', {
				radius: 20,
				x: 90,
				y: 110
			});
			wheel2 = Physics.body('circle', {
				radius: 20,
				x: 110,
				y: 110
			});
			constraints = Physics.behavior('verlet-constraints');
			constraints.distanceConstraint(body, wheel1, wheel2, 1);
			return [body, wheel1, wheel2,
				//constraints
			];
		}
	};
});