define(function() {

    var CurrentStatePresenter = function(view, speedChanger, appRunner, endStateDetector){

		view.onChangeSpeedRequest = function(){
			speedChanger.changeSpeed(speedChangeResponseObject);
		};

		view.onRunRequest = function(){
			appRunner.run(view.onSimulationRunning.bind(view));
		};
		
		view.onForceSimulationEndRequest = function(){
			endStateDetector.forceEnd();
		};
		
		var speedChangeResponseObject = {
			fast: view.onSimulationSpeedUp.bind(view),
			slow: view.onSimulationSlowDown.bind(view)
		};
	};
    
    return CurrentStatePresenter;
});