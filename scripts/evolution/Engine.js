define(['underscore'], function (_) {

	var createNextGeneration = function(){
		var scoreSum = _.reduce(this.scores,function(memo, num){ return memo + num; }, 0);
		var averageScore = scoreSum / this.scores.length;
		this.onGenerationComplete(averageScore);
		this.currentGenomes = this.evolutionAlgorithm.nextGeneration(this.currentGenomes, this.generationSize);
		this.genomesSimulatedThisGeneration = 0;
		this.currentGeneration++;
		this.scores = [];
		this.onStartGeneration();
	};

	var createFirstGeneration = function(){
		for (var i = 0; i < this.generationSize; i++)
			this.currentGenomes.push(this.randomGenomeGenerator.getOne());
		this.currentGeneration++;
		this.onStartGeneration();
	};

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
			else
				this.onMemberRan(this.genomesSimulatedThisGeneration);

			if (this.genomesSimulatedThisGeneration === this.generationSize)
				createNextGeneration.call(this);

			var useGenome = this.currentGenomes[this.genomesSimulatedThisGeneration];
			this.genomesSimulatedThisGeneration++;

			this.onRunningMember(this.genomesSimulatedThisGeneration);

			return useGenome;
		},
		registerScore: function(score, forGenome){
			forGenome.score = score;
			this.scores.push(score);
			var printHighscore = false;
			if (score > this.highScore) {
				this.highScore = score;
				this.onHighscore(this.highScore);
			}
		}
	});

	return Engine;
});