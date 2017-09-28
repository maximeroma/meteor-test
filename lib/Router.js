Router.configure({
    layoutTemplate: 'mainLayout'
});

Router.route('/', {
    name: 'accueil'
});

Router.route('/post/:_id', {
    name: 'post',
    data: function() {
        return {
            id: this.params._id
        }
    }
});