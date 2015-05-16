define(['underscore'], function(_) {
    var ScoreNotifier = function(generationsUiService){
		this.generationsUiService = generationsUiService;
	};
    
    ScoreNotifier.prototype = _.extend(ScoreNotifier.prototype, {
		setCars: function(cars){
			this.cars = cars;
			_.each(this.cars, function(car){
				this.onNewCar(this.currentGenerationId, car.serialise().id);
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