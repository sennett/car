define(function () {
	var createAngle = function(x){
		return Math.PI * x / 4;
	};
	return {
		angle0: createAngle(0),
		magnitude0: 1,
		angle1: createAngle(1),
		magnitude1: 2,
		angle2: createAngle(2),
		magnitude2: 1,
		angle3: createAngle(3),
		magnitude3: 2,
		angle4: createAngle(4),
		magnitude4: 1,
		angle5: createAngle(5),
		magnitude5: 2,
		angle6: createAngle(6),
		magnitude6: 1,
		angle7: createAngle(7),
		magnitude7: 2,

		wheelVertex0: 1,
		wheelRadius0: 1,
		wheelVertex1: 2,
		wheelRadius1: 1,

		runForVertices: function(runForVertex){
			for (var i = 0; i <=7; i++)
				runForVertex(this['angle' + i], this['magnitude' + i]);
		},

		loopWheels: function(runForWheel){

		}
	};
});