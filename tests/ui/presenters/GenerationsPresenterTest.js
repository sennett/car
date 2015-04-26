define([
	'ui/presenters/GenerationsPresenter', 
	'ui/GenerationsListView', 
	'service/GenerationsUiService'], function (GenerationsPresenter, GenerationsListView, GenerationsUiService) {
	describe('GenerationsPresenter', function () {
		beforeEach(function(){
			spyOn(GenerationsUiService.prototype, 'onNewGeneration');
			spyOn(GenerationsUiService.prototype, 'onNewGenerationHighScore');
			spyOn(GenerationsUiService.prototype, 'onNewGenerationAverageScore');
			spyOn(GenerationsUiService.prototype, 'onNewCar');
			spyOn(GenerationsUiService.prototype, 'onNewCarScore');
			spyOn(GenerationsUiService.prototype, 'onCarSimulationComplete');
			new GenerationsPresenter(GenerationsListView.prototype, GenerationsUiService.prototype);
		});
		describe('informing the view', function(){
			it('informs of generation', function(){
				expect(GenerationsUiService.prototype.onNewGeneration)
					.toHaveBeenCalledWith(GenerationsListView.prototype.onNewGeneration);
			});

			it('informs of new high score for generation', function(){
				expect(GenerationsUiService.prototype.onNewGenerationHighScore)
					.toHaveBeenCalledWith(GenerationsListView.prototype.onNewGenerationHighScore);
			});

			it('informs of a new average score for generation', function(){
				expect(GenerationsUiService.prototype.onNewGenerationAverageScore)
					.toHaveBeenCalledWith(GenerationsListView.prototype.onNewGenerationAverageScore);
			});
			
			it('informs of new car', function(){
				expect(GenerationsUiService.prototype.onNewCar)
					.toHaveBeenCalledWith(GenerationsListView.prototype.onNewCar);
			});

			it('informs of car score', function(){
				expect(GenerationsUiService.prototype.onNewCarScore)
					.toHaveBeenCalledWith(GenerationsListView.prototype.onNewCarScore);
			});

			it('informs of car simulation complete', function(){
				expect(GenerationsUiService.prototype.onCarSimulationComplete)
					.toHaveBeenCalledWith(GenerationsListView.prototype.onCarSimulationComplete);
			});
		});
	});
});