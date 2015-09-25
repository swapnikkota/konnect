Meteor.publish('items', function(options) {
   return Items.find(options, {});
});


Meteor.publish("BucketImages", function(itemToFind, limit){
	
	var user = Meteor.users.findOne(this.userId);
	if(user && user.profile && user.profile.address && user.profile.address.loc  && user.profile.address.loc.longitude){
	console.log("displaying all the items near his area" + user.profile.address.loc.longitude + ":" +
		user.profile.address.loc.latitude + ":" + user.profile.address.neighborhood + ":" + 
		this.userId + "for item : " + itemToFind.itemName);
		return BucketImages.find(
				{"userLocation": {$near:[user.profile.address.loc.longitude,user.profile.address.loc.latitude]},
				"neighborhood": user.profile.address.neighborhood,
				"itemName": {$regex: itemToFind.itemName.toLowerCase() + "*"}
				//"ownerId" :  { $ne:  this.userId}
				} , { limit: limit });
	}else{
		console.log("displaying all the items not related to user :" + this.userId  + " : " +  itemToFind.itemName.toLowerCase());
		var itemName = itemToFind.itemName.toLowerCase();
		return BucketImages.find({"itemName": {$regex: itemName.toLowerCase() + "*"}}, { limit: limit });
	}
	
});

Meteor.publish("BucketImages_itemId", function(itemId){
	console.log("searching for item id :" + itemId);
	//BucketImages.findOne({"_id":itemId});
	return BucketImages.find({"_id": itemId});
	
	
});

Meteor.publish("AllBucketImages", function(limit){
	var user = Meteor.users.findOne(this.userId);
	if(user && user.profile && user.profile.address && user.profile.address.loc  && user.profile.address.loc.longitude){
		console.log("displaying all the items near his area" + user.profile.address.loc.longitude + ":" +
		user.profile.address.loc.latitude + ":" + user.profile.address.neighborhood + ":" + this.userId);
		return BucketImages.find({"userLocation": {$near:[user.profile.address.loc.longitude,
		user.profile.address.loc.latitude]},
		"neighborhood": user.profile.address.neighborhood
		 //"ownerId" :  { $ne:  this.userId}
		 } , { limit: limit });			
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
    return Discussions.find({ "itemId" : itemId }, {sort : { creation_date : 1 } });
});


Meteor.publish('itemConversations', function(itemId ) {	
	//console.log("conversationId : " + conversationId);
    return Discussions.find({ "itemId" : itemId , "owningParty" : this.userId}).fetch();
	//return discussions;
	/*var found=[];
	var conversationMap = {};
	var groupedConversations = _.groupBy(_.pluck(discussions, 'conversationId'));
	_.each(_.values(groupedConversations), function(conversations) {
		console.log({message: conversations[0]});
		var userConversations = Discussions.find({ "itemId" : itemId, "conversationId": conversations[0]}).fetch();
		_.each(_.values(userConversations), function(userConversation) {
			if(conversationMap[userConversation.conversationId]){
				var found = conversationMap[userConversation.conversationId];
				found.push(userConversation.message);
			}else{
				conversationMap[userConversation.conversationId] = [];
				conversationMap[userConversation.conversationId].push(userConversation.message);
			}
			
			console.log(conversationMap);
		});		
	});*/
	
});