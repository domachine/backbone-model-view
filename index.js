module.exports = BackboneModelView;

//
// Initialize a new view.
//
function BackboneModelView(el, model, ctx) {
  if (!(this instanceof BackboneModelView)) {
    return new BackboneModelView(el, model);
  }

  this.el = el;
  this.model = model;
  this.ctx = ctx || this;
};

//
// Map an attribute on the view.
//
BackboneModelView.prototype.map = function map(attr, fn) {
  var nodeList = this.el.querySelectorAll('[' + attr + ']');

  for (var i = 0; i < nodeList.length; ++i) {
    this._mapElement(nodeList[i], attr, fn);
  }
  return this;
};

//
// Map an attribute on the view only once.
//
BackboneModelView.prototype.mapOnce = function map(attr, fn) {
  var el = this.el.querySelector('[' + attr + ']');

  if (!el) return this;
  this._mapElement(el, attr, fn);
};

BackboneModelView.prototype._mapElement = function(el, attr, fn) {
  var property = el.getAttribute(attr);
  var model = this.model;
  var changed = (
    model.changedAttributes() === false ||
      model.changedAttributes()[property]
  );

  if (changed) {
    fn.call(this.ctx, el, property, this.model.get(property));
  }
};
