define(['core/Evolver', 'environment/Simulator', 'evolution/Engine'], function (Evolver, Simulator, Engine) {
	
	describe('Evolver', function () {
		describe('run', function(){
			it('gets the generation from the evolution engine', function(){
				createEvolver.call(this);
				exerciseRun.call(this);
				assertGenerationReceivedFromEvolutionEngine.call(this);
			});

			it('runs the passed callback when running', function(){
				createEvolver.call(this);
				exerciseRun.call(this);
				assertOnRunningCallbackCalled.call(this);
			});
		});
	});
	
	var assertOnRunningCallbackCalled = function(){
		expect(this.runFunctionSpy).toHaveBeenCalled();
	};

	var fakeGeneration = "fake generation";
	var createEvolver = function(){
		spyOn(Simulator.prototype, 'runGeneration');
		spyOn(Engine.prototype, 'nextGeneration').and.returnValue(fakeGeneration);
		this.evolver = new Evolver(Simulator.prototype, Engine.prototype);
	};

	var exerciseRun = function(){
		this.runFunctionSpy = jasmine.createSpy('runFunction');
		this.evolver.run(this.runFunctionSpy);
	};

	var assertGenerationReceivedFromEvolutionEngine = function(){
		expect(Simulator.prototype.runGeneration).toHaveBeenCalledWith(fakeGeneration, jasmine.any(Function));
	};
});