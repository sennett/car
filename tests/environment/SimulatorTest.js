define(['environment/Simulator', 
	'environment/provider/CarProvider',
	'environment/provider/PhysicsWorldProvider',
	'core/Car',
	'environment/GlobalEndStateDetector'], function (
		Simulator, CarProvider, PhysicsWorldProvider, Car, GlobalEndStateDetector) {
	var generation = {};
	var createSimulator = function(){
		spyOn(Car.prototype, 'initialisePhysicsBodies');
		spyOn(CarProvider.prototype, 'createCar').and.returnValue(Car.prototype);
		this.fakeWorld = 'my fake world';
		spyOn(PhysicsWorldProvider.prototype, 'getWorld').and.returnValue(this.fakeWorld);
		spyOn(GlobalEndStateDetector.prototype, 'registerBody');
		
		this.simulator = new Simulator(
			CarProvider.prototype, 
			PhysicsWorldProvider.prototype, 
			GlobalEndStateDetector.prototype);
	};
	
	var exerciseRunGeneration = function(){
		generation.genomes = [
			'genome one', 'genome two'
		];
		this.simulator.runGeneration(generation);
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
				
			});
			
			it('registers first car body with the renderer', function(){
				
			});
		});
	});
});