define([
	'environment/Simulator', 
	'environment/provider/PhysicsWorldProvider',
	'domain/Car',
	'environment/EndStateDetector',
	'environment/Ticker',
	'environment/renderer/FacadeRenderer',
	'box2dweb',
	'domain/genome',
	'environment/ScoreNotifier',
	'environment/Ground'], function (
		Simulator, PhysicsWorldProvider, Car, EndStateDetector, Ticker, FacadeRenderer, Box2d, genome, ScoreNotifier, Ground) {
	
	describe('Simulator', function () {
		describe('runGeneration', function(){
			it('instantiates the cars', function(){
				createSimulator.call(this);
				exerciseRunGeneration.call(this);
				assertCarsInstantiated.call(this);
			});
			
			it('creates the cars\' physics bodies in the world', function(){
				createSimulator.call(this);
				exerciseRunGeneration.call(this);
				assertPhysicsBodiesCreated.call(this);
			});
			
			it('registers all bodies with the global end state detector', function(){
				createSimulator.call(this);
				exerciseRunGeneration.call(this);
				assertAllCarBodiesRegisteredWithEndStateDetector.call(this);
			});
			
			it('starts the ticker', function(){
				createSimulator.call(this);
				exerciseRunGeneration.call(this);
				assertTickerRun.call(this);
			});
			
			it('registers first car body with the renderer', function(){
				createSimulator.call(this);
				exerciseRunGeneration.call(this);
				assertRendererPassedFirstCar.call(this);
			});
			
			it('passes cars to the score notifier', function(){
				createSimulator.call(this);
				exerciseRunGeneration.call(this);
				assertScoreNotifierPassedCars.call(this);
			});
			
			describe('ending the simulation', function(){
				it('stops the ticker', function(){
					createSimulator.call(this);
					exerciseRunGenerationAndStop.call(this);
					assertTickerStopped.call(this);
				});
				
				it('resets the renderer', function(){
					createSimulator.call(this);
					exerciseRunGenerationAndStop.call(this);
					assertRendererReset.call(this);
				});
				
				it('destroys the cars\' physics bodies', function(){
					createSimulator.call(this);
					exerciseRunGenerationAndStop.call(this);
					assertCarBodiesDestroyed.call(this);
				});

				it('calls the stop callback', function(){
					createSimulator.call(this);
					exerciseRunGenerationAndStop.call(this);
					assertStopCallbackCalled.call(this);
				});
			});
		});
	});
	
	var assertScoreNotifierPassedCars = function(){
		expect(ScoreNotifier.prototype.setCars).toHaveBeenCalledWith([Car.prototype, Car.prototype]);
	};

	var generation = {};
	var createSimulator = function(){
		spyOn(Car.prototype, 'initialisePhysicsBodies');
		spyOn(Car.prototype, 'destroyPhysicsBodies');
		spyOn(genome, 'createCar').and.returnValue(Car.prototype);
		spyOn(Box2D.Dynamics.b2World.prototype, 'Step');
		this.fakeWorld = Box2D.Dynamics.b2World.prototype;
		spyOn(PhysicsWorldProvider.prototype, 'getWorld').and.returnValue(this.fakeWorld);
		spyOn(EndStateDetector.prototype, 'setCars');
		spyOn(Ticker.prototype, 'run').and.callFake(function(tick){
			tick();
		});
		spyOn(Ticker.prototype, 'stop');
		spyOn(EndStateDetector.prototype, 'simulationEnded').and.returnValue(false);
		spyOn(FacadeRenderer.prototype, 'followBody');
		spyOn(FacadeRenderer.prototype, 'render');
		spyOn(FacadeRenderer.prototype, 'reset');
		spyOn(FacadeRenderer.prototype, 'initialise');
		spyOn(ScoreNotifier.prototype, 'setCars');
		spyOn(Ground.prototype, 'setData');
		spyOn(Ground.prototype, 'initialisePhysicsBodies');
		this.simulator = new Simulator(
			PhysicsWorldProvider.prototype,
			EndStateDetector.prototype,
			Ticker.prototype,
			FacadeRenderer.prototype,
			ScoreNotifier.prototype,
			Ground.prototype);
	};

	var exerciseRunGeneration = function(){
		generation.genomes = [
			genome, genome
		];
		this.onCompleteSpy = jasmine.createSpy('onCompleteSpy');
		this.simulator.runGeneration(generation, this.onCompleteSpy);
	};

	var exerciseRunGenerationAndStop = function(){
		markStoppable.call(this);
		exerciseRunGeneration.call(this);
	};

	var assertCarsInstantiated = function(){
		expect(genome.createCar.calls.count()).toEqual(generation.genomes.length);
	};

	var assertPhysicsBodiesCreated = function(){
		expect(Car.prototype.initialisePhysicsBodies.calls.argsFor(0)[0]).toEqual(this.fakeWorld);
		expect(Car.prototype.initialisePhysicsBodies.calls.argsFor(1)[0]).toEqual(this.fakeWorld);
	};

	var assertAllCarBodiesRegisteredWithEndStateDetector = function(){
		expect(EndStateDetector.prototype.setCars).toHaveBeenCalledWith([Car.prototype, Car.prototype]);
	};

	var assertTickerRun = function(){
		expect(Ticker.prototype.run).toHaveBeenCalled();
	};

	var assertRendererPassedFirstCar = function(){
		expect(FacadeRenderer.prototype.followBody.calls.count()).toEqual(1);
	};

	var markStoppable = function(){
		EndStateDetector.prototype.simulationEnded.and.returnValue(true);
	};

	var assertTickerStopped = function() {
		expect(Ticker.prototype.stop).toHaveBeenCalled();
	};

	var assertRendererReset = function(){
		expect(FacadeRenderer.prototype.reset).toHaveBeenCalled();
	};

	var assertCarBodiesDestroyed = function(){
		expect(Car.prototype.destroyPhysicsBodies.calls.count()).toEqual(2);
	};

	var assertStopCallbackCalled = function(){
		expect(this.onCompleteSpy).toHaveBeenCalled();
	};
});