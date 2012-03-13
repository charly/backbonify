//
// NEW
//
<%= view_namespace %> = <%= view_namespace %> || {};

<%= view_namespace %>.NewView = Grid.NewView.extend({
  id: "new_<%= singular_name %>",
  className: "new_view",
  template : JST["templates/<%= plural_name %>/new"],

  initialize: function() {
    //if(this.collection) this.collection.bind("created", this.onCreate, this)
  },

  onCreate: function() {
    //console.log("onCreate called... index re-rendered ?")
  }


});

//_.extend(App.Edit<%= singular_name.capitalize %>View.prototype, App.FormHelpers);