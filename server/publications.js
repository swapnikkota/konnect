Meteor.publish('items', function(options) {
   return Items.find(options, {});
});


Meteor.publish("ItemImages", function(){
  return ItemImages.find();
});