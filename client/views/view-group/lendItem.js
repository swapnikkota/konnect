Template.lendItem.onCreated(function() {
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

var img;
var myDropzone;
Template.uploadActions.rendered = function(){

    var arrayOfImageIds = [];
   // Dropzone.autoDiscover = false;

    // Adds file uploading and adds the imageID of the file uploaded
	var previewNode = document.querySelector("#template");
	previewNode.id = "";
	var previewTemplate = previewNode.parentNode.innerHTML;
	previewNode.parentNode.removeChild(previewNode);

	//if(!document.body.dropzone){
		myDropzone = new Dropzone(document.querySelector(".item-form"), {
			// Make the whole body a dropzone
		  url : 'cfs/files',
		  thumbnailWidth: 80,
		  thumbnailHeight: 80,
		  parallelUploads: 20,
		  autoProcessQueue : false,
		  previewTemplate: previewTemplate,
		  autoDiscover  : true,
		  autoQueue: false, // Make sure the files aren't queued until manually added
		  previewsContainer: "#previews", // Define the container to display the previews
		  clickable: ".fileinput-button" // Define the element that should be used as click trigger to select files.
		});

		myDropzone.on("addedfile", function(file) {
			 img =  file;
		});
	//}
	

};


Template.lendItem.helpers({
    photo: function () {
      return Session.get("photo");
    },
	loc: function () {
       //return 0, 0 if the location isn't ready
      //return Geolocation.latLng() || { lat: 0, lng: 0 };
    }
    //error: Geolocation.error
  });

var addItem = function(event,template){
	event.preventDefault();
	var errors = {};
	 var itemDesc = template.find('#itemDesc').value;
	 var itemName = template.find('#itemName').value;
	 if (!itemDesc){
		 errors.itemDesc = "Please specify item description.";
	 }
	 if (!itemName){
		 errors.itemDesc = "Please specify item Name.";
	 }
	 if(!$.isEmptyObject(errors))
		return Session.set('itemLendErrors', errors);
	
	if(Meteor.user().profile == null || Meteor.user().profile.address == null || Meteor.user().profile.address.loc == null){
		alert("Please complete address details to upload");
		return;
	}
	
	var userLoc = Meteor.user().profile.address.loc;
	var imgFile = img;
	fsFile = {};
	if(Session.get('photo')){
		fsFile = new FS.File(Session.get('photo'));
	}else{
		fsFile = new FS.File(imgFile);
	}
	//fsFile = new FS.File(imgFile);
	fsFile.userLocation  = userLoc;
	
	fsFile.ownerId = Meteor.userId();
	fsFile.itemDesc = itemDesc.toLowerCase();
	fsFile.itemName = itemName.toLowerCase();
	fsFile.neighborhood = Meteor.user().profile.address.neighborhood;
	BucketImages.insert(fsFile, function(err, fileObj){					
		if(err){
		  console.log(err);
		} else {
		  // gets the ID of the image that was uploaded
		  var imageId = fileObj._id;
		  template.find('.photo').src = '';	
		  Session.setPersistent('photo','');
		 // console.log(fileObj.metadata);
		  myDropzone.removeAllFiles(true);
		};
	});
	template.find('#itemDesc').value = '';	
	template.find('#itemName').value ='';
	/*var errors = validateAddItem(itemToFind);
	if (errors.itemDesc)
	  return Session.set('itemLendErrors', errors);*/

}



var saveImage = function(error, data){
	console.log(data);
	Session.setPersistent("photo", data);
	var item = {pic : data, itemDesc : "testImage"};
	/*Meteor.call('addItem', item, function(error) {

    });*/
}

Template.lendItem.events({
  'click #lend': function(event, template) {
   addItem(event, template);
  },
  "submit": function (event, template) {
	addItem(event, template);
  },
  'click .takePhoto': function(event, template) {
        var cameraOptions = {width : 100 , height : 200, quality : 100};
		//var pic = MeteorCamera.getPicture(cameraOptions, saveImage);
        MeteorCamera.getPicture(cameraOptions, function (error, data) {
           if (!error) {
               template.$('.photo').attr('src', data); 
			   Session.set("photo", data);
           }
        });
        event.preventDefault();
    }

});



var imgStorage = new FS.Store.S3("images");

BucketImages = new FS.Collection("bucketimages", {
 stores: [imgStorage],
 filter: {
   allow: {
     contentTypes: ['image/*']
   },
   onInvalid: function(message) {
     console.error(message);
   }
 }
});

// Allow rules
BucketImages.allow({
  insert: function() { return true; },
  update: function() { return true; },
  download: function() { return true; }
});
