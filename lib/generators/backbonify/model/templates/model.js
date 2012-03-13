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
  url: '<%= route_url %>'

})

_.extend(<%= collection_namespace %>.prototype, Filter);

