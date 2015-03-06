define(['underscore', 'ui/presenters/CurrentStatePresenter'], function(_, CurrentStatePresenter) {

	var speedChangeClick = function(){
		this.onChangeSpeedRequest();
	};

    var CurrentStateView = function(currentScoreProvider, speedChanger){
		new CurrentStatePresenter(this, currentScoreProvider, speedChanger);
		this.scoreElement = document.getElementById('current-score');
		this.speedButton = document.getElementById('fastForward');
		this.speedButton.addEventListener('click', speedChangeClick.bind(this));
	};

	CurrentStateView.prototype = _.extend(CurrentStateView.prototype, {
		timesUpdated: 0,
		updateCurrentScore: _.throttle(function(score){
			this.scoreElement.innerHTML = score >= 0 ? Math.round(score * 100) / 100 : 0;
		}, 100),
		onSpeedUp: function(){
			this.speedButton.innerHTML = 'slow down';
		},
		onSlowDown: function(){
			this.speedButton.innerHTML = 'fast forward';
		}
	});
    
    return CurrentStateView;
});