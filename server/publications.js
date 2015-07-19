Meteor.publish('items', function(options) {
   return Items.find(options, {});
});


Meteor.publish("BucketImages", function(){
  return BucketImages.find();
});

/**
* Publish messages by items id.
*/
Meteor.publish('itemDiscussions', function(itemId) {
    return Discussions.find({ "itemId" : itemId });
});
