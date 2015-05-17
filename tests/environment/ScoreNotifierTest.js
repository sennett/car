define(['environment/ScoreNotifier', 'domain/Car'], function (ScoreNotifier, Car) {
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

		xdescribe('generation high score', function(){
			it('notifies when there is a new high score', function(){

			});

			it('does not notify on a lower score', function(){

			});
		});
	});
	
	var assertGenerationAverageScoreProvided = function(){
		expect(this.scoreNotifier.onNewGenerationAverageScore).toHaveBeenCalledWith('generation ID', 1.5);
	};
	
	var assertCarCompleteListenerBound = function(){
		expect(Car.prototype.onSimulationComplete.calls.count()).toEqual(this.dummyCars.length);
		expect(this.scoreNotifier.onCarSimulationComplete).toHaveBeenCalled();
	};
	
	var fireCarComplete = function(){
		this.fireableCallbackCarComplete();
	};
	
	var fireNewCarScore = function(){
		this.fireableCallbackNewScore();
	};
	
	var assertNewCarScoreListenerBound = function(){
		expect(Car.prototype.onNewScore.calls.count()).toEqual(this.dummyCars.length);
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
		spyOn(Car.prototype, 'onNewScore').and.callFake(function(cb){
			this.fireableCallbackNewScore = cb;
		}.bind(this));
		spyOn(Car.prototype, 'onSimulationComplete').and.callFake(function(cb){
			this.fireableCallbackCarComplete = cb;
		}.bind(this));
		this.dummyCars = [Car.prototype, Car.prototype];
	};
	
	var bindPublicEventListenersToScoreNotifier = function(){
		this.scoreNotifier.onNewCar = jasmine.createSpy('new car spy');
		this.scoreNotifier.onNewCarScore = jasmine.createSpy('on new car score dummy');
		this.scoreNotifier.onCarSimulationComplete = jasmine.createSpy('on car simulation complete dummy');
		this.scoreNotifier.onNewGenerationAverageScore = jasmine.createSpy('on new generation average score dummy');
	};

	var createScoreNotifier = function(){
		createCarSpy.call(this);
		this.scoreNotifier = new ScoreNotifier();
		bindPublicEventListenersToScoreNotifier.call(this);
	};
	
	var exerciseSetCars = function(){
		this.scoreNotifier.setCars(this.dummyCars);
	};
	
	var assertNewCarsNotified = function(){
		expect(this.scoreNotifier.onNewCar.calls.argsFor(0)[0]).toEqual('generation ID');
		expect(this.scoreNotifier.onNewCar.calls.argsFor(0)[1]).toEqual('car ID 1');
		expect(this.scoreNotifier.onNewCar.calls.argsFor(1)[0]).toEqual('generation ID');
		expect(this.scoreNotifier.onNewCar.calls.argsFor(1)[1]).toEqual('car ID 2');
	};
});