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
			})
		});
	});
});