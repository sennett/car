define(['underscore'], function(_) {
    var CurrentScoreView = function(){
		this.element = document.getElementById('current-score');
	};
    
    CurrentScoreView.prototype = _.extend(CurrentScoreView.prototype, {
		updateCurrentScore: function(score){
			this.element.innerHTML = score;
		}
	});
    
    return CurrentScoreView;
});