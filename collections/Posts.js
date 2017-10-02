import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Posts = new Mongo.Collection("posts");

Posts.allow({
    insert: function() 
        {
            return true;
        },
    update: function() 
        {   
            return true;
        },
    remove: function() 
        {
            return true;
        }
});

Posts.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: 'titre',
        max: 200
    },
    author: {
        type: String,
        label: 'auteur',
        max: 200
    },
    content: {
        type: String,
        label: 'content',
        max: 2000,
        autoform: {
            afFieldInput: {
                type: 'textarea',
                rows: 10
            }
        }
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (this.isInsert){
                return new Date;
            }
            else if (this.isUpsert) {
                return {$setOninsert: new Date};
            }
            else {
                this.unset();
            }
        },
        autoform: {
            omit: true
        }
    }
}));

Meteor.methods({
    "insertPost": function (doc) {
        if (doc.author !== "Bibi"){
            throw new Meteor.Error(403, 'Permission deny');
        }
        else {
            return Posts.insert(doc);
        }
    }
})
