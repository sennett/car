define(['environment/ScoreNotifier', 'domain/Car', 'environment/renderer/FacadeRenderer'], function (ScoreNotifier, Car, FacadeRenderer) {
	describe('ScoreNotifier', function () {
		
		it('notifies on new car', function(){
			createScoreNotifierAndSetGeneration.call(this);
			setGeneration.call(this);
			exerciseSetCars.call(this);
			assertNewCarsNotified.call(this);
		});
		
		it('throws when generation not set', function(){
			createScoreNotifier.call(this);
			assertNoGenerationSetThrown.call(this);
		});

		it('notifies on new car score', function(){
			createScoreNotifierAndSetGeneration.call(this);
			exerciseSetCars.call(this);
			fireNewCarScore.call(this);
			assertNewCarScoreListenerBound.call(this);
		});

		it('notifies on car complete', function(){
			createScoreNotifierAndSetGeneration.call(this);
			exerciseSetCars.call(this);
			fireCarComplete.call(this);
			assertCarCompleteListenerBound.call(this);
		});

		it('notifies when there is a new generation average score', function(){
			createScoreNotifierAndSetGeneration.call(this);
			exerciseSetCars.call(this);
			fireNewCarScore.call(this);
			assertGenerationAverageScoreProvided.call(this);
		});
		
		describe('updating the renderer', function(){
			it('causes the renderer to follow the highest scoring car', function(){
				createScoreNotifierAndSetGeneration.call(this);
				exerciseSetCars.call(this);
				fireNewCarScore.call(this);
				assertRendererFollowedBothCars.call(this);
			});
			
			it('does not re-render when the same car scores higher', function(){
				createScoreNotifierAndSetGeneration.call(this);
				exerciseSetCars.call(this);
				setCarTwoCurrentScore.call(this, 200);
				setCarTwoCurrentScore.call(this, 210);
				assertRendererCalledOnlyOnce.call(this);
			});
		});

		describe('generation high score', function(){
			it('notifies when there is a new high score', function(){
				createScoreNotifierAndSetGeneration.call(this);
				exerciseSetCars.call(this);
				fireNewCarScore.call(this);
				assertHighScoreProvided.call(this);
			});

			it('does not notify on a lower score', function(){
				createScoreNotifierAndSetGeneration.call(this);
				exerciseSetCars.call(this);
				fireNewCarScore.call(this);
				fireNewCarScore.call(this);
				assertHighScoreProvided.call(this);
			});
		});
	});
	
	var assertRendererCalledOnlyOnce = function(){
		expect(FacadeRenderer.prototype.followBody.calls.count()).toEqual(1);
	};
	
	var assertRendererFollowedBothCars = function(){
		expect(FacadeRenderer.prototype.followBody).toHaveBeenCalledWith(this.carOne.body);
		expect(FacadeRenderer.prototype.followBody).toHaveBeenCalledWith(this.carTwo.body);
	};
	
	var setCarTwoCurrentScore = function(score){
		this.fireableCallbackNewScoreCarTwo('car ID 2', score);
	};
	
	var assertHighScoreProvided = function(){
		expect(this.scoreNotifier.onNewGenerationHighScore.calls.count()).toEqual(2);
		expect(this.scoreNotifier.onNewGenerationHighScore).toHaveBeenCalledWith('generation ID', 1);
		expect(this.scoreNotifier.onNewGenerationHighScore).toHaveBeenCalledWith('generation ID', 2);
	};
	
	var assertGenerationAverageScoreProvided = function(){
		expect(this.scoreNotifier.onNewGenerationAverageScore).toHaveBeenCalledWith('generation ID', 1.5);
	};
	
	var assertCarCompleteListenerBound = function(){
		expect(this.carOne.onSimulationComplete.calls.count()).toEqual(1);
		expect(this.carTwo.onSimulationComplete.calls.count()).toEqual(1);
		expect(this.scoreNotifier.onCarSimulationComplete).toHaveBeenCalled();
	};
	
	var fireCarComplete = function(){
		this.fireableCallbackCarCompleteCarOne();
		this.fireableCallbackCarCompleteCarTwo();
	};
	
	var fireNewCarScore = function(){
		this.fireableCallbackNewScoreCarOne('car ID 1', 1);
		this.fireableCallbackNewScoreCarTwo('car ID 2', 2);
	};
	
	var assertNewCarScoreListenerBound = function(){
		expect(this.carOne.onNewScore.calls.count()).toEqual(1);
		expect(this.carTwo.onNewScore.calls.count()).toEqual(1);
		expect(this.scoreNotifier.onNewCarScore).toHaveBeenCalled();
	};
	
	var assertNoGenerationSetThrown = function(){
		expect(this.scoreNotifier.setCars).toThrow('generation not set');
	};
	
	var createScoreNotifierAndSetGeneration = function(){
		createScoreNotifier.call(this);
		setGeneration.call(this);
	};
	
	var setGeneration = function(){
		this.scoreNotifier.runningGeneration('generation ID');
	};
	
	var createCarSpy = function(){
		var callsToSerialise = 0;
		spyOn(Car.prototype, 'serialise').and.callFake(function(){
			callsToSerialise++;
			var returnable = {
				id: 'car ID ' + callsToSerialise,
				score: callsToSerialise
			};
			if (callsToSerialise == this.dummyCars.length)
				callsToSerialise = 0;
			return returnable;
		}.bind(this));
		
		this.carOne = _.clone(Car.prototype);
		this.carOne.body = 'car one body';
		spyOn(this.carOne, 'onNewScore').and.callFake(function(cb){
			this.fireableCallbackNewScoreCarOne = cb;
		}.bind(this));
		spyOn(this.carOne, 'onSimulationComplete').and.callFake(function(cb){
			this.fireableCallbackCarCompleteCarOne = cb;
		}.bind(this));
		
		this.carTwo = _.clone(Car.prototype);
		this.carTwo.body = 'car two body';
		spyOn(this.carTwo, 'onNewScore').and.callFake(function(cb){
			this.fireableCallbackNewScoreCarTwo = cb;
		}.bind(this));
		spyOn(this.carTwo, 'onSimulationComplete').and.callFake(function(cb){
			this.fireableCallbackCarCompleteCarTwo = cb;
		}.bind(this));
		
		this.dummyCars = [this.carOne, this.carTwo];
	};
	
	var bindPublicEventListenersToScoreNotifier = function(){
		this.scoreNotifier.onNewCar = jasmine.createSpy('new car spy');
		this.scoreNotifier.onNewCarScore = jasmine.createSpy('on new car score dummy');
		this.scoreNotifier.onCarSimulationComplete = jasmine.createSpy('on car simulation complete dummy');
		this.scoreNotifier.onNewGenerationAverageScore = jasmine.createSpy('on new generation average score dummy');
		this.scoreNotifier.onNewGenerationHighScore = jasmine.createSpy('on new high score dummy');
	};

	var createScoreNotifier = function(){
		createCarSpy.call(this);
		spyOn(FacadeRenderer.prototype, 'followBody');
		this.scoreNotifier = new ScoreNotifier(FacadeRenderer.prototype);
		bindPublicEventListenersToScoreNotifier.call(this);
	};
	
	var exerciseSetCars = function(){
		this.scoreNotifier.setCars(this.dummyCars);
	};
	
	var assertNewCarsNotified = function(){
		expect(this.scoreNotifier.onNewCar.calls.argsFor(0)[0]).toEqual('car ID 1');
		expect(this.scoreNotifier.onNewCar.calls.argsFor(0)[1]).toEqual('generation ID');
		expect(this.scoreNotifier.onNewCar.calls.argsFor(1)[0]).toEqual('car ID 2');
		expect(this.scoreNotifier.onNewCar.calls.argsFor(1)[1]).toEqual('generation ID');
	};
});