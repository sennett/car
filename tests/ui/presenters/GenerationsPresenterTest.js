define([
	'ui/presenters/GenerationsPresenter', 
	'ui/GenerationsListView', 
	'service/AppService'], function (GenerationsPresenter, GenerationsListView, AppService) {
	describe('GenerationsPresenter', function () {
		beforeEach(function(){
			
		});
		describe('informing the view', function(){
			it('informs of generation', function(){
				spyOn(AppService.prototype, 'onNewGeneration');
				new GenerationsPresenter(GenerationsListView.prototype, AppService.prototype);
				expect(AppService.prototype.onNewGeneration).toHaveBeenCalledWith(GenerationsListView.prototype.onNewGeneration);
			});

			it('informs of new high score for generation', function(){
				
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