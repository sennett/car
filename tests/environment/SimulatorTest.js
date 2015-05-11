define([
	'environment/Simulator', 
	'environment/provider/CarProvider',
	'environment/provider/PhysicsWorldProvider',
	'core/Car',
	'environment/GlobalEndStateDetector',
	'environment/Ticker',
	'environment/renderer/FacadeRenderer',
	'box2dweb'], function (
		Simulator, CarProvider, PhysicsWorldProvider, Car, GlobalEndStateDetector, Ticker, FacadeRenderer, Box2d) {
	
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
				assertAllCarBodiesRegisteredWithGlobalEndStateDetector.call(this);
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

				it('clears all the bodies from the endstate detector', function(){
					createSimulator.call(this);
					exerciseRunGenerationAndStop.call(this);
					assertBodiesClearedOnEndStateDetector.call(this);
				});
			});
		});
	});

	var assertBodiesClearedOnEndStateDetector = function(){
		expect(GlobalEndStateDetector.prototype.clearBodies).toHaveBeenCalled();
	};

	var generation = {};
	var createSimulator = function(){
		spyOn(Car.prototype, 'initialisePhysicsBodies');
		spyOn(Car.prototype, 'destroyPhysicsBodies');
		spyOn(CarProvider.prototype, 'createCar').and.returnValue(Car.prototype);
		spyOn(Box2D.Dynamics.b2World.prototype, 'Step');
		this.fakeWorld = Box2D.Dynamics.b2World.prototype;
		spyOn(PhysicsWorldProvider.prototype, 'getWorld').and.returnValue(this.fakeWorld);
		spyOn(GlobalEndStateDetector.prototype, 'registerBody');
		spyOn(GlobalEndStateDetector.prototype, 'clearBodies');
		spyOn(Ticker.prototype, 'run').and.callFake(function(tick){
			tick();
		});
		spyOn(Ticker.prototype, 'stop');
		spyOn(GlobalEndStateDetector.prototype, 'simulationEnded').and.returnValue(false);
		spyOn(FacadeRenderer.prototype, 'followBody');
		spyOn(FacadeRenderer.prototype, 'render');
		spyOn(FacadeRenderer.prototype, 'reset');

		this.simulator = new Simulator(
			CarProvider.prototype,
			PhysicsWorldProvider.prototype,
			GlobalEndStateDetector.prototype,
			Ticker.prototype,
			FacadeRenderer.prototype);
	};

	var exerciseRunGeneration = function(){
		generation.genomes = [
			'genome one', 'genome two'
		];
		this.onCompleteSpy = jasmine.createSpy('onCompleteSpy');
		this.simulator.runGeneration(generation, this.onCompleteSpy);
	};

	var exerciseRunGenerationAndStop = function(){
		markStoppable.call(this);
		exerciseRunGeneration.call(this);
	};

	var assertCarsInstantiated = function(){
		expect(CarProvider.prototype.createCar.calls.argsFor(0)[0]).toEqual(generation.genomes[0]);
		expect(CarProvider.prototype.createCar.calls.argsFor(1)[0]).toEqual(generation.genomes[1]);
	};

	var assertPhysicsBodiesCreated = function(){
		expect(Car.prototype.initialisePhysicsBodies.calls.argsFor(0)[0]).toEqual(this.fakeWorld);
		expect(Car.prototype.initialisePhysicsBodies.calls.argsFor(1)[0]).toEqual(this.fakeWorld);
	};

	var assertAllCarBodiesRegisteredWithGlobalEndStateDetector = function(){
		expect(GlobalEndStateDetector.prototype.registerBody.calls.count()).toEqual(generation.genomes.length);
	};

	var assertTickerRun = function(){
		expect(Ticker.prototype.run).toHaveBeenCalled();
	};

	var assertRendererPassedFirstCar = function(){
		expect(FacadeRenderer.prototype.followBody.calls.count()).toEqual(1);
	};

	var markStoppable = function(){
		GlobalEndStateDetector.prototype.simulationEnded.and.returnValue(true);
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