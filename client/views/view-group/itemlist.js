var ITEMS_INCREMENT = 3;
Meteor.subscribe("items");

incrementLimit = function() {
  newLimit = Session.get('itemsLimit') + ITEMS_INCREMENT;
  Session.set('itemsLimit', newLimit);
}

Template.itemslist.onCreated(function() {	
	Session.setDefault('itemsLimit', ITEMS_INCREMENT);	
	var itemToFind = Session.get('itemSearched');
	
	// Deps.autorun() automatically rerun the subscription whenever Session.get('limit') changes
	// http://docs.meteor.com/#deps_autorun
	Deps.autorun(function() {
		if(itemToFind){				
			Meteor.subscribe("BucketImages", itemToFind, Session.get('itemsLimit'));				
		}else{
			Meteor.subscribe("AllBucketImages", Session.get('itemsLimit'));			
		}
	});
});


Template.itemslist.helpers({
  images: function () {	
	var itemToFind = Session.get('itemSearched');
	if(itemToFind){				
		return BucketImages.find({"itemName" : itemToFind.itemName}, { limit: Session.get('itemsLimit') }); // Where Images is an FS.Collection instance	
	}else{
		return BucketImages.find({}, { limit: Session.get('itemsLimit') }); // Where Images is an FS.Collection instance	
	}
		
  }
});


Template.itemslist.rendered = function() {
  // is triggered every time we scroll
  $(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
      incrementLimit();
    }
  });
}
 
Template.itemslist.events({
  'click .give-me-more': function(evt) {
    incrementLimit();
  },
  'click #btnInterested': function(event) {
		Session.set("itemId",event.target.getAttribute("data-id"));
		var discussDialogInfo = {
    template: Template.chat,
    title: "Konnect",
    removeOnHide: true //optional. If this is true, modal will be removed from DOM upon hiding
  }

  var rd = ReactiveModal.initDialog(discussDialogInfo);
	rd.show();

  }
});
