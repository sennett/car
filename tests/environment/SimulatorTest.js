define(['environment/Simulator', 'environment/provider/CarProvider'], function (Simulator, CarProvider) {
	var generation = {};
	var createSimulator = function(){
		spyOn(CarProvider.prototype, 'createCar');
		this.simulator = new Simulator(CarProvider.prototype);
	};
	
	var exerciseRunGeneration = function(){
		generation.genomes = [
			'genome one', 'genome two'
		]
		this.simulator.runGeneration(generation);
	};
	
	var assertCarsInstantiated = function(){
		expect(CarProvider.prototype.createCar.calls.argsFor(0)[0]).toEqual(generation.genomes[0]);
		expect(CarProvider.prototype.createCar.calls.argsFor(1)[0]).toEqual(generation.genomes[1]);
	};
	
	describe('Simulator', function () {
		it('instantiates the cars', function(){
			createSimulator.call(this);
			exerciseRunGeneration.call(this);
			assertCarsInstantiated.call(this);
		});
	});
});