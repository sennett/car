define(['environment/ScoreNotifier', 'domain/Car'], function (ScoreNotifier, Car) {
	describe('ScoreNotifier', function () {
		
		it('notifies on new car', function(){
			createScoreNotifier.call(this);
			setGeneration.call(this);
			exerciseSetCars.call(this);
			assertNewCarsNotified.call(this);
		});

		it('notifies on new car score', function(){

		});

		it('notifies on car complete', function(){

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
		this.onNewCarSpy = jasmine.createSpy('new car spy');
		this.scoreNotifier = new ScoreNotifier();
		this.scoreNotifier.onNewCar = this.onNewCarSpy;
	};
	
	var exerciseSetCars = function(){
		this.scoreNotifier.setCars([Car.prototype, Car.prototype]);
	};
	
	var assertNewCarsNotified = function(){
		expect(this.onNewCarSpy.calls.argsFor(0)[0]).toEqual('generation ID');
		expect(this.onNewCarSpy.calls.argsFor(0)[1]).toEqual('car ID 1');
		expect(this.onNewCarSpy.calls.argsFor(1)[0]).toEqual('generation ID');
		expect(this.onNewCarSpy.calls.argsFor(1)[1]).toEqual('car ID 2');
	};
});