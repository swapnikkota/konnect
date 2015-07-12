(function(){
Template.body.addContent((function() {
  var view = this;
  return HTML.Raw('<div class="container-fluid">\n</div>');
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("appBody");
Template["appBody"] = new Template("Template.appBody", (function() {
  var view = this;
  return [ Spacebars.include(view.lookupTemplate("header")), "\n", Blaze._TemplateWith(function() {
    return "workarea";
  }, function() {
    return Spacebars.include(view.lookupTemplate("yield"));
  }), "\n", Spacebars.include(view.lookupTemplate("footerwrap")) ];
}));

})();
