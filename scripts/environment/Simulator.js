define(['underscore'], function(_) {
	var getGenomeAndStart = function(){
		this.simulation.start(new Car(this.genome));
	};
	
	var Simulator = function(carProvider){
		this.carProvider = carProvider;
	};
	
    Simulator.prototype = _.extend(Simulator.prototype, {
		runGeneration: function(generation, onComplete){
			// todo: remove dep on genomes (construct car from serialised domain obj)
			var cars = _.map(generation.genomes, function(genome){
				return this.carProvider.createCar(genome);
			}.bind(this));
		}
	});
    
    return Simulator;
});