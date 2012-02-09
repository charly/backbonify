//
//
// EDIT INLINE : maybee should inherit from a ShowPerfView
//
<%= view_namespace %> = <%= view_namespace %> || {};

<%= view_namespace %>.ShowView = Grid.EditView.extend({
  tagName : "tr",
  className : "new_<%= singular_name %>",
  template : JST["templates/<%= plural_name %>/show"],
  cell : null,
  attribute : null,
  inputTag : null,


  noop:null
});

//_.extend(App.Edit<%= singular_name.capitalize %>View.prototype, App.FormHelpers);
