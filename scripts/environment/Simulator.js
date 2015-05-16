define(['underscore'], function(_) {
	
	var end = function(){
		this.scoreNotifier.clearCars();
		this.ticker.stop();
		this.renderer.reset();
		_.each(this.cars, function(car){
			car.destroyPhysicsBodies();
		});
		this.onComplete();
	};

	var tick = function(){
		if (this.endStateDetector.simulationEnded())
			end.call(this);
		this.world.Step(
			1 / 60   //frame-rate
			,  10       //velocity iterations
			,  10       //position iterations
		);
		this.scoreNotifier.notifyScores();
		this.renderer.render();
		_.each(this.onUpdateScore, function(cb){
			cb(getScore.call(this));
		}, this);
		this.world.ClearForces();
	};
	
	var Simulator = function(physicsWorldProvider, endStateDetector, ticker, renderer, scoreNotifier){
		this.world = physicsWorldProvider.getWorld();
		this.endStateDetector = endStateDetector;
		this.ticker = ticker;
		this.renderer = renderer;
		this.scoreNotifier = scoreNotifier;
	};
	
    Simulator.prototype = _.extend(Simulator.prototype, {
		runGeneration: function(generation, onComplete){
			this.onComplete = onComplete;
			// todo: remove dep on genomes (construct car from serialised domain obj)
			this.cars = _.map(generation.genomes, function(genome){
				var car = genome.createCar();
				car.initialisePhysicsBodies(this.world);
				return car;
			}.bind(this));
			
			this.scoreNotifier.setCars(this.cars);
			this.endStateDetector.setCars(this.cars);
			this.renderer.followBody(_.first(this.cars).body);
			this.ticker.run(tick.bind(this));
		}
	});
    
    return Simulator;
});