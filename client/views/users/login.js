Template.login.events({
    "submit form": function (event, template) {
        event.preventDefault();

        var user = $("#username").val();
        var password = $("#password").val();

        console.log(user);

        Meteor.loginWithPassword(user, password, function (error) {
            if (error) {
                alert(error.reason);
            }
        });
    }
});