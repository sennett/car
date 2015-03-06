define(['underscore', 'ui/presenters/CurrentStatePresenter'], function(_, CurrentStatePresenter) {

    var CurrentStateView = function(currentScoreProvider){
		new CurrentStatePresenter(this, currentScoreProvider)
		this.element = document.getElementById('current-score');
	};

	CurrentStateView.prototype = _.extend(CurrentStateView.prototype, {
		timesUpdated: 0,
		updateCurrentScore: _.throttle(function(score){
			this.element.innerHTML = score >= 0 ? Math.round(score * 100) / 100 : 0;
		}, 100)
	});
    
    return CurrentStateView;
});