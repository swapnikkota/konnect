Template.lendItem.onCreated(function() {
  Session.set('itemLendErrors', {}); 
});

Template.lendItem.helpers({
  errorMessage: function(field) {
    return Session.get('itemLendErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('itemLendErrors')[field] ? 'has-error' : '';
  }
});

Meteor.subscribe("items");

var saveImage = function(error, data){
	console.log(data);
	Session.set("photo", data);
	var item = {pic : data, itemDesc : "testImage"};
	Meteor.call('addItem', item, function(error) {
      console.log(error);
    });
}


Template.lendItem.helpers({
    photo: function () {
      return Session.get("photo");
    },
	loc: function () {
      // return 0, 0 if the location isn't ready
      return Geolocation.latLng() || { lat: 0, lng: 0 };
    },
    error: Geolocation.error
  });
  
var addItem = function(event,template){
	event.preventDefault();    
	var imageOptions = {width : 100 , height : 200, quality : 100};
	var pic = MeteorCamera.getPicture(imageOptions, saveImage);
	/*var errors = validateAddItem(itemToFind);
	if (errors.itemDesc)
	  return Session.set('itemLendErrors', errors);*/	
    
}
  
Template.lendItem.events({
  'click #lend': function(event, template) {
   addItem(event, template);
  },
  "submit": function (event, template) {
	addItem(event, template);
  }
  
});