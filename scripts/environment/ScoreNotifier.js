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
		updateRenderer.call(this);
	};
	
	var updateRenderer = function(){
		
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
	
    var ScoreNotifier = function(){
		this.highScore = 0;
	};
	
	ScoreNotifier.prototype = _.extend(ScoreNotifier.prototype, {
		setCars: function(cars){
			if(_.isUndefined(this.currentGenerationId))
				throw 'generation not set';
			createKeyBasedCars.call(this, cars);
			addListenersToCars.call(this);
		},
		runningGeneration: function(generationId){
			this.currentGenerationId = generationId;
		}
	});
    
    return ScoreNotifier;
});