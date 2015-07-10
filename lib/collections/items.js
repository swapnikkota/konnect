Items = new Mongo.Collection('items');

ItemImages = new FS.Collection('itemImages', {
    stores: [new FS.Store.GridFS("itemImages")]
});

ItemImages.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  },
  download: function(){
    return true;
  }
});

validateItem = function (item) {
  var errors = {};

  if (!item.itemDesc)
    errors.itemDesc = "please enter your search term";
  
   return errors;
}

Meteor.methods({
  searchItem: function(itemAttributes) {
        
	//check(this.userId, String);
    check(itemAttributes, {
      itemDesc: String
    });
    var errors = validateItem(itemAttributes);
    if (errors.itemDesc)
      throw new Meteor.Error('invalid-search', "You must enter a search term");
    
    var user = Meteor.user();
	
	var itemsForBorrow = Items.find({"itemDesc": {$regex: itemAttributes.itemDesc + "*"}}).fetch();
	
	return {itemsAvailable : true, itemsForBorrow :  itemsForBorrow};
        
  },
  
  addItem : function(itemAttributes){
	  Items.insert(itemAttributes);
	  
  }
});
