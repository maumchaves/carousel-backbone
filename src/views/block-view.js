var app = app || {};

(function () {
	'use strict';

  app.BlockView = Backbone.View.extend({
    template: _.template($('#block-template').html()),
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
      let block = {
        title: this.model.get('title'),
        url: _.sample(this.model.get('images'))
      }
      this.setElement(this.template(block));
      return this;
    }
  });

})();