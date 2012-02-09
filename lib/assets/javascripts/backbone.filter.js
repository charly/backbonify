// TODO : a mixin for pageViewfiltering
//var pageViewfiltering = {
//  filter: function(event) {
//    if (event.which == 13) {
//      var a = this.getAttrValue(event)
//      this.collection.filterAttr(a[0], a[1])
//    }
//  },
//
//  showLength:function() {
//    this.$("#collectionLength").text(this.collection.length)
//  },
//
//  // helper to get the attr 'film' out of name='performance[film]'
//  getAttrValue: function(event) {
//    var $target = $(event.currentTarget),
//        query   = $target.val(),
//        attr    = $target.prop("name").replace(/[a-z_].*\[([a-z].*)\]/, "$1")
//    return [attr, query]
//  }
//}


var Filter = {
  // ADD this in the collection
  //initialize: function() {
  //  this._prepareFiltering();
  //}

  //
  // FILTERING
  //
  _prepareFiltering: function() {
    this.originalCollection  = new Backbone.Collection;
    this.previousCollection  = new Backbone.Collection;
    this.filterCollection = this;
    this.bind("reset", this.setOriginalCollection, this)
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
  // it can refilter on that one (it should be an array actually)
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
  setOriginalCollection: function(event) {
    this.originalCollection.reset(this.models)
  }

}
