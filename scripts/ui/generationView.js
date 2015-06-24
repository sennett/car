define([
	'underscore',
	'ractiveRuntime',
	'rv!ui/templates/GenerationTemplate',
	'ui/utils',
	'ui/CarView'], function(_, Ractive, template, utils, CarView) {
	
	return function(generationNumber){
		
		var templateInterface = new Ractive({
			template: template,
			append: true,
			data: {
				cars: [],
				generationNumber: generationNumber
			},
			components: {
				car: CarView
			}
		});
		
		var previousGenerationsRendered = function (domNode) {
			return domNode.children.length > 0;
		};

		var renderAtTopOfList = function (domNode) {
			templateInterface.render(domNode);
			templateInterface.insert(domNode, domNode.children[0]);
		};
		
		return {
			onNewAverageScore: function(averageScore){
				templateInterface.set('averageScore', utils.roundScore(averageScore));
			},
			newHighScore: function (highscore) {
				templateInterface.set('highScore', utils.roundScore(highscore));
			},
			addCar: function(){
				var carData = {
					score:0,
					complete: false
				};
				templateInterface.push('cars', carData);
				return templateInterface.get('cars').length - 1;
			},
			setCarScore: function(index, newCarScore){
				templateInterface.set('cars[' + index + '].score', utils.roundScore(newCarScore));
			},
			setCarSimulationComplete: function(index){
				templateInterface.set('cars[' + index + '].complete', true);
			},
			render: function(domNode){
				if (previousGenerationsRendered(domNode))
					renderAtTopOfList(domNode);
				else
					templateInterface.render(domNode);
			}
		};
	};
});