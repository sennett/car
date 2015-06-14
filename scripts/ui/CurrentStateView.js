define([
	'underscore',
	'ractiveRuntime',
	'ui/presenters/CurrentStatePresenter',
	'rv!ui/templates/CurrentStateTemplate',
	'css!ui/styles/currentState'], function(_, Ractive, CurrentStatePresenter, template, css) {

	var speedChangeClick = function(){
		this.onChangeSpeedRequest();
	};

	var runClick = function(){
		this.onRunRequest();
	};
	
	var forceSimulationEnd = function(){
		this.onForceSimulationEndRequest();
	};
	
	var speedLabels = {
		fastForward: "Fast forward",
		slowDown: "Slow down"
	};

	return function(speedChanger, appRunner, endStateDetector){
		var view = new Ractive({
			el: '#currentState',
			template: template,
			data: {
				speed: speedLabels.fastForward,
				runDisabled: false
			},
			onSimulationSpeedUp: function(){
				this.set('speed', speedLabels.slowDown);
			},
			onSimulationSlowDown: function(){
				this.set('speed', speedLabels.fastForward);
			},
			onSimulationRunning: function(){
				this.set('runDisabled', true);
			}
		});

		new CurrentStatePresenter(view, speedChanger, appRunner, endStateDetector);
		view.on('changeSpeed', speedChangeClick.bind(view));
		view.on('run', runClick.bind(view)); 
		view.on('forceSimulationEnd', forceSimulationEnd.bind(view));
		return view;
	};
});