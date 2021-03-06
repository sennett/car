define(['core/util', 'underscore', 'domain/Car'], function (util, _, Car) {
	var minMagnitude = 0.2;
	var maxMagnitude = 4;
	var minRadius = 0.1;
	var maxRadius = 1;
	var totalVertices = 8;
	var maxWheels = 2;
	
	var clearPreviousInstantiation = function(){
		this.totalVertices = 0;
		this.totalWheels = 0;
	};

	var addVertex = function(angle, magnitude){
		setVertex.call(this, angle, magnitude, this.totalVertices);
		this.totalVertices++;
	};

	var addWheel = function(vertex, radius){
		setWheel.call(this, vertex, radius, this.totalWheels);
		this.totalWheels++;
	};

	var setVertex = function(angle, magnitude, i){
		if (!_.isUndefined(angle))
			this['angle' + i] = angle;
		if (!_.isUndefined(magnitude))
			this['magnitude' + i] = magnitude;
	};

	var setWheel = function(vertex, radius, i) {
		if (!_.isUndefined(vertex))
			this['wheelVertex' + i] = vertex;
		if (!_.isUndefined(radius))
			this['wheelRadius' + i] = radius;
	};
	
	var setScore = function(carId, score){
		this.score = score;
	};
	
	var genome = {
		totalVertices: 0,
		totalWheels: 0,

		geneType: {
			vertex: 'vertex',
			wheel: 'wheel'
		},

		totalGenes: function(){
			return this.totalVertices + this.totalWheels;
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
			clearPreviousInstantiation.call(this);
			_.each(array, function(gene){
				if (gene.type == this.geneType.vertex)
					addVertex.call(this, gene.angle, gene.magnitude);
				else if (gene.type == this.geneType.wheel)
					addWheel.call(this, gene.vertex, gene.radius);
				else
					throw "unknown gene type '" + gene.type + "'";
			}, this);
		},

		randomise: function(){
			clearPreviousInstantiation.call(this);
			for (var i = 0; i < totalVertices; i++){
				var angle = util.random(2 * Math.PI * i / totalVertices, 2 * Math.PI * (i + 1) / totalVertices);
				addVertex.call(this, angle, util.random(minMagnitude, maxMagnitude));
			}

			for (var i = 0; i < maxWheels; i++){
				addWheel.call(this, _.random(0, totalVertices - 1), util.random(minRadius, maxRadius));
			}
		},

		mutate: function(mutationRate){
			for (var i = 0; i < totalVertices; i++){
				var randomAngle = util.random(2 * Math.PI * i / totalVertices, 2 * Math.PI * (i + 1) / totalVertices);
				var randomMagnitude = util.random(minMagnitude, maxMagnitude);
				setVertex.call(this,
					mutationRate > Math.random() ? randomAngle : undefined,
					mutationRate > Math.random() ? randomMagnitude : undefined,
					i);
			}

			for (var i = 0; i < maxWheels; i++){
				var randomVertex = _.random(0, totalVertices - 1);
				var randomRadius = util.random(minRadius, maxRadius);
				setWheel.call(this,
					mutationRate > Math.random() ? randomVertex : undefined,
					mutationRate > Math.random() ? randomRadius : undefined, i);
			}
		},
		
		createRandom: function(){
			var newGenome = this.create();
			newGenome.randomise();
			return newGenome;
		},
		
		serialise: function(){
			return this.toArray();
		},
		
		createCar: function(){
			var car = new Car(this);
			car.onNewScore(_.bind(setScore, this));
			return car;
		},
		
		create: function(){
			return _.extend({}, this);
		},
		
		mate: function (otherGenome, mutationRate) {

			var firstRand = _.random(0, this.totalGenes());
			var offspringData = util.crossover(this.toArray(), otherGenome.toArray(), firstRand, _.random(firstRand, 10)),
				childOne = _.extend({}, genome),
				childTwo = _.extend({}, genome);
			childOne.fromArray(offspringData.one);
			childTwo.fromArray(offspringData.two);
			childOne.mutate(mutationRate);
			childTwo.mutate(mutationRate);
			return {
				one: childOne,
				two: childTwo
			};
		}
	};
	return genome;
});