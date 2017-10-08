Router.configure({
    layoutTemplate: 'mainLayout'
});

Router.route('/', {
    name: 'home',
    template: 'home'
})

Router.route('/register', {
    name: 'user.register',
    template: 'register'
});

Router.route('/login', {
    name: 'user.login',
    template: 'login'
});