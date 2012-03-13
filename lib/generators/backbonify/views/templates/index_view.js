//
// INDEX : <%= singular_name %>
//
<%= view_namespace %> = <%= view_namespace %> || {};

<%= view_namespace %>.IndexView = Grid.IndexView.extend({
  id: "<%= plural_name %>",
  template : JST["templates/<%= plural_name %>/index"],

  initialize: function(){
    this.editView = <%= view_namespace %>.EditView;
  },

  noop: null
});