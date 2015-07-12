(function(){
Template.__checkName("header");
Template["header"] = new Template("Template.header", (function() {
  var view = this;
  return HTML.DIV({
    id: "navbar-main"
  }, HTML.Raw("\n\n      <!-- Fixed navbar -->\n    "), HTML.DIV({
    "class": "navbar navbar-inverse navbar-fixed-top"
  }, "\n      ", HTML.DIV({
    "class": "container"
  }, "\n       ", HTML.Raw('<div class="navbar-header">\n        <a class="navbar-brand" href="/">Konnect</a>\n        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">\n            <span class="sr-only">Toggle navigation</span>\n            <span class="icon-bar"></span>\n            <span class="icon-bar"></span>\n            <span class="icon-bar"></span>\n        </button>\n        </div>'), "\n        ", HTML.DIV({
    "class": "navbar-collapse collapse"
  }, "\n          ", HTML.Raw('<ul class="nav navbar-nav"></ul>'), "\n		        ", HTML.UL({
    "class": "nav navbar-nav navbar-right"
  }, "\n            ", Spacebars.include(view.lookupTemplate("loginButtons")), " ", HTML.Raw("<!-- here -->"), "\n          "), "\n        "), HTML.Raw("<!--/.nav-collapse -->"), "\n      "), "\n    "), "\n    ");
}));

})();
