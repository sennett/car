define(['evolution/genome', 'underscore', 'core/util'], function (baseGenome, _, util) {
	var minMagnitude = 0.2;
	var maxMagnitude = 5;
	var minRadius = 0.1;
	var maxRadius = 1.5;
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
			this.addWheel(_.random(0, totalVertices - 1), util.random(minRadius, maxRadius));
		}
	};

	var RandomGenomeGenerator = function(){};

	RandomGenomeGenerator.prototype = {
		getOne: function(){
			var genome =  _.extend({}, baseGenome);
			createVertices.call(genome);
			createWheels.call(genome);
			return genome;
		}
	};

	return RandomGenomeGenerator;
});