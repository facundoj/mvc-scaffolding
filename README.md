# MVC Scaffolding

Easy to configure MVC structure for Node.js web projects.

## Dependencies

- [express](https://www.npmjs.org/package/express)
- [mustache-express](https://www.npmjs.org/package/mustache-express)

## Usage

### /routes.json
```json
[
    {
        "url": "/path",
        "method": "GET",
        "controller": "IndexController",
        "action": "index"
    }
]
```

### /modules/IndexController.js
```js
var IndexController = {
    index: function (req, res) {
        // Returns view object
        return {
            title: 'Welcome!'
        };
    },
    ...
};

exports.actions = IndexController;

```
