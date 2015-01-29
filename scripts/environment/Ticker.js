define(function () {
	return function(){
		var _this = this;
		this.run = function(tick, simulation){
			_this.intervalId = window.setInterval(function(){
				tick.call(simulation);
			}, 1000 / 600);
		};
		this.stop = function(){
			window.clearInterval(_this.intervalId);
		};
	};
});