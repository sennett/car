define(function() {

    var CurrentScorePresenter = function(view, currentScoreProvider){
		currentScoreProvider.onUpdateScore.push(view.updateCurrentScore.bind(view));
	};
    
    return CurrentScorePresenter;
});