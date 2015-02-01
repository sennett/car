define(function () {
	var generationSize = 20;

	var createNextGeneration = function(){
		this.currentGenomes = this.evolutionAlgorithm.nextGeneration(this.currentGenomes);
		this.unsimulatedGenome = 0;
	};

	var Engine = function(randomGenomeGenerator, evolutionAlgorithm){
		this.randomGenomeGenerator = randomGenomeGenerator;
		this.evolutionAlgorithm = evolutionAlgorithm;

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
			console.log('stopped: travelled ' + score + 'm');
		}
	};

	return Engine;
});