define(['helloWorld'], function(hw){
	var App = function(){};
	App.prototype.run = function(){
		hw();
	};
	return App;
});