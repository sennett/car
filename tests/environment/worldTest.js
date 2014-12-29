define(['scripts/environment/world'], function(World){
	describe('world', function(){
		beforeEach(function(){
			this.mockGroundSegmentProvider = jasmine.createSpyObj('mockGroundSegmentProvider', ['makeGroundSegment']);
			mockPhysicsWorldProvider = jasmine.createSpyObj('mockPhysicsWorldProvider', ['world']);
			mockPhysicsWorldProvider.world.and.returnValue({
				add: function(){},
				on: function(){}
			});
			this.world = new World(this.mockGroundSegmentProvider, mockPhysicsWorldProvider);
		});

		describe('setGround', function(){
			it('creates bodies between the points', function(){
				var ground = {
					points: ['point one', 'point two', 'point three']
				};
				this.world.setGround(ground);
				expect(this.mockGroundSegmentProvider.makeGroundSegment).toHaveBeenCalledWith('point one', 'point two');
				expect(this.mockGroundSegmentProvider.makeGroundSegment).toHaveBeenCalledWith('point two', 'point three');
				expect(this.mockGroundSegmentProvider.makeGroundSegment.calls.count()).toEqual(2);
			});
		});
	});
});