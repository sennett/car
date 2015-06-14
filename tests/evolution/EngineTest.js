define(['evolution/Engine',
	'environment/ScoreNotifier',
	'domain/generation'], function (Engine, ScoreNotifier, generation) {
	
	describe('Engine', function () {
		describe('nextGeneration', function(){
			it('calls the callback on new generation', function(){
				createEngine.call(this);
				bindNewGenerationCallback.call(this);
				exerciseFirstGeneration.call(this);
				assertNewGenerationCallbackCalledFirstTime.call(this);
			});

			it('calls the callback on subsequent generations with generation number', function(){
				createEngine.call(this);
				exerciseNextGeneration.call(this);
				bindNewGenerationCallback.call(this);
				exerciseNextGeneration.call(this);
				assertNewGenerationCallbackCalledSecondTime.call(this);
			});
			
			it('updates the score notifier of the current generation', function(){
				createEngine.call(this);
				exerciseNextGeneration.call(this);
				assertScoreNotifierUpdatedWithGeneration.call(this);
			});
			
			describe('updating the mutation rate', function(){
				it('passes the mutation rate to the generation', function(){
					createEngine.call(this);
					exerciseUpdateMutationRate.call(this);
					exerciseSubsequentGeneration.call(this);
					assertGenerationUpdatedWithMutationRate.call(this);
				});

				it('informs the view of the change', function(){
					createEngine.call(this);
					exerciseUpdateMutationRate.call(this);
					exerciseSubsequentGeneration.call(this);
					assertViewInformedOfMutationRateUpdate.call(this);
				});
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
					exerciseFirstGeneration.call(this);
					exerciseSubsequentGeneration.call(this);
					assertScoredGenerationPassedToEvolutionAlgorithm.call(this);
				});
				
				it('returns the result from the evolution algorithm', function(){
					createEngine.call(this);
					exerciseFirstGeneration.call(this);
					exerciseSubsequentGeneration.call(this);
					assertNextGenerationReturnedFromEvolutionAlgorithm.call(this);
				});
			});
		});
	});
	
	var assertViewInformedOfMutationRateUpdate = function(){
		expect(this.updateMutationRateCompleteSpy.success)
			.toHaveBeenCalledWith('New mutation rate will be applied from next generation');
	};
	
	var exerciseSubsequentGeneration = function(){
		exerciseNextGeneration.call(this, generation);
	};
	
	var exerciseFirstGeneration = function(){
		exerciseNextGeneration.call(this);
	};
	
	var assertGenerationUpdatedWithMutationRate = function(){
		expect(generation.createViaRoulette).toHaveBeenCalledWith(0.1);
	};
	
	var exerciseUpdateMutationRate = function(){
		this.updateMutationRateCompleteSpy = 
			jasmine.createSpyObj('updateMutationRateCompleteSpy', ['success', 'fail']);
		this.engine.updateMutationRate(0.1, this.updateMutationRateCompleteSpy);
	};
	
	var assertScoreNotifierUpdatedWithGeneration = function(){
		expect(ScoreNotifier.prototype.runningGeneration).toHaveBeenCalledWith(1);
	};
	
	var assertNewGenerationCallbackCalledFirstTime = function(){
		assertNewGenerationCallbackCalledWith.call(this, 1);
	};

	var assertNewGenerationCallbackCalledSecondTime = function(){
		assertNewGenerationCallbackCalledWith.call(this, 2);
	};
	
	var assertNewGenerationCallbackCalledWith = function(generationNumber){
		var generationId = generationNumber;
		expect(this.newGenerationCallback).toHaveBeenCalledWith(generationId, generationNumber);
	};
	
	var bindNewGenerationCallback = function(){
		this.newGenerationCallback = jasmine.createSpy('new generation callback');
		this.engine.onNewGeneration = this.newGenerationCallback;
	};
	
	var nextGenerationFromEvolutionAlgorithm = 'next generation from evolution algorithm';
	
	var createEngine = function(){
		spyOn(generation, 'createViaRoulette').and.returnValue(nextGenerationFromEvolutionAlgorithm);
		spyOn(ScoreNotifier.prototype, 'runningGeneration');
		this.engine = new Engine(ScoreNotifier.prototype);
	};

	var exerciseNextGeneration = function(){
		this.nextGenerationResult = this.engine.nextGeneration.apply(this.engine, arguments);
	};

	var assertRandomGenerationCreated = function(){
		expect(generation.createViaRoulette).not.toHaveBeenCalled();
	};

	var assertScoredGenerationPassedToEvolutionAlgorithm = function(){
		expect(generation.createViaRoulette).toHaveBeenCalled();
	};

	var assertNextGenerationReturnedFromEvolutionAlgorithm = function(){
		expect(this.nextGenerationResult).toBe(nextGenerationFromEvolutionAlgorithm);
	};
});