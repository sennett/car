define(['underscore'], function(_) {
	var getGenomeAndStart = function(){
		this.genome = this.evolutionEngine.nextGenome();
		this.simulation.start(new Car(this.genome));
	};
	
	var Simulator = function(){};
    
	
	
    Simulator.prototype = _.extend(Simulator.prototype, {
		runGeneration: function(){
			throw 'not implemented';
		}
	});
    
    return Simulator;
});