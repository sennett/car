define(function () {

	return {
		totalVertices: 0,
		totalWheels: 0,

		geneType: {
			vertex: 'vertex',
			wheel: 'wheel'
		},

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

		forEachVertex: function(runForVertex, ctx){
			for (var i = 0; i < this.totalVertices; i++)
				runForVertex.call(ctx, this['angle' + i], this['magnitude' + i], i);
		},

		forEachWheel: function(runForWheel, ctx){
			for (var i = 0; i < this.totalWheels; i++)
				runForWheel.call(ctx, this['wheelVertex' + i], this['wheelRadius' + i]);
		},

		toArray: function(){
			var array = [];
			this.forEachVertex(function(angle, magnitude){
				array.push({
					angle: angle,
					magnitude: magnitude,
					type: this.geneType.vertex
				})
			}, this);
			this.forEachWheel(function(vertex, radius){
				array.push({
					vertex: vertex,
					radius: radius,
					type: this.geneType.wheel
				})
			}, this);
			return array;
		},

		fromArray: function(array){
			_.each(array, function(gene){
				if (gene.type == this.geneType.vertex)
					this.addVertex(gene.angle, gene.magnitude);
				else if (gene.type == this.geneType.wheel)
					this.addWheel(gene.vertex, gene.radius);
				else
					throw "unknown gene type '" + gene.type + "'";
			}, this);
		}
	};
});