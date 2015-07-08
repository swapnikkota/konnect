// Provide defaults for Meteor.settings
//

if (typeof Meteor.settings === 'undefined')
  Meteor.settings = {};

_.defaults(Meteor.settings, {
  facebook : {
        clientId: "671930892938681",
        secret: "b546b4a01772f340396c4cc34a1be755"
   }
});

ServiceConfiguration.configurations.upsert(
  { service: "facebook" },
  {
    $set: {
		appId: Meteor.settings.facebook.clientId,
        secret: Meteor.settings.facebook.secret
    }
  }
);
