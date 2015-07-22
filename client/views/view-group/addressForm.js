Template.addressForm.onRendered(function() {
	Session.set('address',{});
  	this.autorun(function () {
    if (GoogleMaps.loaded()) {		     		 
		$("#postalCode").geocomplete({ 
			details: ".details",
		    detailsAttribute: "data-geo" })
			.bind("geocode:result", function(event, result){
				var data = {};
				console.log(result);
				data['lat'] = result.geometry.location.A;
				data['long'] = result.geometry.location.F;
				//console.log("lat: " + result.geometry.location.A);
				//console.log("long : " + result.geometry.location.F);
				 $.each(result.address_components, function(index, object){
					var name = object.types[0];

					$.each(object.types, function(index, name){
					 
					  data[name] = object.long_name;
					  data[name + "_short"] = object.short_name;
					});
				  });
				  console.log(data);
				  Session.set('address', data);
			});	

	 }
  });
});


var registerAddress = function(template){	
	var address = {
		unit : template.find('#unit').value,
	  blk : template.find('#blk').value,
	  street : template.find('#street').value,
	  building : template.find('#building').value,
	  postalCode : Session.get("address").postal_code
	};	
	//user.profile["address"] = address;
	console.log(address);	
	 Meteor.users.update({_id:Meteor.userId()}, { $set:{"profile.address":address}} );
	 Router.go('borrow');
}

Template.addressForm.events({

  "click .register": function (event, template) {
	registerAddress(template);
  },
  'click button': function() {
    // Trigger geocoding request.
    $("#postalCode").trigger("geocode");
  }

});
