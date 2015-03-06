define(function() {

    var CurrentStatePresenter = function(view, currentScoreProvider, speedChanger){
		currentScoreProvider.onUpdateScore.push(view.updateCurrentScore.bind(view));

		view.onChangeSpeedRequest = function(){
			speedChanger.changeSpeed(speedChangeResponseObject);
		};

		var speedChangeResponseObject = {
			fast: view.onSpeedUp.bind(view),
			slow: view.onSlowDown.bind(view)
		};
	};
    
    return CurrentStatePresenter;
});