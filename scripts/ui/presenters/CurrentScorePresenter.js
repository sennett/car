define(['underscore', 'ui/CurrentScoreView'], function(_, CurrentScoreView) {

    var CurrentScorePresenter = function(currentScoreProvider){
		this.currentScoreProvider = currentScoreProvider;
	};
    
    CurrentScorePresenter.prototype = _.extend(CurrentScorePresenter.prototype, {
		createView: function(){
			var view = new CurrentScoreView();
			this.currentScoreProvider.onUpdateScore.push(view.updateCurrentScore.bind(view));
			return view;
		}
	});
    
    return CurrentScorePresenter;
});