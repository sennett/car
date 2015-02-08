define(['environment/ticker/VisibleTicker'], function (VisibleTicker) {
	describe('VisibleTicker', function () {
		beforeEach(function(){
			this.intervalProviderSpy = jasmine.createSpyObj('intervalProviderSpy', ['setInterval', 'clearInterval']);
			this.interval = {a:'thing'};
			this.visibleTicker = new VisibleTicker(this.intervalProviderSpy, this.interval);
			this.visibleTicker.setInterval(this.interval);
		});
		describe('run', function(){
			it('creates timeout with interval from VisibleTicker.setInterval', function(){
				this.visibleTicker.run();
				expect(this.intervalProviderSpy.setInterval.calls.mostRecent().args[1]).toBe(this.interval);
			});
		});
		describe('stop', function(){
			it('clears the interval provider with the same timeout ID', function(){
				var intervalMock = {some:"mock"};
				this.intervalProviderSpy.setInterval.and.returnValue(intervalMock);
				this.visibleTicker.run();
				this.visibleTicker.stop();
				expect(this.intervalProviderSpy.clearInterval).toHaveBeenCalledWith(intervalMock);
			});
		});
		describe('setInterval', function(){
			describe('when running', function(){
				it('clears the current timeout', function(){

				});
				it('makes a new timeout', function(){

				});
			});
			describe('when stopped', function(){
				it('does not touch interval provider', function(){

				});
			});
		})
	});
});