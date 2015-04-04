define(['ui/presenters/GenerationPresenter', 'ui/GenerationView', 'domain/Generation'], function (GenerationPresenter, GenerationView, Generation) {
	describe('GenerationPresenter', function () {
		beforeEach(function(){
			this.viewMock = GenerationView.prototype;
			this.generationMock = Generation.prototype;
			spyOn(this.generationMock, 'getGenerationNumber');
			spyOn(this.generationMock, 'newAverageScore');
		});
		
		describe('basic wiring', function(){
			it('wires up the generation number', function(){
				var mockGenerationNumber = {};
				spyOn(this.viewMock, 'setGenerationNumber');
				this.generationMock.getGenerationNumber.and.returnValue(mockGenerationNumber);
				new GenerationPresenter(this.viewMock, this.generationMock);
				expect(this.viewMock.setGenerationNumber).toHaveBeenCalledWith(mockGenerationNumber);
			});

			it('wires up the average score for the generation', function(){
				var mockAverageScore = {};
				new GenerationPresenter(this.viewMock, this.generationMock);
				this.generationMock.newAverageScore(mockAverageScore);
				expect(this.viewMock.onNewAverageScore).toHaveBeenCalledWith(mockAverageScore);
			});

			xit('wires up the new highscore', function(){
				
			});
		});
	});
});