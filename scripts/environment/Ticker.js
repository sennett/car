define(function () {
	return function(){
		var _this = this;
		this.run = function(tick){
			_this.intervalId = window.setInterval(tick, 1000 / 600);
		};
		this.stop = function(){
			window.clearInterval(_this.intervalId);
		};
	};
});