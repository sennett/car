define(['underscore', 'ui/presenters/GenerationsPresenter', 'Highcharts', 'ui/utils'], function (_, GenerationsPresenter, Highcharts, utils) {
	return function CarGraph(generationUiService) {
		var node = document.getElementById('carGraph');
		var chart = new Highcharts.Chart({
			chart:{
				renderTo: node,
				type: 'area'
			},
			title: {
				text: 'Scores'
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
			},{
				name: 'High score'
			}]
		});
		var averageScoreSeries = chart.series[0];
		var highScoreSeries = chart.series[1];
		var findGenerationPoint = function (generationId, series) {
			return _.find(series.data, function (point) {
				return point.x == generationId;
			});
		};
		
		var publicInterface = {
			onNewGeneration: function(generationId){
				averageScoreSeries.addPoint([generationId, 0]);
				highScoreSeries.addPoint([generationId, 0]);
				chart.redraw();
			},
			onNewGenerationHighScore: function(generationId, highscore){
				highscore = utils.roundScore(highscore);
				findGenerationPoint(generationId, highScoreSeries).update(highscore, false);
			},
			onNewGenerationAverageScore: function(generationId, score){
				score = utils.roundScore(score);
				findGenerationPoint(generationId, averageScoreSeries).update(score, false);
			},
			onNewCar: function(){},
			onNewCarScore: function(){},
			onCarSimulationComplete: function(){}
		};
		
		new GenerationsPresenter(publicInterface, generationUiService);
		return publicInterface;
	};
});