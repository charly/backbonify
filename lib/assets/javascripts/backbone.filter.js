//     Backbone.filter.js 0.1.0

//     (c) 2012 Charlie Sistovaris
//     Backbone.grid may be freely distributed under the MIT license.



var Filter = {
  initialModels: null,
  filteredAttrs: [],

  // ADD this in the collection
  initialize: function() {
    this._prepareFiltering();
  },

  //
  // FILTERING
  //
  _prepareFiltering: function() {
    this.originalCollection  = new Backbone.Collection;
    this.previousCollection  = new Backbone.Collection;
    this.filterCollection = this;
    this.on("reset", this.resetAllCollections, this)
  },

  //filterAttr("film", "city") instead of filterFilms("city")
  filterAttr: function(attribute, query) {
    this.handleFilters(attribute, query);

    var reg = new RegExp(query,"i");
    this.filtering(function(model){
      var attrValue = model.get(attribute);
      if(attrValue && attrValue.match(reg)) return model;
    })
  },

  // previousCollection keeps track of the previous result so
  // it can *refilter* on that one (it should be an array actually)
  // TODO : consider having a filter for each attribute......
  handleFilters: function(attribute, query) {
    if(query == "") {
      this.filterCollection = this.originalCollection
    }
    else if(this.previousAttr==attribute) {
      this.filterCollection = this.previousCollection
    }
    else {
      this.filterCollection = this;
    }
    this.previousCollection.reset(this.filterCollection.models);
    this.previousAttr = attribute;
  },

  filtering: function(criteria) {
    this.reset(this.filterCollection.select(criteria), {silent: true})
    this.trigger("filter");
  },

  // loadedCollection is a copy of this collection to store
  // the original models before they get filtered
  resetAllCollections: function(event) {
    this.originalCollection.reset(this.models);
    this.previousCollection.reset(this.models);
  }

}
