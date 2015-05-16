define(['evolution/Engine',
	'evolution/selection/NoBreeding'], function (Engine, SelectionAlgorithm) {
	
	describe('Engine', function () {
		describe('nextGeneration', function(){
			it('calls the callback on new generation', function(){
				createEngine.call(this);
				bindNewGenerationCallback.call(this);
				exerciseNextGeneration.call(this);
				assertNewGenerationCallbackCalled.call(this);
			});
			
			describe('first generation', function(){
				it('creates random generation', function(){
					createEngine.call(this);
					exerciseNextGeneration.call(this);
					assertRandomGenerationCreated.call(this);
				});
			});
			
			describe('subsequent generations', function(){
				it('passes scored generation to the evolution algorithm', function(){
					createEngine.call(this);
					exerciseNextGeneration.call(this);
					exerciseNextGeneration.call(this, scoredGeneration);
					assertScoredGenerationPassedToEvolutionAlgorithm.call(this);
				});
				
				it('returns the result from the evolution algorithm', function(){
					createEngine.call(this);
					exerciseNextGeneration.call(this);
					exerciseNextGeneration.call(this, scoredGeneration);
					assertNextGenerationReturnedFromEvolutionAlgorithm.call(this);
				});
			});
		});
	});
	
	var assertNewGenerationCallbackCalled = function(){
		expect(this.newGenerationCallback).toHaveBeenCalled();
	};
	
	var bindNewGenerationCallback = function(){
		this.newGenerationCallback = jasmine.createSpy('new generation callback');
		this.engine.onNewGeneration = this.newGenerationCallback;
	};
	
	var nextGenerationFromEvolutionAlgorithm = 'generation from evolution algorithm';
	var scoredGeneration = 'scored generation';

	var createEngine = function(){
		spyOn(SelectionAlgorithm.prototype, 'nextGeneration').and.returnValue(nextGenerationFromEvolutionAlgorithm);
		this.engine = new Engine(SelectionAlgorithm.prototype);
	};

	var exerciseNextGeneration = function(){
		this.nextGenerationResult = this.engine.nextGeneration.apply(this.engine, arguments);
	};

	var assertRandomGenerationCreated = function(){
		expect(SelectionAlgorithm.prototype.nextGeneration).not.toHaveBeenCalled();
	};

	var assertScoredGenerationPassedToEvolutionAlgorithm = function(){
		expect(SelectionAlgorithm.prototype.nextGeneration).toHaveBeenCalledWith(scoredGeneration);
	};

	var assertNextGenerationReturnedFromEvolutionAlgorithm = function(){
		expect(this.nextGenerationResult).toBe(nextGenerationFromEvolutionAlgorithm);
	};
});