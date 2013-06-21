/**
 * Module dependencies.
 */

var dom = require('dom')
  , Emitter = require('emitter');

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
  this.list = dom([]);
  this.el = document.createElement('ul');
  this.el.className = 'content';
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
  var id = model.primary();
  var el = new this.View(model).el;
  this.models[id] = model;
  this.elements[id] = el;
  this.list.els.push(el);
  this.el.appendChild(el);
  this.emit('add', el);
  return this;
};

/**
 * Remove an item from the list.
 *
 * @param {String} id
 */

List.prototype.remove = function (id) {
  var model = this.models[id];
  var el = this.elements[id];
  delete this.models[id];
  delete this.elements[id];
  if (!model || !el) return this;
  this.list = this.list.reject(function (item) { el === item.get(0); });
  this.el.removeChild(el);
  this.emit('remove', model, el);
  return this;
};

/**
 * Filter the list's elements by hiding ones that don't match.
 *
 * @param {Function} fn  Filtering function.
 */

List.prototype.filter = function (fn) {
  this.list.removeClass('hidden');
  this.list.reject(fn).addClass('hidden');
  return this;
};

/**
 * Empty the list.
 */

List.prototype.empty = function () {
  for (var id in this.models) {
    this.remove(id);
  }
  return this;
};