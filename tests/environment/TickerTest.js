define(['environment/Ticker'], function (Ticker) {
	describe('Ticker', function () {
		beforeEach(function(){
			this.intervalMock = {some:"mock"};
			this.intervalProviderSpy = jasmine.createSpyObj('intervalProviderSpy', ['setInterval', 'clearInterval']);
			this.intervalProviderSpy.setInterval.and.returnValue(this.intervalMock);
			this.interval = {a:'thing'};
			this.ticker = new Ticker(this.intervalProviderSpy, this.interval);
			this.ticker.setInterval(this.interval);
		});
		describe('run', function(){
			it('creates timeout with interval from VisibleTicker.setInterval', function(){
				this.ticker.run();
				expect(this.intervalProviderSpy.setInterval.calls.mostRecent().args[1]).toBe(this.interval);
			});
		});
		describe('stop', function(){
			it('clears the interval provider with the same timeout ID', function(){
				this.ticker.run();
				this.ticker.stop();
				expect(this.intervalProviderSpy.clearInterval).toHaveBeenCalledWith(this.intervalMock);
			});
		});
		describe('setInterval', function(){
			describe('when running', function(){
				beforeEach(function(){
					this.secondIntervalMock = "my second interval mock";
					this.ticker.run();
					this.ticker.setInterval(this.secondIntervalMock);
				});
				it('clears the current timeout', function(){
					expect(this.intervalProviderSpy.clearInterval).toHaveBeenCalledWith(this.intervalMock);
				});
				it('makes a new timeout', function(){
					expect(this.intervalProviderSpy.setInterval.calls.mostRecent().args[1]).toBe(this.secondIntervalMock);
				});
			});
			describe('when stopped', function(){
				it('does not touch interval provider', function(){
					this.ticker.setInterval(this.intervalMock);
					expect(this.intervalProviderSpy.setInterval).not.toHaveBeenCalled();
					expect(this.intervalProviderSpy.clearInterval).not.toHaveBeenCalled();
				});
			});
		})
	});
});