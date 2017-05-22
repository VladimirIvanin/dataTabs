/**
 * Простые jquery-tabs
 * [data-tab-control="my-tabs"]
 *  [data-tab-anchor="1"]
 *  [data-tab-anchor="2"]
 *
 * [data-tab-box="my-tabs"]
 *  [data-tab-target="1"]
 *  [data-tab-target="2"]
 *
 *  $('.tabs-item').dataTabs({
      classes: {
        close: 'hide'
      }
    });
 */
;(function ( $, window, undefined ) {

  var defaults = {
    event: 'click',
    controls: {
      'control': 'tab-control',
      'anchor': 'tab-anchor',
      'box': 'tab-box',
      'target': 'tab-target'
    },
    useJqMethods: true,
    initOpenTab: true,
    jqMethodOpen: 'fadeIn',
    jqMethodClose: 'hide',
    onTouch: function () {},
    classes: {
      active: 'is-active',
      close: 'is-close'
    }
  };

  function DataTabs(element, options) {
      this.element = element; // Selected DOM element
      this.$element = $(element); // Selected jQuery element

      this.tabs = []; // Create tabs array
      this.state = ''; // Define the plugin state (tabs/accordion)

      // Extend the defaults with the passed options
      this.options = $.extend(true, {}, defaults, options);

      this.init();
  }


  DataTabs.prototype.init = function () {
    var self = this;

    self.initElements();
    self.initBinds();
    if (self.options.initOpenTab) {
      self.initTabs();
    }
  }

  DataTabs.prototype.initTabs = function () {
    var self = this;

    self.$controls.each(function(index, el) {
      $(el).find( '[data-' + self.options.controls.anchor + ']:first' ).trigger( self.options.event );
    });
  }


  DataTabs.prototype.initBinds = function () {
    var self = this;

    self.$element.on(self.options.event, function(event) {
      event.preventDefault();
      self.options.onTouch(event);

      var isActive = self.$element.hasClass( self.options.classes.active );

      if (!isActive) {
        self.$anchors.removeClass( self.options.classes.active );
        self.$element.addClass( self.options.classes.active );

        self.$targets.removeClass( self.options.classes.active ).addClass( self.options.classes.close );
        self.$target.removeClass( self.options.classes.close ).addClass( self.options.classes.active );

        if (self.options.useJqMethods && self.options.jqMethodOpen && self.options.jqMethodClose) {
          self.$targets[self.options.jqMethodClose]();
          self.$target[self.options.jqMethodOpen]();
        }else{
        }

        var $swiper = self.$target.find('.swiper-container');

        if ($swiper && $swiper[0] && $swiper[0].swiper) {
          $swiper[0].swiper.update();
        }

      }

    });
  }

  DataTabs.prototype.initElements = function () {
    var self = this;

    self.$controls = self.$element.parents( '[data-' + self.options.controls.control + ']' + ':first' );
    self.$anchors = self.$controls.find( '[data-' + self.options.controls.anchor + ']' );

    self.$box = $( '[data-' + self.options.controls.box + '="' + self.$controls.data(self.options.controls.control) + '"]' );


    self.$targets = self.$box.find( '[data-' + self.options.controls.target + ']' );
    self.$target = self.$box.find( '[data-' + self.options.controls.target + '="' + self.$element.data(self.options.controls.anchor) + '"]' );

  }



  $.fn.dataTabs = function ( options ) {
      var args = arguments;
      var instance;

      if (options === undefined || typeof options === 'object') {
          return this.each(function () {
              if (!$.data(this, 'datatabs')) {
                  $.data(this, 'datatabs', new DataTabs( this, options ));
              }
          });
      } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
          instance = $.data(this[0], 'datatabs');

          // Allow instances to be destroyed via the 'destroy' method
          if (options === 'destroy') {
              // TODO: destroy instance classes, etc
              $.data(this, 'datatabs', null);
          }

          if (instance instanceof datatabs && typeof instance[options] === 'function') {
              return instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
          } else {
              return this;
          }
      }
  };
}(jQuery, window));
