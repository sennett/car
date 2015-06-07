define(['underscore'], function(_) {
	
	var detectHighScore = function(score){
		if (this.highScore < score){
			this.highScore = score;
			this.onNewGenerationHighScore(this.currentGenerationId, score);
		}
	};
	
	var generationAverageScore = function(){
		return _.reduce(this.cars, function(memo, car){
			return memo + car.serialise().score
		}, 0) / Object.keys(this.cars).length;
	};
	
	var newCarScoreListener = function(carId, score){
		this.onNewCarScore(carId, score);
		this.onNewGenerationAverageScore(this.currentGenerationId, generationAverageScore.call(this));
		detectHighScore.call(this, score);
		updateRenderer.call(this, carId, score);
	};
	
	var updateRenderer = function(carId, score){
		var body = this.cars[carId].body;
		if (this.highestScoreForCurrentCars < score && this.currentBody != body) {
			this.renderer.reset();
			this.renderer.followBody(body);
			this.currentBody = body;
			this.highestScoreForCurrentCars = score;
		}
	};
	
	var simulationCompleteListener = function(){
		this.onCarSimulationComplete.apply(null, arguments);
	};
	
	var createKeyBasedCars = function(cars){
		this.cars = {};
		_.each(cars, function(car){
			this.cars[car.serialise().id] = car;
		}, this);
	};

	var addListenersToCars = function () {
		_.each(this.cars, function (car, carId) {
			this.onNewCar(carId, this.currentGenerationId);
			car.onNewScore(newCarScoreListener.bind(this));
			car.onSimulationComplete(simulationCompleteListener.bind(this));
		}, this);
	};
	
    var ScoreNotifier = function(renderer){
		this.renderer = renderer;
		this.highScore = 0;
		_.bindAll(this, 'setCars', 'runningGeneration')
	};
	
	ScoreNotifier.prototype = _.extend(ScoreNotifier.prototype, {
		setCars: function(cars){
			if(_.isUndefined(this.currentGenerationId))
				throw 'generation not set';
			this.highestScoreForCurrentCars = 0;
			createKeyBasedCars.call(this, cars);
			addListenersToCars.call(this);
		},
		runningGeneration: function(generationId){
			this.currentGenerationId = generationId;
		}
	});
    
    return ScoreNotifier;
});