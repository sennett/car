define(['underscore'], function(_) {
	
	var end = function(){
		this.ticker.stop();
		this.renderer.reset();
		this.globalEndStateDetector.clearBodies();
		_.each(this.cars, function(car){
			car.destroyPhysicsBodies();
		});
		this.onComplete();
	};

	var tick = function(){
		if (this.globalEndStateDetector.simulationEnded())
			end.call(this);
		this.world.Step(
			1 / 60   //frame-rate
			,  10       //velocity iterations
			,  10       //position iterations
		);
		this.renderer.render();
		_.each(this.onUpdateScore, function(cb){
			cb(getScore.call(this));
		}, this);
		this.world.ClearForces();
	};
	
	var Simulator = function(physicsWorldProvider, globalEndStateDetector, ticker, renderer, scoreNotifier){
		this.world = physicsWorldProvider.getWorld();
		this.globalEndStateDetector = globalEndStateDetector;
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
				this.globalEndStateDetector.registerBody(car.body);
				return car;
			}.bind(this));
			
			this.scoreNotifier.setCars(this.cars);
			
			this.renderer.followBody(_.first(this.cars).body);
			
			this.ticker.run(tick.bind(this));
		}
	});
    
    return Simulator;
});