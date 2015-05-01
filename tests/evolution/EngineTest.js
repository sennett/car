define(['evolution/Engine', 
	'evolution/RandomGenerationGenerator', 
	'evolution/selection/NoBreeding'], function (Engine, RandomGenerationGenerator, SelectionAlgorithm) {
	
	var randomGeneration = 'random generation';
	var nextGeneration = 'generation from evolution algorithm';
	
	var createEngine = function(){
		spyOn(RandomGenerationGenerator.prototype, 'createRandomGeneration').and.returnValue(randomGeneration);
		spyOn(SelectionAlgorithm.prototype, 'nextGeneration').and.returnValue(nextGeneration);
		this.engine = new Engine(RandomGenerationGenerator.prototype, SelectionAlgorithm.prototype);
	};

	var exerciseNextGeneration = function(){
		this.nextGenerationResult = this.engine.nextGeneration();
	};

	var assertRandomGenerationCreated = function(){
		expect(this.nextGenerationResult).toBe(randomGeneration);
	};
	
	describe('Engine', function () {
		describe('nextGeneration', function(){
			describe('first generation', function(){
				it('creates random generation', function(){
					createEngine.call(this);
					exerciseNextGeneration.call(this);
					assertRandomGenerationCreated.call(this);
				});
			});
			
			describe('subsequent generations', function(){
				it('passes scored generation to the evolution algorithm', function(){
					
				});
				
				it('returns the result from the evolution algorithm', function(){
					
				});
			});
		});
	});
});