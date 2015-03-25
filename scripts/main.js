define(['Spinner', 'require'], function(Spinner, require) {
    var spinner = new Spinner().spin(document.getElementById('loadingTarget'));
	require(['wire', 'wire!wireSpec'], function(){
		spinner.stop();
	})
});