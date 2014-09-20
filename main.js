var express = require('express'),
    fs = require('fs'),
    mustacheExpress = require('mustache-express'),
    app = express(),
    routesIni = __dirname + '/routes.json';

fs.readFile(routesIni, 'utf8', function (err, routes) {
    if (err) {
        console.log('Error: ' + err);
        return;
    }
    routes = JSON.parse(routes);
    // At this point, "routes" contains the configs
    var i, route;
    for (i = 0; i < routes.length; i+=1) {
        // @todo: Review. A map would be a good idea. Check express.js docs!!
        // @todo: Why always dispatching to the very last mapped route?? need to figure it out
        // @todo: A lot of stuff missing here. Params validation. I should check docs
        // @todo: Also try-catching for missing required controllers
        route = routes[i];
        console.log('Mapping ' + route.method + ': ' + route.url + ' with ' + route.controller + '.' + route.action);
        app[String.prototype.toLowerCase.apply(route.method)](route.url, function(req, res) {
            var controller = require('./modules/' + route.controller + '.js');
            res.render('index', controller.actionsBound[route.action](req, res));
        });
    }
});

// Configuring Mustache as the template engine
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// Starting the server
var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
});
