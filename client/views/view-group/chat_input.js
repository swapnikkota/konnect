Template.chat_input.events({

    'click #btn-chat' : function() {

         var discussionMsg = $('#btn-input');

        if(!discussionMsg || !discussionMsg.val()) return;

        itemId = Session.get("itemId");

        var data = {"itemId":itemId,"message":discussionMsg.val()};
        Meteor.call("insertDiscussion", data)

        $('#btn-input').val('');
        scrollChatToBottom();
        $('#btn-input').focus();
        autoGrowChatTxt();
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
