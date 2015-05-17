define(['underscore'], function(_) {
	
	var generationAverageScore = function(){
		return _.reduce(this.cars, function(memo, car){
			return memo + car.serialise().score
		}, 0) / this.cars.length;
	};
	
	var newCarScoreListener = function(carId, score){
		this.onNewCarScore(carId, score);
		this.onNewGenerationAverageScore(this.currentGenerationId, generationAverageScore.call(this));
		this.onNewGenerationHighScore(this.currentGenerationId, score);
	};
	
	var simulationCompleteListener = function(){
		this.onCarSimulationComplete.apply(null, arguments);
	};
	
    var ScoreNotifier = function(){
	};
    
    ScoreNotifier.prototype = _.extend(ScoreNotifier.prototype, {
		setCars: function(cars){
			if(_.isUndefined(this.currentGenerationId))
				throw 'generation not set';
			this.cars = cars;
			_.each(this.cars, function(car){
				this.onNewCar(this.currentGenerationId, car.serialise().id);
				car.onNewScore(newCarScoreListener.bind(this));
				car.onSimulationComplete(simulationCompleteListener.bind(this));
			}, this);
		},
		runningGeneration: function(generationId){
			this.currentGenerationId = generationId;
		}
	});
    
    return ScoreNotifier;
});