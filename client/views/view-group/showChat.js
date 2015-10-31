Template.showChat.helpers({
    
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


Template.showChat.created = function () {
   Meteor.subscribe('itemConversations',Session.get("itemId"));
};

Template.showChat.events({
  	'click .chatUser' : function(e){
		$("#wrapper").hide();
		e.preventDefault();
		var conversationId =  event.target.getAttribute("data-id");
		console.log('chatuser clicked' + conversationId);
		Session.setPersistent('selectedConversation', conversationMap[conversationId]);
		Session.setPersistent('selectedConversationId', conversationId);
		
		console.log(conversationMap[conversationId]);	
		$("#selectedConversation").show();
		return false;
	},
	'click .back' : function(e){
		e.preventDefault();
		$("#selectedConversation").hide();
		$("#wrapper").show();
		//history.go(-1);
	},
	'click .show-item':function(e){
		e.preventDefault();
		history.go(-1);
	}
	

});
