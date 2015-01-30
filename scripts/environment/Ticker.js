define(function () {
	var Ticker = function(){};

	Ticker.prototype = {
		run: function(tick, simulation){
			this.intervalId = window.setInterval(function(){
				tick.call(simulation);
			}, 1000 / 150);
		},
		stop: function(){
			window.clearInterval(this.intervalId);
		}
	};

	return Ticker;
});