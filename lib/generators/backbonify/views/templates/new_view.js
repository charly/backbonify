//
// NEW
//
<%= view_namespace %> = <%= view_namespace %> || {};

<%= view_namespace %>.NewView = Grid.NewView.extend({
  id: "new_<%= singular_name %>",
  className: "new_view",
  template : JST["templates/<%= plural_name %>/new"],

  initialize: function() {
    this.model = new <%= model_namespace %>;
  },

  render: function(){
    var html = this.template(this.model.toJSON());
    $(this.el).html(html);
    //this._formHelpers();
    //this._orchestrasAutocomplete();

    return this;
  }

});

//_.extend(App.Edit<%= singular_name.capitalize %>View.prototype, App.FormHelpers);