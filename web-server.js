// Require node modules.
var http = require( "http" );
var static = require('node-static');

var fileServer = new static.Server('./www');
var chalk = require( "chalk" );


// Create an instance of our http server.
var httpServer = http.createServer(
    function handleRequest( request, response ) {

        request.addListener('end', function () {
            fileServer.serve(request, response);
        }).resume();
    }
);

httpServer.listen( 8080 );

console.log( chalk.cyan( "Server running on port 8080" ) );