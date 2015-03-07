define([
	'underscore',
	'ractive',
	'ui/presenters/CurrentStatePresenter',
	'rv!ui/templates/CurrentStateTemplate'], function(_, Ractive, CurrentStatePresenter, template) {

	var speedChangeClick = function(){
		this.onChangeSpeedRequest();
	};

	var runClick = function(){
		this.onRunRequest();
	};

	return function(currentScoreProvider, speedChanger, appRunner){
		var view = new Ractive({
			el: '#currentState',
			template: template,
			data: {
				score: 0,
				speed: 'fast forward',
				runDisabled: false
			},
			updateCurrentScore: _.throttle(function(score){
				this.set('score', score >= 0 ? Math.round(score * 100) / 100 : 0);
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

		new CurrentStatePresenter(view, currentScoreProvider, speedChanger, appRunner);
		view.on('changeSpeed', speedChangeClick.bind(view));
		view.on('run', runClick.bind(view));
		return view;
	};
});