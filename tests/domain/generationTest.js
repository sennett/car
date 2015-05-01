define(['domain/generation', 'core/appConfig'], function (generation, config) {
	var exerciseRandomGeneration = function(){
		this.generation = generation.createRandom();
	};
	
	var assertGenerationSize = function(){
		expect(this.generation.serialise().genomes.length).toEqual(config.generationSize);
	};
	
	describe('generation', function () {
		describe('createRandom', function(){
			it('creates the correct number of random genomes', function(){
				exerciseRandomGeneration.call(this);
				assertGenerationSize.call(this);
			});
		});
	});
});