define(['underscore'], function (_) {
	var generationSize = 20;

	var createNextGeneration = function(){
		var scoreSum = _.reduce(this.scores,function(memo, num){ return memo + num; }, 0);
		var averageScore = scoreSum / this.scores.length;
		this.currentGenomes = this.evolutionAlgorithm.nextGeneration(this.currentGenomes, generationSize);
		this.unsimulatedGenome = 0;
		this.currentGeneration++;
		this.scores = [];
		console.log("generation: " + this.currentGeneration + ', average score: ' + averageScore);
	};

	var Engine = function(randomGenomeGenerator, evolutionAlgorithm){
		this.randomGenomeGenerator = randomGenomeGenerator;
		this.evolutionAlgorithm = evolutionAlgorithm;
		this.currentGeneration = 0;
		this.scores = [];

		for (var i = 0; i < generationSize; i++)
			this.currentGenomes.push(this.randomGenomeGenerator.getOne());
	};

	Engine.prototype = {
		currentGenomes: [],
		unsimulatedGenome: 0,
		nextGenome: function(){
			if (this.unsimulatedGenome === generationSize)
				createNextGeneration.call(this);

			var useGenome = this.currentGenomes[this.unsimulatedGenome];
			this.unsimulatedGenome++;
			return useGenome;
		},
		registerScore: function(score, forGenome){
			forGenome.score = score;
			this.scores.push(score);
		}
	};

	return Engine;
});