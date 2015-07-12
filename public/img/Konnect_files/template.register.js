(function(){
Template.__checkName("register");
Template["register"] = new Template("Template.register", (function() {
  var view = this;
  return HTML.Raw('<!-- ==== HEADERWRAP ==== -->\n	<div id="register" class="row container-fluid">\n		<div class="col-md-4 col-md-offset-4">\n		  <form class="form-horizontal" role="form">\n			<fieldset>\n			  <!-- Form Name -->\n			  <legend>Address Details</legend>\n\n			  <!-- Text input-->\n			  <div class="form-group">\n				<label class="col-sm-2  col-xs-6 control-label" for="textinput">Street</label>\n				<div class="col-sm-10 col-xs-6">\n				  <input type="text" placeholder="Street" class="form-control">\n				</div>\n			  </div>		  \n\n			  <!-- Text input-->\n			  <div class="form-group">\n				<label class="col-sm-2 col-xs-6 control-label" for="textinput">Unit</label>\n				<div class="col-sm-4 col-xs-6">\n				  <input type="text" placeholder="Unit" class="form-control">\n				</div>\n\n				<label class="col-sm-2 col-xs-6 control-label" for="textinput">Block </label>\n				<div class="col-sm-4 col-xs-6">\n				  <input type="text" placeholder="Block" class="form-control">\n				</div>\n			  </div>\n			  \n			 	  \n\n			  <div class="form-group">\n				<div class="col-sm-offset-2 col-sm-10">\n				  <div class="pull-right">\n					<button type="submit" class="btn btn-default">Cancel</button>\n					<button type="submit" class="btn btn-success">Save</button>\n				  </div>\n				</div>\n			  </div>\n\n			</fieldset>\n		  </form>\n		</div><!-- /.col-lg-12 -->\n	</div><!-- /.row -->');
}));

})();
