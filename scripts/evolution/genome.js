define(['core/util', 'underscore'], function (util, _) {
	var minMagnitude = 0.2;
	var maxMagnitude = 4;
	var minRadius = 0.1;
	var maxRadius = 2;
	var totalVertices = 8;
	var maxWheels = 0;
	var chanceOfMutation = 0.05;

	return {
		totalVertices: 0,
		totalWheels: 0,

		geneType: {
			vertex: 'vertex',
			wheel: 'wheel'
		},

		totalGenes: function(){
			return this.totalVertices + this.totalWheels;
		},

		addVertex: function(angle, magnitude){
			this.setVertex(angle, magnitude, this.totalVertices);
			this.totalVertices++;
		},

		addWheel: function(vertex, radius){
			this.setWheel(vertex, radius, this.totalWheels);
			this.totalWheels++;
		},

		setVertex: function(angle, magnitude, i){
			if (!_.isUndefined(angle))
				this['angle' + i] = angle;
			if (!_.isUndefined(magnitude))
				this['magnitude' + i] = magnitude;
		},

		setWheel: function(vertex, radius, i) {
			if (!_.isUndefined(vertex))
				this['wheelVertex' + i] = vertex;
			if (!_.isUndefined(radius))
				this['wheelRadius' + i] = radius;
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
		},

		randomise: function(){
			for (var i = 0; i < totalVertices; i++){
				var angle = util.random(2 * Math.PI * i / totalVertices, 2 * Math.PI * (i + 1) / totalVertices);
				this.addVertex(angle, util.random(minMagnitude, maxMagnitude));
			}

			for (var i = 0; i < maxWheels; i++){
				this.addWheel(_.random(0, totalVertices - 1), util.random(minRadius, maxRadius));
			}
		},

		mutate: function(){
			for (var i = 0; i < totalVertices; i++){
				var randomAngle = util.random(2 * Math.PI * i / totalVertices, 2 * Math.PI * (i + 1) / totalVertices);
				var randomMagnitude = util.random(minMagnitude, maxMagnitude);
				this.setVertex(
					chanceOfMutation > Math.random() ? randomAngle : undefined,
					chanceOfMutation > Math.random() ? randomMagnitude : undefined,
					i);
			}

			for (var i = 0; i < maxWheels; i++){
				var randomVertex = _.random(0, totalVertices - 1);
				var randomRadius = util.random(minRadius, maxRadius);
				this.setWheel(
					chanceOfMutation > Math.random() ? randomVertex : undefined,
					chanceOfMutation > Math.random() ? randomRadius : undefined, i);
			}
		}
	};
});