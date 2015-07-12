(function(){
Template.__checkName("lendItem");
Template["lendItem"] = new Template("Template.lendItem", (function() {
  var view = this;
  return HTML.DIV({
    "class": "container item-form well"
  }, "\n		", HTML.FORM({
    "class": "form-horizontal"
  }, "\n			", HTML.FIELDSET("\n\n			", HTML.Raw("<!-- Form Name -->"), "\n			", HTML.Raw("<legend>Item Details</legend>"), "\n\n			", HTML.Raw("<!-- Text input-->"), "\n			", HTML.Raw('<div class="form-group">\n			  <label class="col-md-4 control-label" for="itemName">Item Name</label>  \n			  <div class="col-md-4">\n			  <input id="itemName" name="itemName" type="text" placeholder="Item Name" class="form-control input-md" required="Please enter item name">\n				\n			  </div>\n			</div>'), "\n\n			", HTML.Raw("<!-- Textarea -->"), "\n			", HTML.DIV({
    "class": "form-group"
  }, "\n			  ", HTML.Raw('<label class="col-md-4 control-label" for="itemDesc">Item Descirption</label>'), "\n			  ", HTML.DIV({
    "class": "col-md-4"
  }, "                     \n				", HTML.TEXTAREA({
    "class": "form-control",
    id: "itemDesc",
    name: "itemDesc",
    placeholder: "Please enter description"
  }), "\n			  "), "\n			"), "\n			\n			", HTML.DIV({
    "class": "form-group"
  }, "\n			  ", HTML.Raw('<label class="col-md-4 control-label" for="itemDesc"></label>'), "\n			  ", HTML.DIV({
    "class": "col-md-4"
  }, "                     \n				", Spacebars.include(view.lookupTemplate("uploadActions")), "\n			  "), "\n			"), "\n\n			\n\n			", HTML.Raw("<!-- Button -->"), "\n			", HTML.Raw('<div class="form-group">\n			  <label class="col-md-4 control-label" for="singlebutton"></label>\n			  <div class="col-md-4">\n				<button id="singlebutton" name="singlebutton" class="btn btn-success">Lend</button>\n			  </div>\n			</div>'), "\n\n			"), "\n		"), " \n	   \n		 ", Spacebars.include(view.lookupTemplate("uploadPreview")), "\n		 \n		\n		 \n\n	");
}));

Template.__checkName("uploadActions");
Template["uploadActions"] = new Template("Template.uploadActions", (function() {
  var view = this;
  return HTML.Raw('<div id="actions" class="row">\n\n      <div class="col-lg-7">\n        <!-- The fileinput-button span is used to style the file input field as button -->\n        <span class="btn btn-success fileinput-button dz-clickable">\n            <i class="glyphicon glyphicon-plus"></i>\n            <span>Add files...</span>\n        </span>\n       \n      </div>\n\n      <div class="col-lg-5">\n        <!-- The global file processing state -->\n        <span class="fileupload-process">\n          <div id="total-progress" class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" style="opacity: 0;">\n            <div class="progress-bar progress-bar-success" style="width: 100%;" data-dz-uploadprogress=""></div>\n          </div>\n        </span>\n      </div>\n\n    </div>');
}));

Template.__checkName("uploadPreview");
Template["uploadPreview"] = new Template("Template.uploadPreview", (function() {
  var view = this;
  return HTML.Raw('<div class="table table-striped files" id="previews">\n \n  <div id="template" class="file-row">\n    <!-- This is used as the file preview template -->\n    <div>\n        <span class="preview"><img data-dz-thumbnail=""></span>\n    </div>\n    <div>\n        <p class="name" data-dz-name=""></p>\n        <strong class="error text-danger" data-dz-errormessage=""></strong>\n    </div>\n    <div>\n        <p class="size" data-dz-size=""></p>        \n    </div>\n    <div>\n     <button data-dz-remove="" class="btn btn-warning cancel">\n          <i class="glyphicon glyphicon-ban-circle"></i>\n          <span>Cancel</span>\n      </button>\n      <button data-dz-remove="" class="btn btn-danger delete">\n        <i class="glyphicon glyphicon-trash"></i>\n        <span>Delete</span>\n      </button>\n    </div>\n  </div>\n \n</div>');
}));

})();
