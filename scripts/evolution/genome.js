define(function () {

	return {
		totalVertices: 0,
		totalWheels: 0,

		addVertex: function(angle, magnitude){
			this['angle' + this.totalVertices] = angle;
			this['magnitude' + this.totalVertices] = magnitude;
			this.totalVertices++;
		},

		addWheel: function(vertex, radius){
			this['wheelVertex' + this.totalWheels] = vertex;
			this['wheelRadius' + this.totalWheels] = radius;
			this.totalWheels++;
		},

		forEachVertex: function(runForVertex){
			for (var i = 0; i < this.totalVertices; i++)
				runForVertex(this['angle' + i], this['magnitude' + i], i);
		},

		forEachWheel: function(runForWheel){
			for (var i = 0; i < this.totalWheels; i++)
				runForWheel(this['wheelVertex' + i], this['wheelRadius' + i]);
		},

		toArray: function(){
			var array = [];
			this.forEachVertex(function(angle, magnitude){
				array.push({
					angle: angle,
					magnitude: magnitude,
					type: "vertex"
				})
			});
			this.forEachWheel(function(vertex, magnitude){
				array.push({
					vertex: vertex,
					magnitude: magnitude,
					type: 'wheel'
				})
			});
			return array;
		},

		fromArray:function(array){

		}
	};
});