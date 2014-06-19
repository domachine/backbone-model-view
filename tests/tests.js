var chai = require('chai');
var should = chai.should();

var Backbone = require('backbone');

describe('BackboneModelView', function() {
  var View;

  before(function() {
    View = require('..');
  });

  it('should exist', function() {
    should.exist(View);
  });

  describe('#constructor()', function() {
    it('should create an instance with the new operator', function() {
      var view = new View();
      (view instanceof View).should.be.true;
    });

    it('should create an instance without the new operator', function() {
      var view = View();
      (view instanceof View).should.be.true;
    });
  });

  describe('#map()', function() {
    it('should map the model value to the view', function() {
      var el = document.createElement('div');
      var model;
      var view;

      el.innerHTML = document
        .querySelector('script[type="text/template"]')
        .innerHTML;
      model = new Backbone.Model({
        title: 'Title-text',
        content: 'Content-text'
      });
      View(el, model)
        .map('data-text', function(el, name, value) {
          el.textContent = value;
        });
      el.querySelector('span[data-text="title"]')
        .textContent.should.equal(model.get('title'));
      el.querySelector('h2[data-text="content"]')
        .textContent.should.equal(model.get('content'));
    });

    it('should not map the value to the view', function() {
      var el = document.createElement('div');
      var model;
      var view;

      el.innerHTML = document
        .querySelector('script[type="text/template"]')
        .innerHTML;
      model = new Backbone.Model({
        title: 'Title',
        content: 'Content-text'
      });
      model.set('title', 'Title-text');
      View(el, model)
        .map('data-text', function(el, name, value) {
          el.textContent = value;
        });
      el.querySelector('span[data-text="title"]')
        .textContent.should.equal(model.get('title'));
      el.querySelector('h2[data-text="content"]')
        .textContent.should.not.equal(model.get('content'));
    });
  });

  describe('#mapOnce()', function() {
    it('should map the model value once', function() {
      var el = document.createElement('div');
      var model;
      var view;

      el.innerHTML = document
        .querySelector('#mapOnce')
        .innerHTML;
      model = new Backbone.Model({
        title: 'Title'
      });
      View(el, model)
        .mapOnce('data-text', function(el, name, value) {
          el.textContent = value;
        });
      el.querySelector('span[data-text="title"]')
        .textContent.should.equal(model.get('title'));
      el.querySelector('h2[data-text="title"]')
        .textContent.should.equal('');
    });
  });
});
