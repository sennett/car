define([
	'ui/presenters/GenerationPresenter', 
	'ui/GenerationView', 
	'domain/Generation', 
	'evolution/Engine'], function (GenerationPresenter, GenerationView, Generation, EvolutionEngine) {
	describe('GenerationPresenter', function () {
		beforeEach(function(){
			this.viewMock = GenerationView.prototype;
			this.generationMock = Generation.prototype;
			this.engineMock = EvolutionEngine.prototype;
			spyOn(this.viewMock, 'newHighScore');
			spyOn(this.viewMock, 'runningMember');
			spyOn(this.viewMock, 'memberComplete');
			spyOn(this.viewMock, 'generationComplete');
			spyOn(this.generationMock, 'getGenerationNumber');
			spyOn(this.generationMock, 'newAverageScore');
			spyOn(this.generationMock, 'memberRunning');
			spyOn(this.generationMock, 'memberRan');
			spyOn(this.generationMock, 'generationComplete');
			spyOn(this.engineMock, 'registerNewHighScoreListener');
		});
		
		describe('basic wiring', function(){
			it('wires up the generation number', function(){
				var mockGenerationNumber = {};
				spyOn(this.viewMock, 'setGenerationNumber');
				this.generationMock.getGenerationNumber.and.returnValue(mockGenerationNumber);
				new GenerationPresenter(this.viewMock, this.generationMock, this.engineMock);
				expect(this.viewMock.setGenerationNumber).toHaveBeenCalledWith(mockGenerationNumber);
			});

			it('wires up the average score for the generation', function(){
				var mockAverageScore = {};
				new GenerationPresenter(this.viewMock, this.generationMock, this.engineMock);
				this.generationMock.newAverageScore(mockAverageScore);
				expect(this.viewMock.onNewAverageScore).toHaveBeenCalledWith(mockAverageScore);
			});

			it('wires up the new high score to engine', function(){
				new GenerationPresenter(this.viewMock, this.generationMock, this.engineMock);
				expect(this.engineMock.registerNewHighScoreListener).toHaveBeenCalledWith(this.viewMock.newHighScore);
			});

			it('wires up on member running', function(){
				var memberMock = {};
				new GenerationPresenter(this.viewMock, this.generationMock, this.engineMock);
				this.generationMock.memberRunning(memberMock);
				expect(this.viewMock.runningMember).toHaveBeenCalledWith(memberMock);
			});
			
			it('wires up on member ran', function(){
				var memberMock = {};
				new GenerationPresenter(this.viewMock, this.generationMock, this.engineMock);
				this.generationMock.memberRan(memberMock);
				expect(this.viewMock.memberComplete).toHaveBeenCalledWith(memberMock);
			});

			it('wires up generation complete', function(){
				new GenerationPresenter(this.viewMock, this.generationMock, this.engineMock);
				this.generationMock.generationComplete();
				expect(this.viewMock.generationComplete).toHaveBeenCalled();
			});
		});

	});
});