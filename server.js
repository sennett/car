var connect = require('connect');
var serveStatic = require('serve-static');

connect().use(serveStatic(__dirname)).listen(8081);
console.log('dev: http://localhost:8081');

connect().use(serveStatic(__dirname + '/build')).listen(8082);
console.log('prod: http://localhost:8082');