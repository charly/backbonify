//
// SHOW : <%= singular_name.capitalize %>
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

//_.extend(<%= view_namespace %>.EditView.prototype, <%= js_app_name %>.FormHelpers);
