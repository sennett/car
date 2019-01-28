car
===

- Evolving car.  Run it here: https://sennett.github.io/car/, as long as you don't mind unbundled AMD modules :D
- Wait for load then click "run" button.
- Concept based on http://boxcar2d.com/.

Todo:

- create an application concept of a `generation`
- tournament selection

Nice to haves:

- run-time AMD module loading. I currently do not understand the subtleties of AMD as a module format versus AMD as a runtime module locator, along with the implications of build.
- unit-test more things
- different wire.js spec for environment and evolution engine
- breakable car



### Interesting points:

It uses AMD for everything, and wire.js for runtime IOC.  It provides a basic 
reference architecture for AMD, demonstrating no-build development configuration, 
optimised production build, test config for unit tests, and use of RequireJS and r.js with wire.js.

- Build wrapper to force wire.js to be included in production build.  It felt a bit hacky but it was the only way I could get it to work.
- The test RequireJS/Karma config is worth a look.  Karma serves the test and source files but does not include them on the page, then RequireJS takes over and loads the test files as dependencies, which then load the relevant modules under test.  I did not come up with this.
- As a result of the above, runtime/build RequireJS and wire.js config must be excluded by Karma, meaning that there cannot be any unit-testable things directly in the `scripts` directory. I'm not too fussed about this, as domain stuff shouldn't be in there anyway.
- Not using AMD as an IOC container.  AMD as IOC feels weird and wrong.  Surely an AMD dependency is like `using` a namespace, and IOC is domain-level injection?  But then I suppose JavaScript, and also runtime module loading.

