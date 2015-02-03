define(['evolution/genome', 'underscore', 'core/util'], function (baseGenome, _, util) {
	var RandomGenomeGenerator = function(){};

	RandomGenomeGenerator.prototype = {
		getOne: function(){
			var genome =  _.extend({}, baseGenome);
			genome.randomise();
			return genome;
		}
	};

	return RandomGenomeGenerator;
});