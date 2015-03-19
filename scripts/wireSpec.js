define({
	$plugins: [
		'wire/debug'
	],
	app: {
		create: {
			module: 'core/App',
			args: [{ $ref: "simulation"}, { $ref: "evolutionEngine"}, { $ref: "ticker" }]
		}
	},
	simulation: {
		create:{
			module: 'environment/Simulation',
			args: [{ $ref: "physicsWorldProvider"}, { $ref: "facadeRenderer"}, { $ref: "ticker" }, { $ref: "endStateDetector" }, {$ref: 'ground'}, 'id!fastForward']
		}
	},
	physicsWorldProvider: {
		create: {
			module: 'environment/provider/PhysicsWorldProvider'
		}
	},
	facadeRenderer: {
		create:{
			module:'environment/renderer/FacadeRenderer',
			args: [{$ref: 'nullRenderer'}, {$ref: 'visibleRenderer'}]
		}
	},
	visibleRenderer: {
		create: {
			module:'environment/renderer/CanvasDebugRenderer'
		}
	},
	nullRenderer: {
		create: {
			module:'environment/renderer/NullRenderer'
		}
	},
	ticker:{
		create: {
			module: 'environment/Ticker',
			args: [{ $ref: 'windowWrapper' }]
		}
	},
	windowWrapper: {
		module: 'environment/documentWindowWrapper'
	},
	endStateDetector: {
		create: {
			module: 'environment/EndStateDetector'
		}
	},
	ground: {
		create: {
			module:'environment/Ground',
			args: [{$ref:'groundSegmentProvider'}]
		}
	},
	groundSegmentProvider: {
		create: {
			module: 'environment/provider/GroundSegmentProvider'
		}
	},
	evolutionEngine: {
		create: {
			module: 'evolution/Engine',
			args:[{$ref:'randomGenomeGenerator'}, {$ref: 'rouletteSelection'}]
		}
	},
	randomGenomeGenerator: {
		create: {
			module: 'evolution/RandomGenomeGenerator'
		}
	},
	noBreeding: {
		create: {
			module: 'evolution/selection/NoBreeding'
		}
	},
	rouletteSelection: {
		create: {
			module: 'evolution/selection/RouletteWheel',
			args:[{$ref: 'genomeMater'}, {$ref: 'randomGenomeGenerator'}]
		}
	},
	genomeMater: {
		create: {
			module: 'evolution/GenomeMater'
		}
	},
	fastForward:{
		create: {
			module: 'environment/FastForward',
			args: [{$ref: 'facadeRenderer'}, {$ref: 'ticker'}]
		}
	},

	// UI

	currentStateView: {
		create: {
			module: 'ui/CurrentStateView',
			args: [{$ref: 'simulation'}, {$ref: 'fastForward'}, {$ref: 'app'}, {$ref:'endStateDetector'}]
		}
	},

	generationInstantiator: {
		create: {
			module: 'ui/instantiators/GenerationInstantiator',
			args: [{$ref: 'evolutionEngine'}]
		}
	}
});