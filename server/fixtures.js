// Fixture data 
if (Items.find().count() === 0) {
  var now = new Date().getTime();
  
  
  for (var i = 0; i < 10; i++) {
    Items.insert({
      itemDesc: 'cycle' + i     
    });
  }
}