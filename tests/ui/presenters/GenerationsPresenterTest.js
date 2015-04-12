define([
	'ui/presenters/GenerationsPresenter', 
	'ui/GenerationsListView', 
	'service/AppService'], function (GenerationsPresenter, GenerationsListView, AppService) {
	describe('GenerationsPresenter', function () {
		beforeEach(function(){
			spyOn(AppService.prototype, 'onNewGeneration');
			spyOn(AppService.prototype, 'onNewGenerationHighScore');
			spyOn(AppService.prototype, 'onNewGenerationAverageScore');
			spyOn(AppService.prototype, 'onNewCar');
			spyOn(AppService.prototype, 'onNewCarScore');
			spyOn(AppService.prototype, 'onCarSimulationComplete');
			new GenerationsPresenter(GenerationsListView.prototype, AppService.prototype);
		});
		describe('informing the view', function(){
			it('informs of generation', function(){
				expect(AppService.prototype.onNewGeneration)
					.toHaveBeenCalledWith(GenerationsListView.prototype.onNewGeneration);
			});

			it('informs of new high score for generation', function(){
				expect(AppService.prototype.onNewGenerationHighScore)
					.toHaveBeenCalledWith(GenerationsListView.prototype.onNewGenerationHighScore);
			});

			it('informs of a new average score for generation', function(){
				expect(AppService.prototype.onNewGenerationAverageScore)
					.toHaveBeenCalledWith(GenerationsListView.prototype.onNewGenerationAverageScore);
			});
			
			it('informs of new car', function(){
				expect(AppService.prototype.onNewCar)
					.toHaveBeenCalledWith(GenerationsListView.prototype.onNewCar);
			});

			it('informs of car score', function(){
				expect(AppService.prototype.onNewCarScore)
					.toHaveBeenCalledWith(GenerationsListView.prototype.onNewCarScore);
			});

			it('informs of car simulation complete', function(){
				expect(AppService.prototype.onCarSimulationComplete)
					.toHaveBeenCalledWith(GenerationsListView.prototype.onCarSimulationComplete);
			});
		});
	});
});