define(['ui/GenerationView'], function(GenerationView) {

	var createGenerationView = function(){
		var view = new GenerationView(this.evolutionEngine);
		view.render(this.domNode)
	};

    var GenerationInstantiator = function(evolutionEngine){
		this.evolutionEngine = evolutionEngine;
		this.evolutionEngine.onStartGeneration = createGenerationView.bind(this);
		this.domNode = document.getElementById('generations');
	};
    
    return GenerationInstantiator;
});