Template.chat_input.events({

    'click #btn-chat' : function(event) {

		var conversationId =  event.target.getAttribute("data-id");
		if(!conversationId){
			conversationId = Session.get('selectedConversationId');
		}
		if(conversationId){
			var discussionMsg = $("#_textarea" );
			if(!discussionMsg || !discussionMsg.val()){
				discussionMsg = $("#selectedConversation").closest("div[id]").children().find("#_textarea");
			}
			if(!discussionMsg || !discussionMsg.val()) {
				return;
			}

			itemId = Session.get("itemId");
			var data = {"itemId":itemId,"message":discussionMsg.val(), "conversationId" : conversationId};
			Meteor.call("insertDiscussion", data);
			$("#_textarea").val('');
			scrollChatToBottom();
			 $("#selectedConversation").closest("div[id]").children().find("#_textarea").val('');
			 $("#selectedConversation").closest("div[id]").children().find("#_textarea").focus();
			$("#_textarea" ).focus();
			autoGrowChatTxt();
		} else{
			var discussionMsg = $("#itmDiscuss").find("#_textarea");
			if(!discussionMsg || !discussionMsg.val()) return;

			itemId = Session.get("itemId");
			var data = {"itemId":itemId,"message":discussionMsg.val()};
			Meteor.call("insertDiscussion", data);
			discussionMsg.val('');
			scrollChatToBottom();
			discussionMsg.focus();
			autoGrowChatTxt();
		}
         
    }
});


Template.chat_input.created = function () {
    $('#btn-input').keyup(throttled);
   autoGrowChatTxt();

};

function autoGrowChatTxt() {
 /* var opts = {
         animate: false
    };
    $('#btn-input').autogrow(opts);   */
}


function updateTypingActivity() {
     console.log("typing");
      /*  var timestamp = new Date();
        Meteor.users.update({_id: Meteor.userId()}, {
            $set: {
                "status.lastTyping": timestamp
            }
        });*/

    }

var throttled = _.throttle(updateTypingActivity, 1000);
