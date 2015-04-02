define(['ui/presenters/GenerationPresenter', 'ui/GenerationView', 'domain/Generation'], function (GenerationPresenter, GenerationView, Generation) {
	describe('GenerationPresenter', function () {
		beforeEach(function(){
			this.viewMock = GenerationView.prototype;
			this.generationMock = Generation.prototype;
		});
		describe('basic wiring', function(){
			it('wires up the generation number', function(){
				spyOn(this.viewMock, 'setGenerationNumber');
				spyOn(this.generationMock, 'getGenerationNumber').and.returnValue('mock generation number');
				new GenerationPresenter(this.viewMock, this.generationMock);
				expect(this.viewMock.setGenerationNumber).toHaveBeenCalledWith('mock generation number');
			});

			it('wires up the average score for the generation', function(){
				
			});

			it('wires up the new highscore', function(){
				
			});
		});
	});
});