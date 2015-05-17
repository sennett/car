define(['underscore'], function(_) {
	var newCarScoreListener = function(){
		this.onNewCarScore.apply(null, arguments);
	};
	
    var ScoreNotifier = function(generationsUiService){
		this.generationsUiService = generationsUiService;
	};
    
    ScoreNotifier.prototype = _.extend(ScoreNotifier.prototype, {
		setCars: function(cars){
			if(_.isUndefined(this.currentGenerationId))
				throw 'generation not set';
			this.cars = cars;
			_.each(this.cars, function(car){
				this.onNewCar(this.currentGenerationId, car.serialise().id);
				car.onNewScore(newCarScoreListener.bind(this));
			}, this);
		},
		notifyScores: function(){
			throw 'not implemeneted';
		},
		runningGeneration: function(generationId){
			this.currentGenerationId = generationId;
		}
	});
    
    return ScoreNotifier;
});