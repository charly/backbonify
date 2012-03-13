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

  initialize : function() {
    var self = this;
    this.model.bind("sync", this.renderRow, this);
    //this.slowSaving = _.debounce(function(){ self.model.save() }, 1100);
  },


  _createInputTemplate : function() {
    if( this.cell.hasClass('address') ) {
      return "<textarea style='height:25px' name='address'>{{address}}</textarea>"
    } else {
      return '<input id="<%= singular_name %>_' + this.attribute +
        '" value="<%%=' + this.attribute +
        '%>" name="' + this.attribute + '" />'
    }
  },

  noop:null
});

//_.extend(App.Edit<%= singular_name.capitalize %>View.prototype, App.FormHelpers);