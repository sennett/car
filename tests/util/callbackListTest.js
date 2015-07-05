define(['util/callbackList'], function (callbackList) {
	describe('callbackListTests', function () {
		
		it('calls all registered callbacks', function(){
			createCallbackList.call(this);
			addCallbacks.call(this);
			exerciseCallbacksCalled.call(this);
			assertCallbacksCalled.call(this);
		});
		
		it('does not error when empty', function(){
			createCallbackList.call(this);
			exerciseCallbacksCalled.call(this);
			// no error thrown
		});
	});
	
	var createCallbackList = function(){
		this.callbackList = callbackList.create();
	};
	
	var addCallbacks = function(){
		this.callbackOne = jasmine.createSpy('callback one');
		this.callbackTwo = jasmine.createSpy('callback two');
		this.callbackThree = jasmine.createSpy('callback three');
		this.callbackList.register(this.callbackOne);
		this.callbackList.register(this.callbackTwo);
		this.callbackList.register(this.callbackThree);
	};
	
	var exerciseCallbacksCalled = function(){
		this.callbackList.callAll('some', 'arguments');
	};

	var assertCallbackCalled = function (cb) {
		expect(cb.calls.count()).toEqual(1);
	};
	
	var assertCallbacksCalled = function() {
		assertCallbackCalled(this.callbackOne);
		assertCallbackCalled(this.callbackTwo);
		assertCallbackCalled(this.callbackThree);
	};
});