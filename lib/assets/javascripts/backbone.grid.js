var Grid = {};

// ===================================================
// # PageView : fetches collections listens to newView
// ===================================================
// ## Main actions
// -----------------
// .render()
// .refreshIndex() event :'change .submenu'
// .addToIndex() event : 'reset' by a collection
// .displayNew() event : 'click .submenu'
//
// ##Requirements (must be defined on 'host') :
// --------------------------------------------
// .indexView() : needs to be defined on host
// .newView() : needs to be defined on host
// data : property needs definition in host
//
Grid.PageView = function(options){
  Backbone.View.apply(this, [options]);
};

_.extend(Grid.PageView.prototype, Backbone.View.prototype, {

  render: function() {
    $(this.el).html(this.template({length: this.collection.length}))
    $(this.newView.render().el).hide().appendTo(this.el);
    $(this.indexView.el).appendTo(this.el);
    return this;
  },

  display: function() {
    this.render();
    $(this.el).hide();
    $("#content").append(this.el)
    this.slide()
  },

  slide: function() {
    $(this.el).fadeIn("fast")
  },

  // Index View
  refreshIndex : function(event) {
    var year = $(event.currentTarget).prop("value");
    this.indexView.collection.fetch({data: {year: year}})
  },

  // New View
  displayNew : function(event){
    event.preventDefault();
    this.$(this.newView.el).slideToggle()
  }

});

Grid.PageView.extend = Backbone.View.extend;


// ==================================
// # IndexView : rendered by PageView
// ===================================
//
// ## Main Actions
// ----------------
// .render()
//
// ## Requirements
// ----------------
// collection
// template
//
Grid.IndexView = function(options){
  var events = {
    "click tr[class!='edit'] td, tr[class!='month'] td" : "edit",
    "mouseover tr" : "highlightStatus",
    "mouseout tr" : "downlightStatus"
  };

  Backbone.View.apply(this, [options]);

  this.delegateEvents(events);
  this.collection.bind("reset", this.render, this);
  this.collection.bind("add", this.render, this);
  this.collection.bind("filter", this.render, this);
};

_.extend(Grid.IndexView.prototype, Backbone.View.prototype, {

  render : function() {
    var html = this.template({collection: this.collection.toJSON()});
    $(this.el).html(html)
    return this;
  },

  edit : function(event) {
    this._setModelFromRow(event);
    var p = new this.editView({model: this.model, el: this.row});
    p.editCell(event);
  },

  // convienence method to extract the models id from tr#id
  _setModelFromRow : function(event){
    var $cell = this.$(event.currentTarget);
    this.row  = $cell.closest("tr");
    this.row.addClass("edit");
    var model_id = this.row.attr("id").replace(/[a-z].*_/, "");
    this.model = this.collection.get(model_id);
  },

  highlightStatus: function(event) {
    $(event.currentTarget).addClass("bgyellow")
  },

  downlightStatus: function(event) {
    $(event.currentTarget).removeClass("bgyellow")
  },

  donothing: function() {}
});

Grid.IndexView.extend = Backbone.View.extend;



// =====================================================
// # NewView : handles displaying formtriggers 'created'
// =====================================================
//
// ## Main actions
// -----------------
// .render()
// .createModel() : 'submit'
//
// ## Requirements:
// -------------------
// _formHelpers() : needs to be defined on host
// model property needs definition in host
//
Grid.NewView = function(options) {
  var events = {
    "submit": "createModel"
  };

  Backbone.View.apply(this, [options]);

  this.delegateEvents(events);
  if(this.collection) this.collection.bind("created", this.notifyCreated, this)
  this.model.bind("error", this.notifyError, this);
};

