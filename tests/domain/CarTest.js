define(['domain/Car', 'underscore', 'box2dweb', 'domain/genome'], function (Car, _, Box2D, genome) {
	describe('Car', function () {
		describe('simulation', function(){ 
			describe('ending', function(){
				
				describe('body distance', function(){
					it('does not end the simulation when the car moves', function(){
						createCar.call(this);
						moveCarEnoughToNotEnd.call(this);
						assertSimulationNotEnded.call(this);
					});

					it('ends the simulation when the car does not move', function(){
						createCar.call(this);
						carStopped.call(this);
						assertSimulationEnded.call(this);
					});

					it('does not end the simulation at the start', function(){
						createCar.call(this);
						carStoppedImmediately.call(this);
						assertSimulationNotEnded.call(this);
					});
				});
			});
			
			describe('notifications', function(){
				it('provides the score once when changed', function(){
					createCar.call(this);
					tickSimulation.call(this, 2);
					assertScoreProvided.call(this);
				});
				
				it('notifies only once when simulation complete', function(){
					createCar.call(this);
					tickSimulation.call(this, 2);
					assertScoreProvided.call(this);
				});
				
				it('provides the highest score reached', function () {
					createCar.call(this, function(){
						return {x: this.score-- };
					}.bind(this));
					tickSimulation.call(this, 2);
					assertScoreNotProvidedOnce.call(this);
				})
			});
		});
	});
	
	var assertScoreNotProvidedOnce = function(){
		expect(this.newScoreSpy.calls.count()).toEqual(1);
	};
	
	var moveCarEnoughToNotEnd = function(){
		moveCar.call(this, 10, 100);
	};
	
	var carStopped = function(){
		moveCar.call(this, 200, 0);
	};
	
	var carStoppedImmediately = function(){
		moveCar.call(this, 100, 0);
	};
	
	var moveCar = function(numberOfTicks, totalXMovement){
		_.times(numberOfTicks, function(index){
			setBodyXPosition(totalXMovement * ((index + 1) / numberOfTicks));
			this.car.registerTick();
		}, this);
	};
	
	var setBodyXPosition = function(xPosition){
		Box2D.Dynamics.b2Body.prototype.GetPosition.and.returnValue({x: xPosition});
	};

	var assertScoreSpyCalled = function (scoreSpy) {
		expect(scoreSpy).toHaveBeenCalledWith(jasmine.anything(), 1);
		expect(scoreSpy.calls.count()).toEqual(1);
	};
	var assertScoreProvided = function(){
		assertScoreSpyCalled(this.newScoreSpy);
		assertScoreSpyCalled(this.anotherNewScoreSpy);
	};
	
	var tickSimulation = function(times){
		_.times(times || 1, this.car.registerTick);
	};
	
	var initialisePhysicsBodies = function(fakeScoreProvider){
		fakeScoreProvider = fakeScoreProvider || function(){
			return {x: 1};
		}.bind(this);
		spyOn(Box2D.Dynamics.b2Body.prototype, 'IsAwake');
		spyOn(Box2D.Dynamics.b2Body.prototype, 'CreateFixture');
		spyOn(Box2D.Dynamics.b2Body.prototype, 'GetWorldCenter');
		this.score = 2;
		spyOn(Box2D.Dynamics.b2Body.prototype, 'GetPosition').and.callFake(fakeScoreProvider);
		spyOn(Box2D.Dynamics.Joints.b2RevoluteJointDef.prototype,'Initialize');
		spyOn(Box2D.Dynamics.b2World.prototype, 'CreateBody').and.returnValue(Box2D.Dynamics.b2Body.prototype);
		spyOn(Box2D.Dynamics.b2World.prototype, 'CreateJoint');
		spyOn(Box2D.Dynamics.b2World.prototype, 'SetContactListener');
		spyOn(Box2D.Dynamics.b2World.prototype, 'GetGravity').and.returnValue({y:30});
		spyOn(Box2D.Dynamics.Contacts.b2Contact.prototype, 'GetFixtureA');
		spyOn(Box2D.Dynamics.Contacts.b2Contact.prototype, 'GetFixtureB');
		this.simulationCompleteSpy = jasmine.createSpy('simulation complete');
		this.newScoreSpy = jasmine.createSpy('new score spy');
		this.anotherNewScoreSpy = jasmine.createSpy('another new score spy');
		this.car.initialisePhysicsBodies(Box2D.Dynamics.b2World.prototype);
		this.car.onNewScore(this.newScoreSpy);
		this.car.onNewScore(this.anotherNewScoreSpy);
		this.car.onSimulationComplete(this.simulationCompleteSpy);
	};
	
	var assertSimulationNotEnded = function(){
		expect(this.simulationCompleteSpy).not.toHaveBeenCalled();
	};

	var assertSimulationEnded = function(){
		expect(this.simulationCompleteSpy.calls.count()).toEqual(1);
		expect(this.simulationCompleteSpy).toHaveBeenCalledWith(jasmine.anything());
	};
	
	var createCar = function(fakeScoreProvider){
		this.car = new Car(genome.createRandom());
		initialisePhysicsBodies.call(this, fakeScoreProvider);
	};
});