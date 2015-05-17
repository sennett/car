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

		});

		describe('generation high score', function(){
			it('notifies when there is a new high score', function(){

			});

			it('does not notify on a lower score', function(){

			});
		});
	});
	
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
	
	var createScoreNotifier = function(){
		var callsToSerialise = 0;
		spyOn(Car.prototype, 'serialise').and.callFake(function(){
			callsToSerialise++;
			return {
				id: 'car ID ' + callsToSerialise
			};
		});
		spyOn(Car.prototype, 'onNewScore').and.callFake(function(cb){
			this.fireableCallbackNewScore = cb;
		}.bind(this));
		spyOn(Car.prototype, 'onSimulationComplete').and.callFake(function(cb){
			this.fireableCallbackCarComplete = cb;
		}.bind(this));
		this.dummyCars = [Car.prototype, Car.prototype];
		this.onNewCarSpy = jasmine.createSpy('new car spy');
		this.scoreNotifier = new ScoreNotifier();
		this.scoreNotifier.onNewCar = this.onNewCarSpy;
		this.scoreNotifier.onNewCarScore = jasmine.createSpy('on new car score dummy');
		this.scoreNotifier.onCarSimulationComplete = jasmine.createSpy('on car simulation complete dummy');
	};
	
	var exerciseSetCars = function(){
		this.scoreNotifier.setCars(this.dummyCars);
	};
	
	var assertNewCarsNotified = function(){
		expect(this.onNewCarSpy.calls.argsFor(0)[0]).toEqual('generation ID');
		expect(this.onNewCarSpy.calls.argsFor(0)[1]).toEqual('car ID 1');
		expect(this.onNewCarSpy.calls.argsFor(1)[0]).toEqual('generation ID');
		expect(this.onNewCarSpy.calls.argsFor(1)[1]).toEqual('car ID 2');
	};
});