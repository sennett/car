define([
	'underscore',
	'ractive',
	'ui/presenters/CurrentStatePresenter',
	'rv!ui/templates/CurrentStateTemplate',
	'ui/utils'], function(_, Ractive, CurrentStatePresenter, template, utils) {

	var speedChangeClick = function(){
		this.onChangeSpeedRequest();
	};

	var runClick = function(){
		this.onRunRequest();
	};
	
	var forceSimulationEnd = function(){
		this.onForceSimulationEndRequest();
	};

	return function(currentScoreProvider, speedChanger, appRunner, endStateDetector){
		var view = new Ractive({
			el: '#currentState',
			template: template,
			data: {
				score: 0,
				speed: 'fast forward',
				runDisabled: false
			},
			updateCurrentScore: _.throttle(function(score){
				this.set('score', utils.roundScore(score));
			}, 100),
			onSimulationSpeedUp: function(){
				this.set('speed', 'slow down');
			},
			onSimulationSlowDown: function(){
				this.set('speed', 'fast forward');
			},
			onSimulationRunning: function(){
				this.set('runDisabled', true);
			}
		});

		new CurrentStatePresenter(view, currentScoreProvider, speedChanger, appRunner, endStateDetector);
		view.on('changeSpeed', speedChangeClick.bind(view));
		view.on('run', runClick.bind(view)); 
		view.on('forceSimulationEnd', forceSimulationEnd.bind(view));
		return view;
	};
});