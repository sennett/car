define(['underscore', 'core/Car'], function(_, Car) {
	var getGenomeAndStart = function(){
		this.simulation.start(new Car(this.genome));
	};
	
	var Simulator = function(){};
    
	
	
    Simulator.prototype = _.extend(Simulator.prototype, {
		runGeneration: function(generation, onComplete){
			throw 'not implemented';
		}
	});
    
    return Simulator;
});