define(['underscore', 'ui/GenerationView', 'ui/CarView'], function(_, GenerationView, CarView) {
    var GenerationsListView = function(){
		this.generations = [];
		this.cars = [];
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
			this.generations[id] = new GenerationView(generationNumber);
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
			this.cars[id] = new CarView();
			this.generations[generationId].addCarView(this.cars[id]);
		},
		onNewCarScore: function(id, score){
			checkCar.call(this, id);
			this.cars[id].setScore(score);
		},
		onCarSimulationComplete: function(id){
			checkCar.call(this, id);
			this.cars[id].setSimulationComplete(score);
		}
	});
	
    return GenerationsListView;
});