//= require_self
//= require_tree ./templates
//= require_tree ./models
//= require_tree ./views
//= require_tree ./routers

window.<%= js_app_name %> = {
  Models: {},
  Collections: {},
  Routers: {},
  Views: {},

  init: function(){
    window.root = this;
    // new MyApp.Routers.MyRouter;
    Backbone.history.start();
  }

}
