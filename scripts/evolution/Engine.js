define(['underscore'], function (_) {

	var createNextGeneration = function(){
		var scoreSum = _.reduce(this.scores,function(memo, num){ return memo + num; }, 0);
		var averageScore = scoreSum / this.scores.length;
		this.onGenerationComplete(this.currentGeneration, averageScore);
		this.currentGenomes = this.evolutionAlgorithm.nextGeneration(this.currentGenomes, this.generationSize);
		this.genomesSimulatedThisGeneration = 0;
		this.currentGeneration++;
		this.scores = [];
		this.onStartGeneration(this.currentGeneration);
	};

	var createFirstGeneration = function(){
		for (var i = 0; i < this.generationSize; i++)
			this.currentGenomes.push(this.randomGenomeGenerator.getOne());
		this.currentGeneration++;
		this.onStartGeneration(this.currentGeneration);
	};
	
	var getGenomeId = function(){
		return this.currentGeneration + '-' + this.genomesSimulatedThisGeneration;
	}

	var Engine = function(randomGenomeGenerator, evolutionAlgorithm){
		this.randomGenomeGenerator = randomGenomeGenerator;
		this.evolutionAlgorithm = evolutionAlgorithm;
		this.currentGeneration = 0;
		this.scores = [];
		this.highScore = 0;
	};

	Engine.prototype = _.extend(Engine.prototype, {
		generationSize: 20,
		currentGenomes: [],
		genomesSimulatedThisGeneration: 0,
		nextGenome: function(){
			if (this.currentGeneration == 0)
				createFirstGeneration.call(this);

			if (this.genomesSimulatedThisGeneration === this.generationSize)
				createNextGeneration.call(this);

			var useGenome = this.currentGenomes[this.genomesSimulatedThisGeneration];
			this.genomesSimulatedThisGeneration++;

			this.onRunningMember(getGenomeId.call(this), this.currentGeneration);

			return useGenome;
		},
		registerScore: function(score, forGenome){
			forGenome.score = score;
			this.scores.push(score);
			this.onNewCarScore(getGenomeId.call(this), score);
			this.onCarSimulationComplete(getGenomeId.call(this));
			if (score > this.highScore) {
				this.highScore = score;
				this.onHighscore(this.currentGeneration, this.highScore);
			}
		}
	});

	return Engine;
});