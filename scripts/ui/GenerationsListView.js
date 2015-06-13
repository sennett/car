define(['underscore', 
	'ui/GenerationView', 
	'ui/presenters/GenerationsPresenter',
	'css!ui/styles/generations'], function(_, GenerationView, GenerationsPresenter, css) {
	
	var checkGeneration = function(id){
		if (!this.generations[id])
			throw 'application exception: no generation with id ' + id + ' found';
	};

	var checkCar = function(id){
		if (!this.cars[id])
			throw 'application exception: no car with id ' + id + ' found';
	};

	var getGenerationForCarId = function(carId){
		return this.generations[this.cars[carId].generation];
	};

	var getIndexForCarId = function(carId){
		return this.cars[carId].index;
	};

	var previousGenerationsRendered = function () {
		return this.domNode.children.length > 0;
	};

	var insertGenerationAtTopOfList = function (generationView) {
		generationView.insert(this.domNode, this.domNode.children[0]);
	};
	
	var renderGeneration = function (generationView) {
		if (previousGenerationsRendered.call(this)) {
			// not sure why we need to renderer it first, 
			// but Ractive errors in the console
			generationView.render(this.domNode);
			insertGenerationAtTopOfList.call(this, generationView);
		} else {
			generationView.render(this.domNode);
		}
	};
	
    var GenerationsListView = function(generationsUiService, domNodeProvider){
		this.generations = {};
		this.cars = {};
		this.domNode = domNodeProvider.getElementById('generations');

		_.bindAll(this,
			'onNewGeneration',
			'onNewGenerationHighScore',
			'onNewGenerationAverageScore',
			'onNewCar',
			'onNewCarScore',
			'onCarSimulationComplete');
		
		new GenerationsPresenter(this, generationsUiService);
	};
	
	GenerationsListView.prototype = _.extend(GenerationsListView.prototype, {
		onNewGeneration:function(id, generationNumber){
			var generationView = new GenerationView(generationNumber);
			renderGeneration.call(this, generationView);
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
			var carIndex = this.generations[generationId].addCar();
			this.cars[id] = {
				generation: generationId,
				index: carIndex
			};
		},
		onNewCarScore: function(id, score){
			checkCar.call(this, id);
			var carIndex = getIndexForCarId.call(this, id);
			getGenerationForCarId.call(this, id).setCarScore(carIndex, score);
		},
		onCarSimulationComplete: function(id){
			checkCar.call(this, id);
			var carIndex = getIndexForCarId.call(this, id);
			getGenerationForCarId.call(this, id).setCarSimulationComplete(carIndex);
		}
	});
	
    return GenerationsListView;
});