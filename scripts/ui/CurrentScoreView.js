define(['underscore'], function(_) {
    var CurrentScoreView = function(){
		this.element = document.getElementById('current-score');
	};
    
    CurrentScoreView.prototype = _.extend(CurrentScoreView.prototype, {
		timesUpdated: 0,
		updateCurrentScore: _.throttle(function(score){
			this.element.innerHTML = score;
		}, 100)
	});
    
    return CurrentScoreView;
});