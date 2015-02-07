define(function () {
	var NullRenderer = function () {
	};

	NullRenderer.prototype = {
		initialise: function(){},
		followBody: function(){},
		render: function(){},
		reset: function(){}
	};

	return NullRenderer;
});