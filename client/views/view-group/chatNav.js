Template.chatNav.events({

  'click #dtls' : function() {
      $('#itmDiscuss').hide();
      $('#itmDtl').show();
  },

  'click #dscs' : function() {
      $('#itmDiscuss').show();
      $('#itmDtl').hide();
  }

});

Template.chatNav.created = function () {
    $('#itmDiscuss').hide();  
};
