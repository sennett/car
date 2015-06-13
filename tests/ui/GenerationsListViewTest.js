define(['ui/GenerationsListView', 
	'service/GenerationsUiService', 
	'ui/domNodeProvider'], function (GenerationsListView, GenerationsUiService, domNodeProvider) {
	describe('GenerationsListView', function () {
		describe('on new generation high score', function(){
			it('throws exception when generation not added', function(){
				createGenerationListView.call(this);
				fireGenerationHighScore.call(this);
				assertExceptionThrown.call(this);
			});
			it('does not throw exception when generation added', function(){
				createGenerationListView.call(this);
				fireNewGeneration.call(this);
				fireGenerationHighScore.call(this);
				assertExceptionNotThrown.call(this);
			});
		});
	});
	var createGenerationListView = function(){
		spyOn(GenerationsUiService.prototype, 'onNewGeneration');
		spyOn(GenerationsUiService.prototype, 'onNewGenerationHighScore');
		spyOn(GenerationsUiService.prototype, 'onNewGenerationAverageScore');
		spyOn(GenerationsUiService.prototype, 'onNewCar');
		spyOn(GenerationsUiService.prototype, 'onNewCarScore');
		spyOn(GenerationsUiService.prototype, 'onCarSimulationComplete');
		spyOn(domNodeProvider, 'getElementById').and.returnValue(document.body);
		this.generationsListView = new GenerationsListView(GenerationsUiService.prototype, domNodeProvider);
	};
	var fireGenerationHighScore = function(){
		this.run = function(){
			this.generationsListView.onNewGenerationHighScore(123, 34);
		}.bind(this);
	};
	
	var assertExceptionThrown = function(){
		expect(this.run).toThrow('application exception: no generation with id 123 found');
	}; 
	var fireNewGeneration = function () {
		this.generationsListView.onNewGeneration(123);
	};
	
	var assertExceptionNotThrown = function(){
		expect(this.run).not.toThrow();
	};
});