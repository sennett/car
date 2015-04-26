define([
	'underscore',
	'ractiveRuntime',
	'rv!ui/templates/GenerationTemplate',
	'ui/utils',
	'ui/CarView'], function(_, Ractive, template, utils, CarView) {

	function createPrototype(generationNumber) {
		return new Ractive({
			generationNumber: generationNumber,
			template: template,
			append: true,
			data: {
				cars: []
			},
			onNewAverageScore: function(averageScore){
				this.set('averageScore', utils.roundScore(averageScore));
			},
			newHighScore: function (highscore) {
				this.set('highscore', utils.roundScore(highscore));
			},
			addCar: function(){
				var carData = {
					score:0,
					complete: false
				};
				this.push('cars', carData);
				return this.get('cars').length - 1;
			},
			setCarScore: function(index, newCarScore){
				this.set('cars[' + index + '].score', utils.roundScore(newCarScore));
			},
			setCarSimulationComplete: function(index){
				this.set('cars[' + index + '].complete', true);
			},
			components: {
				car: CarView
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