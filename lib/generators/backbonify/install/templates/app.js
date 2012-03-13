//= require_self
//= require_tree ./templates
//= require_tree ./models
//= require_tree ./views
//= require_tree ./routers

var <%= js_app_name %> = (function(){


  var initialize = function(){
    initializeCollections();
    startListening();

    //new <%= js_app_name %>.Routers.SomeRouter;
    Backbone.history.start();
  }

  var initializeCollections = function() {
    //app.collection = new <%= js_app_name %>.Collections.SomeCollection;
  }

  var startListening = function() {
    //app.collection.on("sync", notifySync)
    //app.collection.on("error", notifyError)
  }

  var notifySync = function(collection) {
    $.noticeAdd({text: "Succesfully saved, Yo!"})
  }

  var notifyError = function(collection) {
    //_.delay(function() {self.$("input[type='submit']").prop("disabled", false)}, 3000)
    $.noticeAdd({text: "Error yo, put a date or a film or something"})
  }

  var app = {
    init : initialize,
    Models: {},
    Collections: {},
    Routers: {},
    Views: {}
  };


  return app;

})()
