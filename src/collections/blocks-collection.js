var app = app || {};

(function () {
	'use strict';

  var Blocks = Backbone.Collection.extend({
    model: app.Block,
    url: 'https://s3.amazonaws.com/carousel-backbone/source.json'
  });

  app.Blocks = Blocks;
})();