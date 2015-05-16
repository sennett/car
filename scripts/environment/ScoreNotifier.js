define(['underscore'], function(_) {
    var ScoreNotifier = function(generationsUiService){
		this.generationsUiService = generationsUiService;
	};
    
    ScoreNotifier.prototype = _.extend(ScoreNotifier.prototype, {
		setCars: function(cars){
			throw 'not implemented';
		},
		notifyScores: function(){
			throw 'not implemeneted';
		}
	});
    
    return ScoreNotifier;
});