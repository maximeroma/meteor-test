AutoForm.hooks({
    'insertUser': {
        onSubmit: function(doc){
            console.log(doc);
            var error = null;
            var email = doc.emails[0].address;
            Accounts.createUser({
                username: doc.username,
                email: email,
                password: doc.password,
                profile: doc.profile ? doc.profile : {}
            }, function (err){
                if (err) {
                    error = new Error("Une erreur s'est produite");
                }                
            });

            if (error === null) {
                this.done()
            } else {
                this.done(error);
            }
            return false;
        },

        onSuccess: function() {
            Router.go(Utils.pathFor('home'));
        },

        onError: function(formType, err) {
            alert(err.reason);
        }
    }
});
