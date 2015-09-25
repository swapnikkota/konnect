
var isReady = {};
var scroll = {};

Template.discussions.helpers({
    discussions : function() {
		if(Session.get("itemId")){
			Meteor.subscribe("BucketImages_itemId", Session.get("itemId"));
			itemId = Session.get("itemId");
		  var item = BucketImages.find({ "_id" : itemId }); // Where Images is an FS.Collection instance
		  var conversationId = itemId + "_" + item.ownerId+ "_" + Meteor.userId() ;
		 // console.log(conversationId);
		  return Discussions.find({ "itemId" : itemId });
		}      
    },
	conversations : function() {
		if(Session.get("itemId")){
		  var conversations = Discussions.find({ "itemId" : itemId, "owningParty" : Meteor.userId() }).fetch();
		  var conversationMap = {};
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
    isUsersMessage : function(messageUser){
		if(Meteor.user() && Meteor.user().profile){
			var currentUserName = Meteor.user().profile.name;
		  if( messageUser === currentUserName){
			return true;
		  } else {
			return false;
		  }
		}      
    },

    createdDateTime: function () {
       // return moment(this.creation_date).fromNow();
        var now = moment(new Date());
        var chatMsgDate = moment(this.creation_date);
        if(now.format("MM-DD-YYYY") === chatMsgDate.format("MM-DD-YYYY"))
            return chatMsgDate.format("HH:mm:ss")
        else
            return chatMsgDate.format("MMM-DD HH:mm:ss");
    },

    userToDisplay :  function () {
        if(!(Meteor.user().profile===null) && Meteor.user().profile.name == this.user) {
            return "";
        } else {
            return this.user;
        }
    }


});

Template.discussions.events({
    'scroll #discussionContainer': function (e) {

        var discussion = $("#discussionContainer");
        if (discussion.scrollTop() < 50 && !scroll.needScroll && isReady.messages) {
            scroll.needScroll = true;
            scroll.previousHeight = $("#scrollContainer").height();
            //incMessageLimit(20);
        }
    }

});



Template.discussions.created = function () {
    isReady.messages = false;
    var nowTimestamp;
    Session.setDefault('messageLimit', 10);
    Deps.autorun(function () {
        nowTimestamp = new Date().getTime();
        itemId = Session.get("itemId");
        Meteor.subscribe('itemDiscussions',itemId, {
            onReady: function () {
                scrollChatToBottom();
                isReady.messages = true;
                scrollChatToBottom();
            }
        });
		Meteor.subscribe('itemConversations',itemId, {
            onReady: function () {
                scrollChatToBottom();
                isReady.messages = true;
                scrollChatToBottom();
            }
        });
    });

    var nowTimestamp = new Date().getTime();
    Discussions.find({creation_date: {$gt: nowTimestamp}}).observe({
        added: function (discussion) {


            if (isReady.messages && !(Meteor.user().profile===null) && discussion.user != Meteor.user().profile.name) {
                sAlert.info('You have a new message!!!');
                 Meteor.defer(function () {
                   scrollChatToBottom();
                });
            }
        }
    });
};


scrollChatToBottom = function () {
    var pos = $("#scrollContainer").height();

    $("#discussionContainer").scrollTop(pos);
};
