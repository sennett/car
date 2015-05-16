define(['domain/Car', 'underscore', 'box2dweb', 'domain/genome'], function (Car, _, Box2D, genome) {
	describe('Car', function () {
		describe('simulation', function(){ 
			it('ends the simulation when the car body is sleeping', function(){
				createCar.call(this);
				initialiseWithSleepingBody.call(this);
				tickSimulation.call(this);
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
			
			xit('provides the score', function(){
				createCar.call(this);
				initialiseWithAwakeBody.call(this);
				assertScoreProvided.call(this);
			});
		});
	});
	
	var assertScoreProvided = function(){
		expect(this.newScoreSpy).toHaveBeenCalledWith(jasmine.any(Object), 'car score');
	};
	
	var assertCarSetAsContactListener = function(){
		expect(Box2D.Dynamics.b2World.prototype.SetContactListener).toHaveBeenCalledWith(this.car);
	};
	
	var exerciseTickTillAfterTimeout = function(){
		tickSimulation.call(this, 121);
	};
	
	var exerciseTickTillBeforeTimeout = function(){
		tickSimulation.call(this, 119);
	};
	
	var tickSimulation = function(times){
		_.times(times || 1, this.car.registerTick);
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
		this.simulationCompleteSpy = jasmine.createSpy('simulation complete');
		this.newScoreSpy = jasmine.createSpy('new score spy');
		this.car.initialisePhysicsBodies(Box2D.Dynamics.b2World.prototype);
		this.car.onNewScore(this.newScoreSpy);
		this.car.onSimulationComplete(this.simulationCompleteSpy);
	};
	
	var assertSimulationNotEnded = function(){
		expect(this.simulationCompleteSpy).not.toHaveBeenCalled();
	};

	var assertSimulationEnded = function(){
		expect(this.simulationCompleteSpy).toHaveBeenCalledWith(jasmine.anything());
	};
	
	var createCar = function(){
		this.car = new Car(genome.createRandom());
	};
});