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
    var ownerId = bucketItem.metadata.ownerId;
    var owner = Meteor.users.findOne({ _id : ownerId });
    data.owningParty= owner._id
    data.interestedParty = Meteor.user()._id;
    data.user = Meteor.user().profile.name;
    data.creation_date = new Date().getTime();
    Discussions.insert(data);
  }
});
