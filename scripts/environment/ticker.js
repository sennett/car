define(function () {
	var intervalId;
	return {
		run: function(tick){
			intervalId = window.setInterval(tick, 1000 / 600);
		},
		stop: function(){
			window.clearInterval(intervalId);
		}
	};
});