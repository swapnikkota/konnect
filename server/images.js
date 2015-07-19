
var imgStorage = new FS.Store.S3("images", {
  /* REQUIRED */
  region : "ap-southeast-1",
  accessKeyId: "AKIAJN3ESPZRIOVHO6SA",
  secretAccessKey: "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",
  bucket: "konnect-items"
});

BucketImages = new FS.Collection("bucketimages", {
  stores: [imgStorage],
  filter: {
    allow: {
      contentTypes: ['image/*']
    }
  }
})

// Allow rules
BucketImages.allow({
  insert: function() { return true; },
  update: function() { return true; },
  download: function() { return true; }
});
