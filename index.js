/**
 * Module dependencies.
 */

var Emitter = require('emitter');

/**
 * Export `List`.
 */

module.exports = List;

/**
 * Initialize a new `List`.
 *
 * @param {Function} View  Constructor for the list's items.
 */

function List (View) {
  this.View = View;
  this.models = {};
  this.elements = {};
  this.views = {};
  //this.list = dom([]);
  this.el = document.createElement('ul');
  this.el.className = 'content topcoat-list';
}

/**
 * Use a given `plugin`.
 *
 * @param {Function} plugin
 */

List.use = function (plugin) {
  plugin(this);
  return this;
};

/**
 * Mixin emitter.
 */

Emitter(List.prototype);

/**
 * Add an item to the list.
 *
 * @param {Model} model
 */

List.prototype.add = function (model) {
  var id = model.primary(), el, view;
  if (this.views[id]) {
    //console.log(this.views);
  } else {
    view = new this.View(model);
    this.el.appendChild(view.el);
    this.views[id] = view;
  }
  return this;
};

/**
 * Remove an item from the list.
 *
 * @param {String} id
 */

List.prototype.remove = function (id) {
  var view = this.views[id];
  if (view) {
    this.el.removeChild(view.el);
    this.emit('remove', view);
    delete this.views[id];
    if (!view.el) return this;
  }
  //this.list = this.list.reject(function (item) { el === item.get(0); });  
  return this;
};

/**
 * Filter the list's elements by hiding ones that don't match.
 *
 * @param {Function} fn  Filtering function.
 */

List.prototype.filter = function (fn) {
  //this.list.removeClass('hidden');
  //this.list.reject(fn).addClass('hidden');
  return this;
};

/**
 * Empty the list.
 */

List.prototype.empty = function () {
  for (var id in this.views) {
    this.remove(id);
  }
  return this;
};
