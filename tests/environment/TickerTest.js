define(['environment/Ticker'], function (Ticker) {
	describe('Ticker', function () {
		beforeEach(function(){
			this.timeoutMock = {some:"mock"};
			this.timeoutProviderSpy = jasmine.createSpyObj('intervalProviderSpy', ['setTimeout', 'clearTimeout']);
			this.timeoutProviderSpy.setTimeout.and.returnValue(this.timeoutMock);
			this.interval = {a:'thing'};
			this.ticker = new Ticker(this.timeoutProviderSpy, this.interval);
		});
		describe('run', function(){
			it('creates timeout with interval from VisibleTicker.setTimeout', function(){
				this.ticker.run(function(){});
				expect(this.timeoutProviderSpy.setTimeout).toHaveBeenCalled();
			});
		});
		describe('stop', function(){
			it('clears the interval provider with the same timeout ID', function(){
				this.ticker.run(function(){});
				this.ticker.stop();
				expect(this.timeoutProviderSpy.clearTimeout).toHaveBeenCalledWith(this.timeoutMock);
			});
		});
		xdescribe('speedUp and slowDown', function(){
			describe('when running', function(){
				beforeEach(function(done){
					this.ticker.run(done);
					this.ticker.speedUp();
				});
				it('clears the current timeout', function(){
					expect(this.timeoutProviderSpy.clearTimeout).toHaveBeenCalledWith(this.timeoutMock);
				});
				it('makes a new timeout', function(){
					expect(this.timeoutProviderSpy.setTimeout).toHaveBeenCalled();
				});
			});
			describe('when stopped', function(){
				it('does not touch interval provider', function(){
					this.ticker.speedUp();
					expect(this.timeoutProviderSpy.setTimeout).not.toHaveBeenCalled();
					expect(this.timeoutProviderSpy.clearTimeout).not.toHaveBeenCalled();
				});
			});
		})
	});
});