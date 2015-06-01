define(['underscore', 'environment/groundData'], function(_, groundData) {
	
	var end = function(){
		this.ticker.stop();
		this.renderer.reset();
		_.each(this.cars, function(car){
			car.destroyPhysicsBodies();
		});
		this.onComplete(this.generation);
	};

	var tick = function(){
		if (this.endStateDetector.simulationEnded())
			end.call(this);
		this.world.Step(
			1 / 60   //frame-rate
			,  10       //velocity iterations
			,  10       //position iterations
		);
		_.each(this.cars, function(car){
			car.registerTick();
		});
		this.renderer.render();
		this.world.ClearForces();
	};
	
	var Simulator = function(physicsWorldProvider, endStateDetector, ticker, renderer, scoreNotifier, ground){
		this.world = physicsWorldProvider.getWorld();
		this.endStateDetector = endStateDetector;
		this.ticker = ticker;
		this.renderer = renderer;
		this.scoreNotifier = scoreNotifier;
		ground.setData(groundData);
		ground.initialisePhysicsBodies(this.world);
		this.renderer.initialise(this.world);
	};
	
    Simulator.prototype = _.extend(Simulator.prototype, {
		runGeneration: function(generation, onComplete){
			this.generation = generation;
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