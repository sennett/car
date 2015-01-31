define(['underscore'], function (_) {

	var calculateRelativeScores = function(genomes){
		var totalScore = 0;
		_.each(genomes, function(genome){
			totalScore += genome.score;
		});
		_.each(genomes, function(genome){
			genome.relativeScore = genome.score / totalScore;
		});
	};

	var Roulette = function(){};
	Roulette.prototype = {
		nextGeneration: function(genomes){
			calculateRelativeScores(genomes);
			return genomes;
		}
	};
	return Roulette;
});