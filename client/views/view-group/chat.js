Template.chat.helpers({
    item: function () {
      itemId = Session.get("itemId");
      var item = BucketImages.findOne({ "_id" : itemId }); // Where Images is an FS.Collection instance
      return item;
    },
	conversations : function() {
		if(Session.get("itemId")){
			itemId = Session.get("itemId");
		  conversations = Discussions.find({ "itemId" : itemId, "owningParty" : Meteor.userId() }).fetch();
		  conversationMap = {};
		  var found=[];
		  for (var i in conversations) {
			  var userConversation = conversations[i];
			if(conversationMap[userConversation.conversationId]){
				var found = conversationMap[userConversation.conversationId];
				found.push(userConversation);
			}else{
				conversationMap[userConversation.conversationId] = [];
				conversationMap[userConversation.conversationId].push(userConversation);
			}
		  }
		  console.log(conversationMap);
		  var output = [], item;

			for (var type in conversationMap) {
				item = {};
				item.type = {"id" : type ,"user": conversationMap[type][0].user};
				item.name = conversationMap[type];
				output.push(item);
			}
			return output;
		}      
    }, 
	selectedConversation : function(){
		return Session.get("selectedConversation");			
	}
});


Template.chat.created = function () {
   Meteor.subscribe('itemConversations',Session.get("itemId"));
};

Template.chat.events({
    // $('#itmDiscuss').hide();
   'click #show-chat' : function(e) {
		e.preventDefault();
		$("#selectedConversation").hide();
        $("#wrapper").toggleClass("toggled");
			
	},
	'click .chatUser' : function(e){
		e.preventDefault();
		var conversationId =  event.target.getAttribute("data-id");
		console.log('chatuser clicked' + conversationId);
		Session.setPersistent('selectedConversation', conversationMap[conversationId]);
		Session.setPersistent('selectedConversationId', conversationId);
		
		console.log(conversationMap[conversationId]);	
		$("#selectedConversation").show();
		return false;
	}
	

});
