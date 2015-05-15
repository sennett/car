define(['domain/Car', 'underscore', 'box2dweb', 'domain/genome'], function (Car, _, Box2D, genome) {
	describe('Car', function () {
		describe('simulation', function(){ 
			it('ends the simulation when the car body is sleeping', function(){
				createCar.call(this);
				initialiseWithSleepingBody.call(this);
				assertSimulationEnded.call(this);
			});
			
			it('does not end the simulation when the car body is awake', function(){
				createCar.call(this);
				initialiseWithAwakeBody.call(this);
				assertSimulationNotEnded.call(this);
			});
			
			xit('does not end the simulation immediately', function(){
				createCar.call(this);
				exerciseTickTillBeforeEnd.call(this);
				assertCarSimulationNotEnded.call(this);
			});
			
			xit('ends after a while of no contact', function(){
				
			});

			xit('does not end within the buffer period', function(){
				
			});
		});
	});
	
	var initialiseWithAwakeBody = function(){
		initialisePhysicsBodies.call(this, true);
	};
	
	var initialiseWithSleepingBody = function(){
		initialisePhysicsBodies.call(this, false);
	};
	
	var initialisePhysicsBodies = function(awake){
		spyOn(Box2D.Dynamics.b2Body.prototype, 'IsAwake').and.returnValue(awake);
		spyOn(Box2D.Dynamics.b2Body.prototype, 'CreateFixture');
		spyOn(Box2D.Dynamics.b2Body.prototype, 'GetWorldCenter');
		spyOn(Box2D.Dynamics.Joints.b2RevoluteJointDef.prototype,'Initialize');
		spyOn(Box2D.Dynamics.b2World.prototype, 'CreateBody').and.returnValue(Box2D.Dynamics.b2Body.prototype);
		spyOn(Box2D.Dynamics.b2World.prototype, 'CreateJoint');
		this.car.initialisePhysicsBodies(Box2D.Dynamics.b2World.prototype);
	};
	
	var assertSimulationNotEnded = function(){
		expect(this.car.serialise().simulationComplete).toEqual(false);
	};

	var assertSimulationEnded = function(){
		expect(this.car.serialise().simulationComplete).toEqual(true);
	};
	
	var createCar = function(){
		this.car = new Car(genome.createRandom());
	};
	
	var exerciseTickTillBeforeEnd = function(){
		registerTick.call(this, 60);
	};
	
	var registerTick = function(times){
		_.times(times, this.car.registerTick);
	};
	
	var assertCarSimulationNotEnded = function(){
		expect(this.car.serialise().simulationComplete).toEqual(false);
	};
});