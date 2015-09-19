Template.chat.helpers({
    item: function () {
      itemId = Session.get("itemId");
      var item = BucketImages.findOne({ "_id" : itemId }); // Where Images is an FS.Collection instance
      return item;
    }
});


Template.chat.rendered = function () {
   // $('#itmDiscuss').hide();
};
