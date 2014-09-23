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
    fail: function () {
        // This action fails. Should trigger a 500 message in view
        var a;
        a.kjhas();
        return {
            title: 'Sanata'
        };
    }
};

// @todo: I don't like this naming
exports.actions = IndexController;
