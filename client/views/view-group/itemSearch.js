Template.itemSearch.onCreated(function() {
  Session.set('itemSubmitErrors', {}); 
});

Template.itemSearch.helpers({
  errorMessage: function(field) {
    return Session.get('itemSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('itemSubmitErrors')[field] ? 'has-error' : '';
  }
});

Meteor.subscribe("items");

var searchItem = function(event,template){
	  event.preventDefault();    
    var itemToFind = {
      itemName : template.find('#itemName').value 
    };
    var errors = validateItem(itemToFind);
    if (errors.itemName)
      return Session.set('itemSubmitErrors', errors);
    
    Meteor.call('searchItem', itemToFind, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);      
      //console.log(result);
	  Session.set('itemSearched', itemToFind);
	   Session.set('searchResults', result.itemsForBorrow);
      Router.go('borrow', result.itemsForBorrow);  
    });
  }
  
Template.itemSearch.events({
  'click #borrow': function(event, template) {
   searchItem(event, template);
  },
  "submit": function (event, template) {
	searchItem(event, template);
  },
  "click #register-flow": function (event, template) {
	Meteor.defer(function() { Router.go('lend'); })
  }
  
  
});