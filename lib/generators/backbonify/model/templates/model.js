//
// MODEL
//
<%= model_namespace %> = Backbone.Model.extend({
  paramRoot: '<%= singular_table_name %>',
  urlRoot: '<%= route_url %>',

  defaults: {
<% attributes.each do |attribute| -%>
    <%= attribute.name %>: null,
<% end -%>
    noop:null
  }

})

<%= collection_namespace %> = Backbone.Collection.extend({
  model: <%= model_namespace %>,
  url: '<%= route_url %>',

  // A small decorator for 'fetch' to retain last data passed to it
  fetch: function(options) {
    this.fetchOptions = options || {};
    Backbone.Collection.prototype.fetch.call(this, options);
  },

  // default_fetch uses the last data past to fetch to reload accordingly
  default_fetch: function() {
    this.fetch(this.fetchOptions)
  }

})

_.extend(<%= collection_namespace %>.prototype, Filter);

