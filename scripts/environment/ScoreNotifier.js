define(['underscore', 'util/callbackList'], function(_, callbackList) {
	
	var detectHighScore = function(score){
		if (this.highScore < score){
			this.highScore = score;
			this.onNewGenerationHighScoreCallbacks.callAll(this.currentGenerationId, score);
		}
	};
	
	var generationAverageScore = function(){
		return _.reduce(this.cars, function(memo, car){
			return memo + car.serialise().score
		}, 0) / Object.keys(this.cars).length;
	};
	
	var newCarScoreListener = function(carId, score){
		this.onNewCarScoreCallbacks.callAll(carId, score);
		this.onNewGenerationAverageScoreCallbacks.callAll(this.currentGenerationId, generationAverageScore.call(this));
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
	
	var createKeyBasedCars = function(cars){
		this.cars = {};
		_.each(cars, function(car){
			this.cars[car.serialise().id] = car;
		}, this);
	};

	var addListenersToCars = function () {
		_.each(this.cars, function (car, carId) {
			this.onNewCarCallbacks.callAll(carId, this.currentGenerationId);
			car.onNewScore(newCarScoreListener.bind(this));
			car.onSimulationComplete(this.onCarSimulationCompleteCallbacks.callAll);
		}, this);
	};
	
    var ScoreNotifier = function(renderer){
		this.renderer = renderer;
		this.highScore = 0;
		this.onNewGenerationHighScoreCallbacks = callbackList.create();
		this.onNewGenerationAverageScoreCallbacks = callbackList.create();
		this.onNewCarCallbacks = callbackList.create();
		this.onNewCarScoreCallbacks = callbackList.create();
		this.onCarSimulationCompleteCallbacks = callbackList.create();
		_.bindAll(this, 
			'setCars', 
			'runningGeneration', 
			'onNewGenerationHighScore', 
			'onNewGenerationAverageScore',
			'onNewCar',
			'onNewCarScore',
			'onCarSimulationComplete');
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
		},
		onNewGenerationHighScore: function(cb){
			this.onNewGenerationHighScoreCallbacks.register(cb);
		},
		onNewGenerationAverageScore: function(cb){
			this.onNewGenerationAverageScoreCallbacks.register(cb);
		},
		onNewCar: function(cb){
			this.onNewCarCallbacks.register(cb);
		},
		onNewCarScore: function(cb){
			this.onNewCarScoreCallbacks.register(cb);
		},
		onCarSimulationComplete: function(cb){
			this.onCarSimulationCompleteCallbacks.register(cb);
		}
	});
    
    return ScoreNotifier;
});