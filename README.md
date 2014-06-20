# backbone-model-view

This is a tiny module to ease the construction of views in backbone.

I'm a fan of using no template engine for dynamically rendering a view
in backbone for gaining better performance. This helper takes a little
bit of the boilerplate. Use it with
[browserify](http://github.com/substack/node-browserify).

## Installation

    $ npm install backbone-model-view

## Test

    $ git clone git://github.com/domachine/backbone-model-view.git
    $ cd backbone-model-view/
    $ npm install
    $ npm test

## Usage

```js
var View = require('backbone-model-view');

var MyView = Backbone.View.extend({
  el: '#my-view',
  template: '<h1 data-text="title"></h1>',

  initialize: function() {
    this.el.innerHTML = this.template;
    this.view = View(this.el, this.model);
  }

  render: function() {
    this.view
      .map('data-text', function(el, name, value) {
        el.textContent = value;
      });
  }
});
```

Notice that the mapping is only applied to changed
model-properties. If the property hasn't changed the function isn't
called. So multiple calls to `.render()` without changed data do
nothing.

## API

### BackboneModelView#map(attr, fn)

Searches for all elements with the attribute `attr` and applies `fn`
to it. But this is only done if the model-property with the name of
the value of the attribute has been changed.

### BackboneModelView#mapOnce(attr, fn)

Does the same as `#map()` but searches only the first element and maps
it.
