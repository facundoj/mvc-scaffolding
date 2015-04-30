/**
 * MVC web-apps scaffolding. Mapping for views dispatching.
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
        controller, action, methodMapper;

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

    methodMapper = app[method];
    if (typeof methodMapper === 'function') {
        console.info(method.toUpperCase() + ' ' + url + ': Handled by ' + controllerName + '.' + actionName);
        // Handling request
        methodMapper.call(app, url, function(req, res) {
            // Dispatching to configured handler
            action = controller.actions[actionName];
            if (typeof action === 'function') {
                // @todo: Make view dynamic
                try {
                    res.render('index', action.apply(this, arguments));
                } catch (e) {
                    res.render('server-busy');
                }
            } else {
                console.warn('Action was not found: %s', actionName);
                res.render('not-found');
            }
        });
    } else {
        console.warn('Unkown method: ' + method);
    }
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
        mapRoute(routes[i]);
    }
    app.get('*', function (req, res) {
        res.render('not-found');
    });
});

// Configuring Mustache as the template engine
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// Starting the server
var server = app.listen(3000, function () {
    console.log('Server started at ' + server.address().port);
});
