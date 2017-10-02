import { Session } from 'meteor/session';

Template.mainLayout.events({
    "click .logout": function (event, template) {
        Meteor.logout();
    }    
});

Template.mainLayout.helpers({
    "setTitle": function() {
        console.log(Session);
        if(Session.get('title')){
            document.title = Session.get('title');
        }
    }
})
