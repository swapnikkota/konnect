/**
* Allow messages to be added.
*/
Discussions.allow({
    'insert' : function() {
        return true;
    }
});

Meteor.methods({
  insertDiscussion :function (data) {
    var itemId = data.itemId;
    var bucketItem = BucketImages.findOne({"_id":itemId});
    var ownerId = bucketItem.ownerId;
    var owner = Meteor.users.findOne({ _id : ownerId });
    data.owningParty= owner._id;
    data.interestedParty = Meteor.user()._id;
    data.user = Meteor.user().profile.name;
    data.creation_date = new Date().getTime();
	if(owner._id == Meteor.user()._id){
		data.conversationId = data.conversationId;
	}else{
		data.conversationId = itemId + "_" + owner._id + "_" + Meteor.user()._id;
	}
	
    Discussions.insert(data);
  }
});
