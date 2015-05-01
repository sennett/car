define(['underscore', 'core/appConfig', 'domain/genome'], function(_, config, genome) {
    return {
		genomes: [],
		createRandom: function(){
			var newGeneration = _.extend(this, {});
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
		}
	};
});