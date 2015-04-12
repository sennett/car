define([
	'ui/presenters/GenerationsPresenter', 
	'ui/GenerationsListView', 
	'service/AppService'], function (GenerationsPresenter, GenerationsListView, AppService) {
	describe('GenerationsPresenter', function () {
		beforeEach(function(){
			
		});
		describe('informing the view', function(){
			it('informs of generation', function(){
				spyOn(GenerationsListView.prototype, 'newGeneration');
				var serviceMock = AppService.prototype;
				new GenerationsPresenter(GenerationsListView.prototype, serviceMock);
				serviceMock.onNewGeneration('generation key');
				expect(GenerationsListView.prototype.newGeneration).toHaveBeenCalledWith('generation key');
			});

			it('informs of new high score for generation', function(){
				spyOn(GenerationsListView.prototype, 'newGenerationHighScore');
				var serviceMock = AppService.prototype;
				new GenerationsPresenter(GenerationsListView.prototype, serviceMock);
				serviceMock.onNewGenerationHighScore('generation key', 'high score');
				expect(GenerationsListView.prototype.newGeneration).toHaveBeenCalledWith('generation key');
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