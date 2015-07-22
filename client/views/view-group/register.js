

Template.register.helpers({
    postalCode : function () {
      return Session.get("address").postal_code;
    },
	loc: function () {
       //return 0, 0 if the location isn't ready
      //return Geolocation.latLng() || { lat: 0, lng: 0 };
    }
    //error: Geolocation.error
  });
  
var trimmedElementValueById = function(id) {
		var element = document.getElementById(id);
		if (!element){
			return null;
		} else {
			return element.value.replace(/^\s*|\s*$/g, ""); // trim;
		}
	};

	
	Template.register.onRendered(function() {
	
  	this.autorun(function () {
    if (GoogleMaps.loaded() && Session.get("address") == null) {		     		 
		$("#at-field-postalCode").geocomplete({ 
			details: ".details",
		    detailsAttribute: "data-geo" })
			.bind("geocode:result", function(event, result){
				var data = {};
				console.log(result);				 
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

	 }else{
		 console.log('got address details from postal search form');
	 }
  });
});

var registerUser = function(template){
	
	var user = {
	  username : template.find('#full_name').value,
	  email : template.find('#email').value,
	  password : template.find('#password').value	  
    };
	var address = {
		unit : template.find('#unit').value,
	  blk : template.find('#blk').value,
	  street : template.find('#street').value,
	  building : template.find('#building').value,
	  postalCode : Session.get("address").postal_code
	};
	user.profile = {};
	user.profile["address"] = address;
	console.log(user);
	
	Accounts.createUser(user, function(error) {
			if (error) {
				if (error.reason == 'Signups forbidden'){
					//loginButtonsSession.errorMessage(i18n('errorMessages.signupsForbidden'))
				} else {
					//loginButtonsSession.errorMessage(error.reason || "Unknown error");
				}
			} else {
				console.log('inside success');
				Meteor.loginWithPassword(user.email, user.password, function(){
					
				});				
			}
		});
}


Template.atForm.events({ 
  'keyup #at-field-postalCode': function() {
    // Trigger geocoding request.
    $("#at-field-postalCode").trigger("geocode");
  }
});



