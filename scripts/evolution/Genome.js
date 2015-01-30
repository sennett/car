define(function () {
	return {
		angle0: undefined,
		magnitude0: undefined,
		angle1: undefined,
		magnitude1: undefined,
		angle2: undefined,
		magnitude2: undefined,
		angle3: undefined,
		magnitude3: undefined,
		angle4: undefined,
		magnitude4: undefined,
		angle5: undefined,
		magnitude5: undefined,
		angle6: undefined,
		magnitude6: undefined,
		angle7: undefined,
		magnitude7: undefined,

		wheelVertex0: undefined,
		wheelRadius0: undefined,
		wheelVertex1: undefined,
		wheelRadius1: undefined,

		runForVertices: function(runForVertex){
			for (var i = 0; i <=7; i++)
				runForVertex(this['angle' + i], this['magnitude' + i]);
		},

		loopWheels: function(runForWheel){

		}
	};
});