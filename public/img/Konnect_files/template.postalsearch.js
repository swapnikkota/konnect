(function(){
Template.__checkName("postalsearch");
Template["postalsearch"] = new Template("Template.postalsearch", (function() {
  var view = this;
  return HTML.Raw('<div id="postalSearch" class="container-fluid">\n        <div class="row centered-form">\n        <div class="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">\n        	<div class="panel panel-default">\n        		<div class="panel-heading">\n			    		<h3 class="panel-title">Pick your neighbourhood<small></small></h3>\n			 			</div>\n			 			<div class="panel-body">\n			    		<form action="#" role="form">\n			    			<div class="form-group">\n									<input type="text" id="postalCode" name="postalCode" class="form-control input-lg" placeholder="Enter your postal code" required="">\n			    			</div>\n								<input type="submit" value="Continue" class="btn btn-success btn-block">\n  						</form>\n			    	</div>\n	    		</div>\n    		</div>\n    	</div>\n    </div>');
}));

})();
