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
			
			describe('timeouts', function(){
				
				it('ends the simulation when the car body is awake after a timeout since last contact', function(){
					createCar.call(this);
					initialiseWithAwakeBody.call(this);
					exerciseTickTillBeforeTimeout.call(this);
					registerBodyContact.call(this);
					exerciseTickTillAfterTimeout.call(this);
					assertSimulationEnded.call(this);
				});

				it('does not end the simulation before timeout since last contact', function(){
					createCar.call(this);
					initialiseWithAwakeBody.call(this);
					exerciseTickTillBeforeTimeout.call(this);
					registerBodyContact.call(this);
					exerciseTickTillBeforeTimeout.call(this);
					assertSimulationNotEnded.call(this);
				});

				it('increases tolerance at the start of the simulation', function(){
					createCar.call(this);
					initialiseWithAwakeBody.call(this);
					registerBodyContact.call(this);
					exerciseTickTillAfterTimeout.call(this);
					assertSimulationNotEnded.call(this);
				});
			});
			
			describe('body initialisation', function(){
				it('sets itself as a contact listener on the world', function(){
					createCar.call(this);
					initialiseWithAwakeBody.call(this);
					assertCarSetAsContactListener.call(this);
				});
			});
			
			it('provides the score', function(){
				createCar.call(this);
				initialiseWithAwakeBody.call(this);
				assertScoreProvided.call(this);
			});
		});
	});
	
	var assertScoreProvided = function(){
		expect(this.car.serialise().score).toEqual('car score');
	};
	
	var assertCarSetAsContactListener = function(){
		expect(Box2D.Dynamics.b2World.prototype.SetContactListener).toHaveBeenCalledWith(this.car);
	};
	
	var exerciseTickTillAfterTimeout = function(){
		_.times(121, this.car.registerTick);
	};
	
	var exerciseTickTillBeforeTimeout = function(){
		_.times(119, this.car.registerTick);
	};
	
	var registerBodyContact = function(){
		this.car.BeginContact();
	};
	
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
		spyOn(Box2D.Dynamics.b2Body.prototype, 'GetPosition').and.returnValue({x:'car score'});
		spyOn(Box2D.Dynamics.Joints.b2RevoluteJointDef.prototype,'Initialize');
		spyOn(Box2D.Dynamics.b2World.prototype, 'CreateBody').and.returnValue(Box2D.Dynamics.b2Body.prototype);
		spyOn(Box2D.Dynamics.b2World.prototype, 'CreateJoint');
		spyOn(Box2D.Dynamics.b2World.prototype, 'SetContactListener');
		this.car.initialisePhysicsBodies(Box2D.Dynamics.b2World.prototype);
	};
	
	var assertSimulationNotEnded = function(){
		assertSimulationHasState.call(this, false);
	};

	var assertSimulationEnded = function(){
		assertSimulationHasState.call(this, true);
	};
	
	var assertSimulationHasState = function(ended){
		expect(this.car.serialise().simulationComplete).toEqual(ended);
	};
	
	var createCar = function(){
		this.car = new Car(genome.createRandom());
	};
});