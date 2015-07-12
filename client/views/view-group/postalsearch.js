
Template.postalsearch.helpers({

});

Template.postalsearch.onCreated(function() {

});

var searchPostalCode = function(event,template){
	  event.preventDefault();
    var postalCodeToFind = {
      postalCode : template.find('#postalCode').value
    };
    Session.set('postalCode', postalCodeToFind);
    Router.go('search', {});
}

Template.postalsearch.events({

  "submit": function (event, template) {
	searchPostalCode(event, template);
  }

});
