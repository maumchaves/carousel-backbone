var app = app || {};

(function () {
  'use strict';
  
  const SHOWN_BLOCKS = 4;

  app.CarouselView = Backbone.View.extend({
    el: '.carousel',
    initialize: function() {
      this.offset = 0;
      this.$blocks = this.$el.find('.blocks');
      this.navPrevDisabled = true;
      this.navNextDisabled = true;
      this.working = false;
      app.blocks = app.blocks || new app.Blocks();
      app.blocks.fetch({success: (e) => {
        this.checkNextNav();
        this.showNextBlocks(null, () => {
          this.$el.find('.nav-prev').removeClass('hide');
          this.$el.find('.nav-next').removeClass('hide');
        });
      }});
    },
    events: {
      'click .nav-prev i' : 'showPrevBlocks',
      'click .nav-next i' : 'showNextBlocks'
    },
    showNextBlocks: function(e, complete) {
      if(this.navNextDisabled || this.working) return;
      this.working = true;
      let offset = this.offset;
      if(this.offset < app.blocks.length) {
        this.offset += SHOWN_BLOCKS;
      }
      this.checkNav();
      this.replaceContentWithFade(() => {
        for(let i = offset;
          i < offset + SHOWN_BLOCKS && i < app.blocks.length; i++) {
          this.appendBlock(i);
        }
      }, () => {
        this.working = false;
        if(typeof complete !== 'undefined') complete();
      });
    },
    showPrevBlocks: function() {
      if(this.navPrevDisabled || this.working) return;
      this.working = true;
      let offset = this.offset;
      if(this.offset - SHOWN_BLOCKS > -1) {
        this.offset -= SHOWN_BLOCKS;
      }
      this.checkNav();
      this.replaceContentWithFade(() => {
        for(let i = offset - SHOWN_BLOCKS * 2;
          i < offset - SHOWN_BLOCKS; i++) {
          this.appendBlock(i);
        }
      }, () => {
        this.working = false;
      });
    },
    replaceContentWithFade: function(replaceFunction, complete) {
      let self = this;
      return this.$blocks.fadeOut('slow', function() {
        self.$blocks.empty();
        replaceFunction();
        self.$blocks.fadeIn('slow', complete);
      });
    },
    appendBlock: function(i) {
      let blockView = new app.BlockView({model: app.blocks.at(i)});
      this.$blocks.append(blockView.render().el);
    },
    checkNav: function() {
      this.checkPrevNav();
      this.checkNextNav();
    },
    checkPrevNav: function() {
      if(this.offset - SHOWN_BLOCKS <= 0) {
        this.navPrevDisabled = true;
        this.$el.find('.nav-prev').addClass('disabled');
      } else {
        this.navPrevDisabled = false;
        this.$el.find('.nav-prev').removeClass('disabled');
      }
    },
    checkNextNav: function() {
      if(this.offset < app.blocks.length) {
        this.navNextDisabled = false;
        this.$el.find('.nav-next').removeClass('disabled');
      } else {
        this.navNextDisabled = true;
        this.$el.find('.nav-next').addClass('disabled');
      }
    }
  });

})();
