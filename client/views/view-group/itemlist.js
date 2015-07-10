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

Meteor.subscribe("items");


Meteor.subscribe("ItemImages");
Template.itemslist.helpers({
  images: function () {
    return ItemImages.find(); // Where Images is an FS.Collection instance
  }
});



  
