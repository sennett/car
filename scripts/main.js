define(['Spinner', 'require'], function(Spinner, require) {
    var spinner = new Spinner({
		color:'#cbcbcb'
	}).spin(document.getElementById('loadingTarget'));
	require(['productionBuildWrapper'], function(){
		spinner.stop();
	})
});