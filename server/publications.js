Meteor.publish('items', function(options) {
   return Items.find(options, {});
});


Meteor.publish("BucketImages", function(itemToFind){
	
	var user = Meteor.users.findOne(this.userId);
	if(user && user.profile.address){		
		console.log(itemToFind.itemName);
		return BucketImages.find(
				{"userLocation": {$near:[user.profile.address.loc.longitude,user.profile.address.loc.latitude]}, 
				"itemName": itemToFind.itemName, "ownerId" :  { $ne:  this.userId}});
	}else{
		return BucketImages.find();
	}
	
});


Meteor.publish("AllBucketImages", function(){
	var user = Meteor.users.findOne(this.userId);
	if(user && user.profile.address){
		console.log("displaying all the items near his area");
		return BucketImages.find({"userLocation": {$near:[user.profile.address.loc.longitude,user.profile.address.loc.latitude]},
		 "ownerId" :  { $ne:  this.userId}});			
	}else{
		return BucketImages.find();
	}
	
});

/**
* Publish messages by items id.
*/
Meteor.publish('itemDiscussions', function(itemId) {
    return Discussions.find({ "itemId" : itemId });
});
