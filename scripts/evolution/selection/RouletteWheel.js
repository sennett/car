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

	var selectGenome = function(genomes){
		var selectGenomeAt = Math.random();
		var lastNumber = 0;
		var returnableGenome;
		_.each(genomes, function(genome){
			if (!returnableGenome && selectGenomeAt >= 0 && selectGenomeAt < genome.relativeScore + lastNumber){
				returnableGenome = genome;
			}
			lastNumber += genome.relativeScore;
		});

		if (!returnableGenome)
			throw "could not select genome at " + selectGenomeAt;

		return returnableGenome;
	};

	var removeGenome = function(genomes, removableGenome){
		var newGenomes = [];
		_.each(genomes, function(genome){
			if (genome != removableGenome)
				newGenomes.push(genome);
		});
		calculateRelativeScores(newGenomes);
		return newGenomes;
	};

	var Roulette = function(genomeMater){
		this.genomeMater = genomeMater;
	};

	Roulette.prototype = {
		nextGeneration: function(genomes){
			var totalGenomes = genomes.length;
			var newGenomes = [];
			calculateRelativeScores(genomes);

			for (var i = 0; i < totalGenomes; i++){
				var genome1 = selectGenome(genomes);
				genomes = removeGenome(genomes, genome1);
				var genome2 = selectGenome(genomes);
				var mated = this.genomeMater.mate(genome1, genome2);
				newGenomes.push(mated.one, mated.two);
			}

			return newGenomes;
		}
	};

	return Roulette;
});