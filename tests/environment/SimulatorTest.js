define(['environment/Simulator', 
	'environment/provider/CarProvider',
	'environment/provider/PhysicsWorldProvider',
	'core/Car'], function (Simulator, CarProvider, PhysicsWorldProvider, Car) {
	var generation = {};
	var createSimulator = function(){
		spyOn(Car.prototype, 'initialisePhysicsBodies');
		spyOn(CarProvider.prototype, 'createCar').and.returnValue(Car.prototype);
		this.fakeWorld = 'my fake world';
		spyOn(PhysicsWorldProvider.prototype, 'getWorld').and.returnValue(this.fakeWorld);
		this.simulator = new Simulator(CarProvider.prototype, PhysicsWorldProvider.prototype);
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
		});
	});
});