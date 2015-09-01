Template.addressForm.onRendered(function() {
	Session.set('address',{});
  	this.autorun(function () {
    if (GoogleMaps.loaded()) {		     		 
		$("#postalCode").geocomplete({ 
			details: ".details",
		    detailsAttribute: "data-geo",
			componentRestrictions: {country: "sg"},
			types: ['(regions)']
		})
			.bind("geocode:result", function(event, result){
				var data = {};
				data['latitude'] = result.geometry.location.G;
				data['longitude'] = result.geometry.location.K;
				 $.each(result.address_components, function(index, object){
					var name = object.types[0];

					$.each(object.types, function(index, name){
					 
					  data[name] = object.long_name;
					  data[name + "_short"] = object.short_name;
					});
				  });
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
	  postalCode : Session.get("address").postal_code,
	  neighborhood: Session.get('address').neighborhood,
	  loc: {
		  longitude : Session.get('address').longitude,
		  latitude : Session.get('address').latitude
	  }
	  
	};	
	 Meteor.users.update({_id:Meteor.userId()}, { $set:{"profile.address":address}} );
	 if(Session.get('lend')){
		 Router.go('lend');
	 }else{
		 Router.go('borrow');
	 }
	 
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
