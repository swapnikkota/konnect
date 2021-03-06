(function(){Template.lendItem.onCreated(function() {
  Session.set('itemLendErrors', {}); 
});

Template.lendItem.helpers({
  errorMessage: function(field) {
    return Session.get('itemLendErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('itemLendErrors')[field] ? 'has-error' : '';
  }
});

Meteor.subscribe("items");

var saveImage = function(error, data){
	console.log(data);
	Session.set("photo", data);
	var item = {pic : data, itemDesc : "testImage"};
	Meteor.call('addItem', item, function(error) {
    
    });
}

var img;
var myDropzone;
Template.uploadActions.rendered = function(){

    var arrayOfImageIds = [];

    Dropzone.autoDiscover = false;

    // Adds file uploading and adds the imageID of the file uploaded
   
	var previewNode = document.querySelector("#template");
	previewNode.id = "";
	var previewTemplate = previewNode.parentNode.innerHTML;
	previewNode.parentNode.removeChild(previewNode);

	myDropzone = new Dropzone(document.body, {
		// Make the whole body a dropzone
	  url : 'cfs/files',
	  thumbnailWidth: 80,
	  thumbnailHeight: 80,
	  parallelUploads: 20,
	  autoProcessQueue : false,
	  previewTemplate: previewTemplate,
	  autoQueue: false, // Make sure the files aren't queued until manually added
	  previewsContainer: "#previews", // Define the container to display the previews
	  clickable: ".fileinput-button" // Define the element that should be used as click trigger to select files.
	});

	myDropzone.on("addedfile", function(file) {
		 img =  file;			  			
	});				
	
};


Template.lendItem.helpers({
    photo: function () {
      return Session.get("photo");
    },
	loc: function () {
      // return 0, 0 if the location isn't ready
      return Geolocation.latLng() || { lat: 0, lng: 0 };
    },
    error: Geolocation.error
  });
  
var addItem = function(event,template){
	event.preventDefault();    
	var imageOptions = {width : 100 , height : 200, quality : 100};
	//var pic = MeteorCamera.getPicture(imageOptions, saveImage);
	var imgFile = img;
	fsFile = new FS.File(imgFile);
					fsFile.metadata = {
						ownerId:"sagi",
						itemDesc:  template.find('#itemDesc').value,
						itemName : template.find('#itemName').value
						}
				ItemImages.insert(fsFile, function(err, fileObj){
					console.log(err);
					if(err){
					  alert("Error");
					} else {
					  // gets the ID of the image that was uploaded
					  var imageId = fileObj._id;
					  myDropzone.removeAllFiles(true);					 
					};
				});
				
	/*var errors = validateAddItem(itemToFind);
	if (errors.itemDesc)
	  return Session.set('itemLendErrors', errors);*/	
    
}
  
Template.lendItem.events({
  'click #lend': function(event, template) {
   addItem(event, template);
  },
  "submit": function (event, template) {
	addItem(event, template);
  }
  
});

})();
