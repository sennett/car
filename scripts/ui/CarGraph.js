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
			series: [{
				data: [1, 2, 3, 4, 5, 6],
				pointStart: 1
			}]
		});
		var publicInterface = {
			onNewGeneration: function(){},
			onNewGenerationHighScore: function(){},
			onNewGenerationAverageScore: function(generationId, score){
				dataSet.add({
					x: generationId,
					y: score,
					z: 0
				})
			},
			onNewCar: function(){},
			onNewCarScore: function(){},
			onCarSimulationComplete: function(){}
		};
		
		new GenerationsPresenter(publicInterface, generationUiService);
		return publicInterface;
	};
});