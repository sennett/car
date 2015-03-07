define(['underscore'], function (_) {

	var createNextGeneration = function(){
		var scoreSum = _.reduce(this.scores,function(memo, num){ return memo + num; }, 0);
		var averageScore = scoreSum / this.scores.length;
		this.currentGenomes = this.evolutionAlgorithm.nextGeneration(this.currentGenomes, this.generationSize);
		this.genomesSimulatedThisGeneration = 0;
		this.currentGeneration++;
		this.scores = [];
		this.onStartGeneration();
		console.log("generation: " + this.currentGeneration + ', average score: ' + averageScore);
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
		generationSize: 2,
		currentGenomes: [],
		genomesSimulatedThisGeneration: 0,
		nextGenome: function(){
			if (this.currentGeneration == 0)
				createFirstGeneration.call(this);

			if (this.genomesSimulatedThisGeneration === this.generationSize)
				createNextGeneration.call(this);

			this.onStartMember(this.genomesSimulatedThisGeneration + 1);

			var useGenome = this.currentGenomes[this.genomesSimulatedThisGeneration];
			this.genomesSimulatedThisGeneration++;
			return useGenome;
		},
		registerScore: function(score, forGenome){
			forGenome.score = score;
			this.scores.push(score);
			var printHighscore = false;
			if (score > this.highScore) {
				this.highScore = score;
				printHighscore = true;
			}
			this.printProgress(printHighscore);
		},
		printProgress: function(printHighscore){
			var output = "|";
			for (var i = 0; i < this.genomesSimulatedThisGeneration; i++)
				output += ".";
			for (i = this.genomesSimulatedThisGeneration; i < this.generationSize; i++)
				output += " ";
			output += '|';
			if (printHighscore)
				output += " new highscore: " + this.highScore;
			console.log(output);
		}
	});

	return Engine;
});