define(function() {

    var CurrentStatePresenter = function(view, currentScoreProvider, speedChanger, appRunner){
		currentScoreProvider.onUpdateScore.push(view.updateCurrentScore.bind(view));

		view.onChangeSpeedRequest = function(){
			speedChanger.changeSpeed(speedChangeResponseObject);
		};

		view.onRunRequest = function(){
			appRunner.run(view.onSimulationRunning.bind(view));
		};

		var speedChangeResponseObject = {
			fast: view.onSimulationSpeedUp.bind(view),
			slow: view.onSimulationSlowDown.bind(view)
		};
	};
    
    return CurrentStatePresenter;
});