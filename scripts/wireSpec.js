define({
	app: {
		create: {
			module: 'App',
			args: [{ $ref: "simulation"}, { $ref: "evolutionEngine"}]
		},
		ready: "run"
	},
	simulation: {
		create:{
			module: 'environment/Simulation',
			args: [{ $ref: "physicsWorldProvider"}, { $ref: "renderer"}, { $ref: "ticker" }, { $ref: "endStateDetector" }]
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

	evolutionEngine: {
		create: {
			module: 'evolution/Engine'
		}
	}
});