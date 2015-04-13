define([
	'underscore',
	'ractiveRuntime',
	'rv!ui/templates/GenerationTemplate',
	'ui/utils'], function(_, Ractive, template, utils) {

	function createPrototype(generationNumber) {
		return new Ractive({
			generationNumber: generationNumber,
			template: template,
			append: true,
			data: {
				carViews: []
			},
			onNewAverageScore: function(averageScore){
				this.set('averageScore', utils.roundScore(averageScore));
			},
			newHighScore: function (highscore) {
				this.set('highscore', utils.roundScore(highscore));
			},
			addCarView: function(carView){
				this.carViews.push(carView);
			}
		});
	};

	var GenerationView = function(generationNumber){
		var view = createPrototype(generationNumber);
		return view;
	};
	
	GenerationView.prototype = _.extend(GenerationView.prototype, createPrototype());
	
    return GenerationView;
});