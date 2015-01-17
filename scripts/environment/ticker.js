define(function () {

	return {
		run: function(tick){
			window.setInterval(tick, 1000 / 60);
		}
	};
});