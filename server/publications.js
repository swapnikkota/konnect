Meteor.publish('items', function(options) {
   return Items.find(options, {});
});


Meteor.publish("BucketImages", function(){
	var user = Meteor.users.findOne(this.userId);
	if(user.profile.address){
		return BucketImages.find({"userLocation": {$near:[user.profile.address.loc.longitude,user.profile.address.loc.latitude]}});
	}else{
		console.log("address not registered yet")
		return BucketImages.find();
	}
	
});

/**
* Publish messages by items id.
*/
Meteor.publish('itemDiscussions', function(itemId) {
    return Discussions.find({ "itemId" : itemId });
});