_.extend(Grid.NewView.prototype, Backbone.View.prototype, {
  // renders a nice form below the header
  render: function(){
    var html = this.template(this.model.toJSON());
    $(this.el).html(html);
    if(this._fomrHelpers) this._formHelpers();

    return this;
  },

  // creates the performance from the form and adds it to collection
  createModel: function(event) {
    event.preventDefault();
    var self = this, attrs = this.gatherInputs();
    this.$("input[type='submit']").prop("disabled", true)

    this.collection.create(attrs, {
      success: function(){
        self.collection.trigger("created", self.collection)
      },
      error: function() { self.notifyError() }
    });
  },

  gatherInputs: function() {
    var attrs = _.reduce(this.$("input[id],textarea"), function(memo, input){
      var k = $(input).prop("name").replace(/[a-z_].*\[([a-z].*)\]/, "$1")
      memo[k] = $(input).val() || $(input).text();
      return memo;
    }, {})
    return attrs;
  },

  notifyCreated: function(collection) {
    var self = this;
    _.delay(function() {self.$("input[type='submit']").prop("disabled", false)}, 3000)
    $.noticeAdd({text: "Succesfully created, Yo!"})
  },

  notifyError: function(collection) {
    _.delay(function() {self.$("input[type='submit']").prop("disabled", false)}, 3000)
    $.noticeAdd({text: "Error yo, put a date or a film or something"})
  }

});

Grid.NewView.extend = Backbone.View.extend;


// ====================================================
// # EditView : opens an input on a the dblclicked cell
// ====================================================
//
// ## Main Actions
// -----------------
// .editCell() : "dblclick td"
// .updateModel() => REFACTOR !!!!!!
//
// ## Requirements (must be defined on 'host') :
// -----------------------------------------------
// _formHelpers() : extra stuff like jquery-ui stuff
//
Grid.EditView = function(options) {

  var events = {
    "click input,textarea" : "donothing",
    "dblclick input,textarea" : "donothing",
    "click td" : "editCell",
    "keypress input,textarea" : "keypress",
    "keyup input,textarea" : "keypress"
  };

  Backbone.View.apply(this, [options]);

  this.delegateEvents(events);

};

_.extend(Grid.EditView.prototype, Backbone.View.prototype, {


  editCell : function(event) {
    event.stopImmediatePropagation();
    this.cell = $(event.currentTarget);
    this.attribute = this.cell.attr("class");

    var inputTemplate = this._createInputTemplate();
    if(inputTemplate == false) return;
    // We only have Handlebar runtime no compiling available
    //var template = Handlebars.compile(inputTemplate);
    var compiled = _.template(inputTemplate);
    this.inputTag = template( this.model.toJSON() );

    // setting height & width
    var width = this._cellWidth();
    var height = this._cellHeight();
    if( $(this.inputTag).prop("type") != "checkbox" ){
      this.inputTag = $(this.inputTag).width(width - 10);
      //this.inputTag = $(this.inputTag).height(height - 6);
    }

    // renders the input tag
    this.cell.html(this.inputTag);
    $(this.inputTag).focus();

    this._formHelpers()
    this._orchestrasAutocomplete();

    return this;
  },

  // calculates cell width so it can be applied on the input tag
  _cellWidth : function() {
    var width  = this.cell.width();
    this.cell.width(width);
    return width;
  },

  _cellHeight : function(){
    var height = this.cell.height();
    //this.cell.height(height);
    return height
  },

  gatherInputs: function() {
    var attrs = _.reduce(this.$("input,textarea"), function(memo, input){
      memo[$(input).attr("name")] = $(input).val() || $(input).text();
      return memo;
    }, {})
    return attrs;
  },

  // gathers all the inputs tag of a row and sets the attributes of the model
  updateModel : function() {
    var self = this,
        attrs = this.gatherInputs()
    this.model.save(attrs, {
      success: function() { self.renderRow(); self.model.trigger("saved"); },
      error:   function() { alert("error") }
    });
  },

  // renders a clean row after an update (or a create ?)
  renderRow : function(){
    var html = this.template(this.model.toJSON());
    $(this.el).html(html);
  },

  // just a wrapper to call updateModel
  keypress: function (event) {
    if (event.which == 13) { // retrun
      event.preventDefault();
      event.stopImmediatePropagation();
      this.updateModel();
    } else if (event.which == 27) { // escape
      event.stopImmediatePropagation();
      this.renderRow();
    }
  },

  donothing : function(event) {
    event.stopImmediatePropagation();
  },

  noop: null
});

Grid.EditView.extend = Backbone.View.extend;

