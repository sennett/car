define(['underscore'], function(_) {
	var getGenomeAndStart = function(){
		this.simulation.start(new Car(this.genome));
	};
	
	var Simulator = function(carProvider, physicsWorldProvider){
		this.carProvider = carProvider;
		this.world = physicsWorldProvider.getWorld();
	};
	
    Simulator.prototype = _.extend(Simulator.prototype, {
		runGeneration: function(generation, onComplete){
			// todo: remove dep on genomes (construct car from serialised domain obj)
			var cars = _.map(generation.genomes, function(genome){
				var car = this.carProvider.createCar(genome);
				car.initialisePhysicsBodies(this.world);
				return car;
			}.bind(this));
		}
	});
    
    return Simulator;
});