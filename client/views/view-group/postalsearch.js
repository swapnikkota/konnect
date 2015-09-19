Template.postalsearch.onRendered(function() {
	Session.setPersistent('address',{});
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
				//console.log(result);
				data['latitude'] = result.geometry.location.G;
				data['longitude'] = result.geometry.location.K;
				$.each(result.address_components, function(index, object){
					var name = object.types[0];

					$.each(object.types, function(index, name){
					 
					  data[name] = object.long_name;
					  data[name + "_short"] = object.short_name;
					});
				  });
				  //console.log(data);
				  Session.setPersistent('address', data);
			});	

	 }
  });
});


var searchPostalCode = function(event,template){
	  event.preventDefault();
    var postalCodeToFind = {
      postalCode : template.find('#postalCode').value
    };
    Session.setPersistent('postalCode', postalCodeToFind);
    Router.go('search', {});
}

Template.postalsearch.events({

  "submit": function (event, template) {
	searchPostalCode(event, template);
  },
  'click button': function() {
    // Trigger geocoding request.
    $("#postalCode").trigger("geocode");
  }

});
