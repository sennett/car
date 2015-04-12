define([
	'ui/presenters/GenerationsPresenter', 
	'ui/GenerationsListView', 
	'service/AppService'], function (GenerationsPresenter, GenerationsListView, AppService) {
	describe('GenerationsPresenter', function () {
		beforeEach(function(){
			spyOn(AppService.prototype, 'onNewGeneration');
			spyOn(AppService.prototype, 'onNewGenerationHighScore');
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
				
			});
			
			it('informs of new car', function(){
				
			});

			it('informs of car score', function(){

			});

			it('informs of car complete', function(){

			});
		});
	});
});