(function(){
Template.__checkName("itemSearch");
Template["itemSearch"] = new Template("Template.itemSearch", (function() {
  var view = this;
  return [ HTML.DIV({
    id: "headerwrap",
    "class": "container"
  }, "\n		", HTML.HEADER({
    "class": "clearfix"
  }, "\n			", HTML.DIV({
    "class": "container-fluid"
  }, "\n		        ", HTML.DIV({
    "class": "row centered-form"
  }, "\n							", HTML.Raw('<p class="p_text_shadow"><strong>Share items with your neighbours</strong></p>'), "\n	        ", HTML.DIV({
    "class": "col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4"
  }, "\n		        	", HTML.DIV({
    "class": "panel panel-default"
  }, "\n		        		", HTML.Raw('<div class="panel-heading">\n					    		<h3 class="panel-title">Enter an item you wish to borrow.<small></small></h3>\n					 			</div>'), "\n					 			", HTML.DIV({
    "class": "panel-body"
  }, "\n					    		", HTML.FORM({
    ole: "form"
  }, "\n					    			", HTML.DIV({
    "class": "form-group"
  }, "\n											", HTML.Raw('<input type="text" id="itemDesc" name="itemDesc" class="form-control input-lg" placeholder="e.g. Toolbox" required="">'), "\n											", HTML.P(HTML.SPAN({
    "class": "help-block"
  }, Blaze.View("lookup:errorMessage", function() {
    return Spacebars.mustache(view.lookup("errorMessage"), "itemDesc");
  }))), "\n										"), "\n										", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "borrow");
    },
    id: "borrow",
    "class": "btn btn-lg btn-success custom-btn-size"
  }, " Borrow ", HTML.Raw('<span class="glyphicon glyphicon-circle-arrow-left"></span>')), "\n					    		"), "\n									", HTML.DIV({
    "class": "row"
  }, "\n										", HTML.Raw('<label class="">Have things to Lend?</label>'), HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "lend");
    },
    id: "lend"
  }, HTML.Raw('<span class="text-info"><strong> <u>Start Here</u></strong></span>')), "\n									"), "\n					    	"), "\n			    		"), "\n		    		"), "\n		    	"), "\n		    "), "\n	"), "\n	"), "\n	", Spacebars.include(view.lookupTemplate("greywrap")) ];
}));

})();
