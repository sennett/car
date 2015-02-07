define({
	$plugins: [
		'wire/debug',
		'wire/dom'
	],
	app: {
		create: {
			module: 'core/App',
			args: [{ $ref: "simulation"}, { $ref: "evolutionEngine"}]
		},
		ready: "run"
	},
	simulation: {
		create:{
			module: 'environment/Simulation',
			args: [{ $ref: "physicsWorldProvider"}, { $ref: "nullRenderer"}, { $ref: "visibleTicker" }, { $ref: "endStateDetector" }, {$ref: 'ground'}, 'id!fastForward']
		}
	},
	physicsWorldProvider: {
		create: {
			module: 'environment/provider/PhysicsWorldProvider'
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
	visibleTicker:{
		create: {
			module: 'environment/ticker/VisibleTicker'
		}
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
			args:[{$ref: 'genomeMater'}]
		}
	},
	genomeMater: {
		create: {
			module: 'evolution/GenomeMater'
		}
	}
});