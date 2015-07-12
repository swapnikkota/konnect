(function(){
Template.__checkName("itemslist");
Template["itemslist"] = new Template("Template.itemslist", (function() {
  var view = this;
  return HTML.DIV({
    "class": "container itemslist well"
  }, "\n\n			", HTML.DIV({
    "class": "row"
  }, "\n\n				", HTML.Raw('<div class="col-lg-12">\n					<h2 class="page-header">Items Gallery</h2>\n				</div>'), "\n			\n			  ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("images"));
  }, function() {
    return [ "\n				", HTML.DIV({
      "class": "col-lg-3 col-md-4 col-xs-6 thumb"
    }, "\n					", Blaze.View("lookup:..metadata.itemName", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "metadata", "itemName"));
    }), "\n					", HTML.A({
      "class": "thumbnail",
      href: "#"
    }, "\n						", HTML.IMG({
      "class": "img-responsive",
      src: function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "url"));
      },
      alt: ""
    }), "\n					"), "\n				"), "\n			 " ];
  }), "\n			"), "\n	");
}));

})();
