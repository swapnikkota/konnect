// Provide defaults for Meteor.settings
//

if (typeof Meteor.settings === 'undefined')
  Meteor.settings = {};

_.defaults(Meteor.settings, {
  facebook : {
        //clientId: "671930892938681",
        //secret: "b546b4a01772f340396c4cc34a1be755"
		clientId : "1676557749228882",
		secret : "40467c11dc4bb913c4ac895273875b6a"
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


