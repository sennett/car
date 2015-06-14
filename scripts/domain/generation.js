define(['underscore', 'core/appConfig', 'domain/genome'], function(_, config, genome) {
	var resetPreviousInstantiation = function(){
		this.genomes = [];
	};
    return {
		genomes: [],
		createRandom: function(){
			var newGeneration = this.createNew();
			for (var i = 0; i < config.generationSize; i++)
				newGeneration.genomes.push(genome.createRandom());
			return newGeneration;
		},
		serialise: function(){
			return {
				genomes: _.map(this.genomes, function(genome) {
					return genome.serialise();
				})
			}
		},
		createNew: function(){
			var newGeneration = _.extend({}, this);
			resetPreviousInstantiation.call(newGeneration);
			return newGeneration;
		},
		createViaRoulette: function(){
			
		}
	};
});