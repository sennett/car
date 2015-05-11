define(['underscore'], function(_) {
	var getGenomeAndStart = function(){
		this.simulation.start(new Car(this.genome));
	};
	
	var end = function(){
		this.ticker.stop();
		this.renderer.reset();
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
	
	var Simulator = function(carProvider, physicsWorldProvider, globalEndStateDetector, ticker, renderer){
		this.carProvider = carProvider;
		this.world = physicsWorldProvider.getWorld();
		this.globalEndStateDetector = globalEndStateDetector;
		this.ticker = ticker;
		this.renderer = renderer;
	};
	
    Simulator.prototype = _.extend(Simulator.prototype, {
		runGeneration: function(generation, onComplete){
			this.onComplete = onComplete;
			// todo: remove dep on genomes (construct car from serialised domain obj)
			this.cars = _.map(generation.genomes, function(genome){
				var car = this.carProvider.createCar(genome);
				car.initialisePhysicsBodies(this.world);
				this.globalEndStateDetector.registerBody(car.body);
				return car;
			}.bind(this));
			
			this.renderer.followBody(_.first(this.cars).body);
			
			this.ticker.run(tick.bind(this));
		}
	});
    
    return Simulator;
});