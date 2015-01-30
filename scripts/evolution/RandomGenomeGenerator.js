define(['evolution/Genome'], function (Genome) {
	var RandomGenomeGenerator = function(){};

	RandomGenomeGenerator.prototype = {
		getOne: function(){
			return Genome;
		}
	};

	return RandomGenomeGenerator;
});