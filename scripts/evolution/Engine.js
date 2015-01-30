define(function () {
	var Engine = function(randomGenomeGenerator){
		this.randomGenomeGenerator = randomGenomeGenerator;
	};

	Engine.prototype = {
		nextGenome: function(){
			return this.randomGenomeGenerator.getOne();
		},
		registerScore: function(score, forGenome){
			console.log('stopped: travelled ' + score + 'm');
		}
	};

	return Engine;
});