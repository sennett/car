define(['underscore', 'ui/presenters/GenerationsPresenter', 'Highcharts'], function (_, GenerationsPresenter, Highcharts) {
	return function CarGraph(generationUiService) {
		var node = document.getElementById('carGraph');
		console.log(node);
		var chart = new Highcharts.Chart({
			chart:{
				renderTo: node,
				type: 'area'
			},
			title: {
				text: 'Average Generation Score'
			},
			xAxis: {
				title: {
					text: 'Generation'
				},
				type: 'linear',
				tickInterval: 1
			},
			yAxis: {
				title: {
					text: 'Average score'
				}
			},
			series:[{
				name: 'Average score'
			}]
		});
		var averageScoreSeries = chart.series[0];
		var publicInterface = {
			onNewGeneration: function(generationId){
				averageScoreSeries.addPoint([generationId, 0]);
				chart.redraw();
			},
			onNewGenerationHighScore: function(){},
			onNewGenerationAverageScore: function(generationId, score){
				_.find(averageScoreSeries.data, function(point){
					return point.x == generationId;
				}).update(score, false);
				
			},
			onNewCar: function(){},
			onNewCarScore: function(){},
			onCarSimulationComplete: function(){}
		};
		
		new GenerationsPresenter(publicInterface, generationUiService);
		return publicInterface;
	};
});