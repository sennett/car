define(function () {
	var intervalId;
	return {
		run: function(tick){
			intervalId = window.setInterval(tick, 1000 / 60);
		},
		stop: function(){
			window.clearInterval(intervalId);
		}
	};
});