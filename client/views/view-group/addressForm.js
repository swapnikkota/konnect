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


var searchPostalCode = function(event,template){
	  event.preventDefault();
    var postalCodeToFind = {
      postalCode : template.find('#postalCode').value
    };
    Session.set('postalCode', postalCodeToFind);
    Router.go('search', {});
}

Template.addressForm.events({

  "submit": function (event, template) {
	searchPostalCode(event, template);
  },
  'click button': function() {
    // Trigger geocoding request.
    $("#postalCode").trigger("geocode");
  }

});
