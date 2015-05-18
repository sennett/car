define(['environment/EndStateDetector', 'domain/Car'], function (EndStateDetector, Car) {
	describe('EndStateDetector', function () {
		describe('simulationEnded', function(){
			
			it('ends the simulation when all detectors end the simulation', function(){
				createGlobalEndStateDetector.call(this);
				setDetectors.call(this, [true, true, true]);
				assertSimulationEnded.call(this);
			});

			it('does not end the simulation when one detector ends the simulation', function(){
				createGlobalEndStateDetector.call(this);
				setDetectors.call(this, [true, true, false]);
				assertSimulationNotEnded.call(this);
			});

			it('does not end the simulation when no detectors have ended the simulation', function(){
				createGlobalEndStateDetector.call(this);
				noDetectorsEnd.call(this);
				assertSimulationNotEnded.call(this);
			});
			
			it('throws if there are no cars registered', function(){
				createGlobalEndStateDetector.call(this);
				setWithNoDetectors.call(this);
				assertNoCarsExceptionThrown.call(this);
			});
			
			it('ends the simulation upon direct request', function(){
				createGlobalEndStateDetector.call(this);
				someDetectorsEnd.call(this);
				requestSimulationEnd.call(this);
				assertSimulationEnded.call(this);
			});
		});
	});
	
	var requestSimulationEnd = function(){
		this.globalEndStateDetector.endSimulation();
	};
	
	var noDetectorsEnd = function(){
		setDetectors.call(this, [false, false, false]);
	};
	
	var setWithNoDetectors = function(){
		setDetectors.call(this, []);
	};

	var someDetectorsEnd = function(){
		setDetectors.call(this, [true, true, false]);
	};
	
	var assertNoCarsExceptionThrown = function(){
		expect(this.globalEndStateDetector.simulationEnded).toThrow('no cars in endstate detector');
	};
	
	var createGlobalEndStateDetector = function(){
		this.globalEndStateDetector = new EndStateDetector();
		spyOn(Car.prototype, 'serialise');
	};
	
	var setDetectors = function(detectors){
		this.globalEndStateDetector.setCars(_.map(detectors, function(detector){
			var car = _.clone(Car.prototype);
			car.serialise.and.returnValue({
				simulationComplete: detector
			});
			return car;
		}));
	};
	
	var assertSimulationNotEnded = function(){
		assertSimulationHasState.call(this, false);
	};
	
	var assertSimulationEnded = function(){
		assertSimulationHasState.call(this, true);
	};
	
	var assertSimulationHasState = function(ended){
		expect(this.globalEndStateDetector.simulationEnded()).toEqual(ended);
	};
});