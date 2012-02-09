//
// EDIT INLINE : maybee should inherit from a ShowPerfView
//
<%= view_namespace %> = <%= view_namespace %> || {};

<%= view_namespace %>.EditView = Grid.EditView.extend({
  tagName : "tr",
  className : "new_<%= singular_name %>",
  template : JST["templates/<%= plural_name %>/show"],
  cell : null,
  attribute : null,
  inputTag : null,

  _createInputTemplate : function() {
    if( this.cell.hasClass('address') ) {
      return "<textarea style='height:25px' name='address'>{{address}}</textarea>"
    } else {
      return '<input id="<%= singular_name %>_' + this.attribute +'" value="<%%=' + this.attribute + '%>" name="' + this.attribute + '" />'
    }
  },

  noop:null
});

//_.extend(App.Edit<%= singular_name.capitalize %>View.prototype, App.FormHelpers);