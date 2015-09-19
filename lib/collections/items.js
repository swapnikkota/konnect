Items = new Mongo.Collection('items');

/*ItemImages = new FS.Collection('itemImages', {
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
});*/

validateItem = function (item) {
  var errors = {};

  if (!item.itemName)
    errors.itemName = "Please specify what you wish to you borrow.";

   return errors;
}

Meteor.methods({
  searchItem: function(itemAttributes) {

	//check(this.userId, String);
    check(itemAttributes, {
      itemName: String
    });
    var errors = validateItem(itemAttributes);
    if (errors.itemName)
      throw new Meteor.Error('invalid-search', "You must enter a search term");

    var user = Meteor.user();

	var itemsForBorrow = Items.find({$or: [
				{"itemName": {$regex: itemAttributes.itemName.toLowerCase() + "*"}},
				{"itemDesc": {$regex: itemAttributes.itemName.toLowerCase() + "*"}}]}).fetch();

	return {itemsAvailable : true, itemsForBorrow :  itemsForBorrow};

  },

  addItem : function(itemAttributes){
    console.log(itemAttributes);
	  Items.insert(itemAttributes);

  }
});
