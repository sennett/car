define(['ui/GenerationsListView', 'service/AppService'], function (GenerationsListView, AppService) {
	describe('GenerationsListView', function () {
		beforeEach(function() {
			this.generationsListView = new GenerationsListView();
		});
		describe('adding a generation', function(){
			it('throws exception when generation not added', function(){
				var run = function(){
					this.generationsListView.onNewGenerationHighScore(123, 34);
				}.bind(this);
				expect(run).toThrow('application exception: no generation with id 123 found');
			});
			it('throws exception when generation added', function(){
				var run = function(){
					this.generationsListView.onNewGeneration(123);
					this.generationsListView.onNewGenerationHighScore(123, 34);
				}.bind(this);
				expect(run).not.toThrow();
			});
		});
	});
});