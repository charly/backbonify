//
// Router
//
<%= router_namespace %>Router = Backbone.Router.extend({
  routes : {
    "<%= plural_name %>" : "index",
    "<%= plural_name %>/:id" : "show"
  },

  page: null,

  initialize : function() {
    this.page = new <%= "#{view_namespace}.#{'page'.camelize}View()" %>
    this.page.display();
  },

  index : function(){
    $("#orchestraPage, #contractPage").hide()
    this.page.slide()
  },

  show : function(id) {}

});