define(['underscore'], function(_) {
	var getGenomeAndStart = function(){
		this.simulation.start(new Car(this.genome));
	};
	
	var Simulator = function(carProvider, physicsWorldProvider, globalEndStateDetector){
		this.carProvider = carProvider;
		this.world = physicsWorldProvider.getWorld();
		this.globalEndStateDetector = globalEndStateDetector;
	};
	
    Simulator.prototype = _.extend(Simulator.prototype, {
		runGeneration: function(generation, onComplete){
			// todo: remove dep on genomes (construct car from serialised domain obj)
			var cars = _.map(generation.genomes, function(genome){
				var car = this.carProvider.createCar(genome);
				car.initialisePhysicsBodies(this.world);
				this.globalEndStateDetector.registerBody(car.body);
				return car;
			}.bind(this));
			
			
		}
	});
    
    return Simulator;
});