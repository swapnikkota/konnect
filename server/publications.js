Meteor.publish('items', function(options) {
   return Items.find(options, {});
});


Meteor.publish("BucketImages", function(itemToFind, limit){
	
	var user = Meteor.users.findOne(this.userId);
	if(user && user.profile.address && user.profile.address.loc  && user.profile.address.loc.longitude){
	console.log("displaying all the items near his area" + user.profile.address.loc.longitude + ":" +
		user.profile.address.loc.latitude + ":" + user.profile.address.neighborhood + ":" + 
		this.userId + "for item : " + itemToFind.itemName);
		return BucketImages.find(
				{"userLocation": {$near:[user.profile.address.loc.longitude,user.profile.address.loc.latitude]},
				"neighborhood": user.profile.address.neighborhood,
				"itemName": itemToFind.itemName, "ownerId" :  { $ne:  this.userId}} , { limit: limit });
	}else{
		console.log("displaying all the items not related to user :" + this.userId);
		return BucketImages.find({"itemName": itemToFind.itemName}, { limit: limit });
	}
	
});


Meteor.publish("AllBucketImages", function(limit){
	var user = Meteor.users.findOne(this.userId);
	if(user && user.profile.address && user.profile.address.loc  && user.profile.address.loc.longitude){
		console.log("displaying all the items near his area" + user.profile.address.loc.longitude + ":" +
		user.profile.address.loc.latitude + ":" + user.profile.address.neighborhood + ":" + this.userId);
		return BucketImages.find({"userLocation": {$near:[user.profile.address.loc.longitude,user.profile.address.loc.latitude]},
		"neighborhood": user.profile.address.neighborhood,
		 "ownerId" :  { $ne:  this.userId}} , { limit: limit });			
	}else{
		console.log("displaying all the items not related to user :" + this.userId);
		//return BucketImages.find({"ownerId" :  { $ne:  this.userId}}, { limit: limit });
		return BucketImages.find({}, { limit: limit });//
	}
	
});

/**
* Publish messages by items id.
*/
Meteor.publish('itemDiscussions', function(itemId ) {	
	//console.log("conversationId : " + conversationId);
    return Discussions.find({ "itemId" : itemId }, {sort : { creation_date : -1 } });
});
