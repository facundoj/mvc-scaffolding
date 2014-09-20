var IndexController = {
    index: function (req, res) {
        console.log('index action');
        // Returns view object
        // @todo: May be it should determine view to dispatch..
        return {
            title: 'Index page title'
        };
    },
    test: function (req, res) {
        console.log('test action');
        // Returns view object
        return {
            title: 'Test page title'
        };
    },
    sanata: function () {
        return {
            title: 'Sanata'
        };
    }
};

// @todo: I don't like this naming
exports.actions = IndexController;
