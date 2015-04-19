define(['underscore', 
	'ui/GenerationView', 
	'ui/presenters/GenerationsPresenter'], 
	function(_, GenerationView, GenerationsPresenter) {
    var GenerationsListView = function(appService){
		this.generations = {};
		this.cars = {};

		_.bindAll(this,
			'onNewGeneration',
			'onNewGenerationHighScore',
			'onNewGenerationAverageScore',
			'onNewCar',
			'onNewCarScore',
			'onCarSimulationComplete');
		
		// smell for test...
		if (appService)
			new GenerationsPresenter(this, appService);
	};
    
	var checkGeneration = function(id){
		if (!this.generations[id])
			throw 'application exception: no generation with id ' + id + ' found';
	};

	var checkCar = function(id){
		if (!this.cars[id])
			throw 'application exception: no car with id ' + id + ' found';
	};
	
    GenerationsListView.prototype = _.extend(GenerationsListView.prototype, {
		onNewGeneration:function(id, generationNumber){
			var generationView = new GenerationView(generationNumber);
			generationView.render(document.getElementById('generations'));
			this.generations[id] = generationView;
		},
		onNewGenerationHighScore: function(id, highScore){
			checkGeneration.call(this, id);
			this.generations[id].newHighScore(highScore);
		},
		onNewGenerationAverageScore: function(id, averageScore){
			checkGeneration.call(this, id);
			this.generations[id].onNewAverageScore(averageScore);
		},
		onNewCar: function(id, generationId) {
			checkGeneration.call(this, generationId);
			this.cars[id] = this.generations[generationId].addCar();
		},
		onNewCarScore: function(id, score){
			checkCar.call(this, id);
			this.cars[id].setScore(score);
		},
		onCarSimulationComplete: function(id){
			checkCar.call(this, id);
			this.cars[id].setSimulationComplete();
		}
	});
	
    return GenerationsListView;
});