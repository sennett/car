define(['underscore', 'ui/presenters/GenerationsPresenter'], function (_, GenerationsPresenter) {
	return function Graph(generationUiService) {
		var publicInterface = {
			onNewGeneration: function(){},
			onNewGenerationHighScore: function(){},
			onNewGenerationAverageScore: function(){},
			onNewCar: function(){},
			onNewCarScore: function(){},
			onCarSimulationComplete: function(){}
		};
		new GenerationsPresenter(publicInterface, generationUiService);
		return publicInterface;
	};
});