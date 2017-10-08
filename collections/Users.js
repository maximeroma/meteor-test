import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);


Globals.schemas.UserProfile = new SimpleSchema({
    firstname: {
        type: String,
        regEx: /^[a-zA-Z]{2,25}/,
        optional: true,
        label: 'Prénom'
    },
    lastname: {
        type: String,
        regEx: /^[a-zA-Z]{2,25}/,
        optional: true,
        label: "Nom"
    },
    birthday: {
        type: Date,
        optional: true,
        label: 'Date de naissance'
    },
    gender: {
        type: String,
        allowedValues: ['M', 'F'],
        optional: true,
        label: 'Genre',
        autoform: {
            afFieldInput: {
                type: 'select2',
                options: [
                    {
                        value:  'M',
                        label: 'Homme'
                    },
                    {
                        value: 'F',
                        label: 'Femme'
                    }
                ]
            }
        }
    },
    organization: {
        type: String,
        regEx: /^[a-z0-9A-Z .]{3,30}$/,
        optional: true,
        label:'Organisation'
    },
    website: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true,
        label: 'Site Web'
    },
    bio: {
        type: String,
        optional: true,
        label: 'Biographie',
        autoform: {
            afFieldInput: {
                type: 'textarea'
            }
        }
    }
});

Globals.schemas.User = new SimpleSchema({
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z]{3,15}$/,
        label: 'Nom d\'utilisateur'
    },
    password: {
        type: String,
        label: 'Mot de passe',
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'password'
            }
        }
    },
    confirmation: {
        type: String,
        label: 'Confirmation',
        optional: true,
        custom: function() {
            if(this.value !== this.field('password').value){
                return "passwordMissmatch";
            }
        },
        autoform: {
            afFieldInput: {
                type: 'password'
            }
        }
    },
    emails: {
        type: Array,
        optional: false,
        label: 'Adresse'
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: 'Adresse'
    },
    "emails.$.verified": {
        type: Boolean,
        optional: true,
        autoform: {
            omit: true
        }
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if(this.isInsert) {
                return new Date;
            } else {
                this.unset();
            }
        },
        autoform: {
            omit: true
        }
    },
    profile: {
        type: Globals.schemas.UserProfile,
        optional: true,
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true,
        autoform: {
            omit:true
        }
    },
    roles: {
        type: String,
        optional: true,
        autoform: {
            omit: true
        }
    }
});

Meteor.users.attachSchema(Globals.schemas.User);