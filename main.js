/**
 * MVC web-apps scafolding. Easy mapping for views dispatching.
 *
 * @author facundoj
 *
 * @dependency express
 * @dependency mustache-express
 *
 */
var express = require('express'),
    fs = require('fs'),
    mustacheExpress = require('mustache-express'),
    app = express(),
    routesIni = __dirname + '/routes.json';

/**
 * Maps route with action.
 * @param route {object} configuration
 */
function mapRoute (route) {
    var url = route.url || '',
        method = String.prototype.toLowerCase.apply(route.method || ''),
        controllerName = route.controller || '',
        actionName = route.action || '',
        controller;

    if (!actionName || !method || !url || !controllerName) {
        console.warn('Required information was not provided');
        return;
    }

    try {
        controller = require('./modules/' + controllerName + '.js');
    } catch (err) {
        console.warn('Controller ' + controllerName + ' doesn\'t exist');
        return;
    }

    console.info(method.toUpperCase() + ' ' + url + ': Handled by ' + controllerName + '.' + actionName);
    app[method](url, function(req, res) {
        // @todo: Make view dynamic
        res.render('index', controller.actions[actionName](req, res));
    });
}

// Reading routes.json config file and mapping
fs.readFile(routesIni, 'utf8', function (err, routes) {
    if (err) {
        console.error('Error: ' + err);
        return;
    }
    routes = JSON.parse(routes);
    // At this point, "routes" is a config object
    var i, route, url, method, controller, action;
    for (i = 0; i < routes.length; i+=1) {
        // @todo: Review. A map would be a good idea. Check express.js docs!!
        route = routes[i];
        mapRoute(route);
    }
});

// Configuring Mustache as the template engine
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// Starting the server
var server = app.listen(3000, function () {
    console.log('Server started at' + server.address().port);
});
