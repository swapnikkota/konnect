Template.itemslist.onCreated(function() {
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
    return BucketImages.find(); // Where Images is an FS.Collection instance
  }
});
