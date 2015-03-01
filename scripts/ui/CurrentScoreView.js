define(['underscore'], function(_) {
    var CurrentScoreView = function(){
		this.element = document.getElementById('current-score');
	};
    
    CurrentScoreView.prototype = _.extend(CurrentScoreView.prototype, {
		timesUpdated: 0,
		updateCurrentScore: function(score){
			// todo: use throttle
			this.timesUpdated++;
			if (this.timesUpdated > 50){
				this.element.innerHTML = score;
				this.timesUpdated = 0;
			}
		}
	});
    
    return CurrentScoreView;
});