define(['evolution/Genome', 'underscore', 'core/util'], function (Genome, _, util) {
	var minMagnitude = 0.2;
	var maxMagnitude = 4;
	var minRadius = 0.1;
	var maxRadius = 2;
	var totalVertices = 8;
	var maxWheels = 2;

	var createVertices = function(){
		for (var i = 0; i < totalVertices; i++){
			var angle = util.random(2 * Math.PI * i / totalVertices, 2 * Math.PI * (i + 1) / totalVertices);
			this.addVertex(angle, util.random(minMagnitude, maxMagnitude));
		}
	};

	var createWheels = function(){
		for (var i = 0; i < maxWheels; i++){
			this.addWheel(Math.floor(util.random(0, totalVertices - 0.001)), util.random(minRadius, maxRadius));
		}
	};

	var RandomGenomeGenerator = function(){};

	RandomGenomeGenerator.prototype = {
		getOne: function(){
			var genome =  _.extend({}, Genome);
			createVertices.call(genome);
			createWheels.call(genome);
			return genome;
		}
	};

	return RandomGenomeGenerator;
});