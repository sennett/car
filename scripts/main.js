define(['Spinner', 'require'], function(Spinner, require) {
    var spinner = new Spinner().spin(document.getElementById('loadingTarget'));
	require(['productionBuildWrapper'], function(){
		spinner.stop();
	})
});