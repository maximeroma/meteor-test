Router.configure({
    layoutTemplate: 'mainLayout'
});

Router.onBeforeAction( function () {
    if (!Meteor.userId()) {
        this.render("login");
    } else {
        this.next();
    }
}, {
    except: [
        "login"
    ]
});

Router.route('/', {
    name: 'home',
    action: function() {
        Session.set('title', 'Cours OpenClassrooms');
    }
});

Router.route('/posts', {
    name: "posts",
    data: function() {
        return {
            posts: [
                {
                    title: 'premier post',
                    hide: true
                },
                {
                    title: 'second post',
                    hide: true
                },
                {
                    title: 'troisieme post',
                    hide: false
                }
            ]
        };
    }
});

Router.route('/register', {
    name: "register"
});

Router.route('/login', { name: "login"});