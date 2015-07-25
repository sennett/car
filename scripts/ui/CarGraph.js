define(['underscore', 'ui/presenters/GenerationsPresenter', 'Highcharts', 'ui/utils', 'core/appConfig'], function (_, GenerationsPresenter, Highcharts, utils, appConfig) {
	return function CarGraph(generationUiService) {
		var carPointsPerGeneration = 1 / appConfig.generationSize;
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
			},{
				name: 'Car score',
				type: 'line',
				pointInterval: carPointsPerGeneration
			}]
		});
		var carsAddedThisGeneration = 0;
		var carIdToXPositionMap = {};
		var averageScoreSeries = chart.series[0];
		var highScoreSeries = chart.series[1];
		var carScoreSeries = chart.series[2];
		var findGenerationPoint = function (generationId, series) {
			return _.find(series.data, function (point) {
				return point.x == generationId;
			});
		};
		
		var publicInterface = {
			onNewGeneration: function(generationId){
				carsAddedThisGeneration = 0;
				averageScoreSeries.addPoint([generationId, 0]);
				highScoreSeries.addPoint([generationId, 0]);
				chart.redraw();
			},
			onNewGenerationHighScore: function(generationId, highscore){
				highscore = utils.roundScore(highscore);
				
				var generationPoint = findGenerationPoint(generationId, highScoreSeries);
				generationPoint.update(highscore, false);
			},
			onNewGenerationAverageScore: function(generationId, score){
				score = utils.roundScore(score);
				findGenerationPoint(generationId, averageScoreSeries).update(score, false);
			},
			onNewCar: function(carId, generationId){
				var xPosition = generationId + carsAddedThisGeneration * carPointsPerGeneration;
				carIdToXPositionMap[carId] = xPosition;
				carScoreSeries.addPoint([xPosition, 0]);
				carsAddedThisGeneration++;
			},
			onNewCarScore: function(carId, score){
				var xpoint = findGenerationPoint(carIdToXPositionMap[carId], carScoreSeries);
				xpoint.update(score, false);
			},
			onCarSimulationComplete: function(){
				chart.redraw();
			}
		};
		
		new GenerationsPresenter(publicInterface, generationUiService);
		return publicInterface;
	};
});