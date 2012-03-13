//
// Page
//
<%= view_namespace %> = <%= view_namespace %> || {};

<%= view_namespace %>.PageView = Grid.PageView.extend({
  id: "<%= singular_name %>Page",
  template: JST["templates/<%= plural_name %>/page"],
  data: {},
  events : {
    "click  .submenu a.reload" : "reloadIndex",
    "click  .submenu a.<%= singular_name %>" : "displayNew"
  },

  initialize: function() {
    this.collection = new <%= collection_namespace %>;
    this.collection.fetch({data: this.data});
    this.indexView = new <%= view_namespace %>.IndexView({collection: this.collection});
    this.newView = new <%= view_namespace %>.NewView({collection: this.collection});
  },

  noop : null
});
