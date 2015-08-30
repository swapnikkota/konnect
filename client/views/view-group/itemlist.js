Template.itemslist.onCreated(function() {
	//console.log('inside itemlist created :'  + Session.get('itemSearched'));
	/*if(!Session.get('itemSearched')){
			 var itemToFind = {
			  itemDesc : "test"
			};
			Session.set('itemSearched', itemToFind);
		}

		Meteor.call('searchItem', Session.get('itemSearched'), function(error, result) {
		  // display the error to the user and abort
		  if (error)
			return throwError(error.reason);

		  for ( var item in result.itemsForBorrow){
			  if(result.itemsForBorrow[item].pic)
				 Session.set('photo',  result.itemsForBorrow[item].pic)
		  }

		});*/


});

Template.itemslist.helpers({

	welcomeName :  function () {
        if(Meteor.user().profile.name===null) {
            return "there";
        } else {
            return Meteor.user().profile.name;
        }
    }

});


Meteor.subscribe("items");


Meteor.subscribe("BucketImages");

Template.itemslist.helpers({
  images: function () {
	var itemsToFind = {};			   
	var itemSearched = Session.get('itemSearched');
	if(itemSearched){
		itemsToFind.itemName = itemSearched;
	}
	return BucketImages.find(); // Where Images is an FS.Collection instance		
  }
});


Template.itemslist.events({
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
