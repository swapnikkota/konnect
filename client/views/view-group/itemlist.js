Template.itemslist.onCreated(function() {
  
});




Template.itemslist.helpers({
    photo: function () {
      return Session.get('searchResults').pic;
    }
  });
  
