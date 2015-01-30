define({
	$plugins: ['wire/debug'],
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
			args: [{ $ref: "physicsWorldProvider"}, { $ref: "renderer"}, { $ref: "ticker" }, { $ref: "endStateDetector" }, {$ref: 'ground'}]
		}
	},
	physicsWorldProvider: {
		create: {
			module: 'environment/provider/PhysicsWorldProvider'
		}
	},
	renderer: {
		create: {
			module:'environment/Renderer'
		}
	},
	ticker:{
		create: {
			module: 'environment/Ticker'
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
			module: 'evolution/Engine'
		}
	}
});