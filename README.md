car
===

Evolving car.  Installed here: http://sennett.org/boxcar2d.js/.  Based on http://boxcar2d.com/.

Currently the dev build is broken (index.html pointing the wrong way). Production is also far from optmised and causes requirejs timeouts on slow connections.

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

