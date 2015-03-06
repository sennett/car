define([
	'underscore',
	'ractive',
	'ui/presenters/CurrentStatePresenter',
	'rv!ui/templates/CurrentStateTemplate'], function(_, Ractive, CurrentStatePresenter, template) {

	var speedChangeClick = function(){
		this.onChangeSpeedRequest();
	};

    var CurrentStateView = function(currentScoreProvider, speedChanger){
		var view = new Ractive({
			el: '#currentState',
			template: template,
			data: {
				score: 0,
				speed: 'fast forward'
			},
			updateCurrentScore: _.throttle(function(score){
				this.set('score', score >= 0 ? Math.round(score * 100) / 100 : 0);
			}, 100),
			onSpeedUp: function(){
				this.set('speed', 'slow down');
			},
			onSlowDown: function(){
				this.set('speed', 'fast forward');
			}
		});

		new CurrentStatePresenter(view, currentScoreProvider, speedChanger);
		view.on('changeSpeed', speedChangeClick.bind(view));
		return view;
	};
    
    return CurrentStateView;
});