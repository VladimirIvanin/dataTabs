/**
* Простые jquery-tabs
* https://github.com/VladimirIvanin/dataTabs/
*
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
    parent: false, // parent selector "string"
    hideOnClosest: false, // hide on closest
    prevent: true, // preventDefault
    useToggle: false, // можно переключать состояние активного элемента?
    useJqMethods: true, // использовать jq методы анимаций?
    initOpenTab: true, // инициализировать активный таб?
    jqMethodOpen: 'fadeIn', // jq метод открытия табы
    jqMethodClose: 'hide', // jq метод закрытия табы
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
    this.options.parents = $(element).parents();
    if (this.options.parent) {
      this.options.$parent = $(element).parents(this.options.parent + ':first');
      if (this.options.$parent.length == 0) {
        this.options.$parent = this.options.parents[2] || this.options.parents[1] || this.options.parents[0];
      }
    }else{
      this.options.$parent = this.options.parents[2] || this.options.parents[1] || this.options.parents[0];
    }

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

    if (self.options.hideOnClosest) {
      $(document).on('click', function(event) {
        var isClose = $(event.target).closest( self.options.$parent ).length == 0;

        if (isClose && self.options.useJqMethods && self.options.jqMethodClose) {
          self.$targets[self.options.jqMethodClose]();
        }
      });
    }

    self.$element.on(self.options.event, function(event) {
      if (self.options.prevent) {
        event.preventDefault();
      }
      self.options.onTouch(event);

      var isActive = self.$element.hasClass( self.options.classes.active ) && self.$target.is(':visible') && self.$target.hasClass( self.options.classes.active );

      if (isActive) {
        if (self.options.useToggle) {
          self.$anchors.removeClass( self.options.classes.active ).addClass( self.options.classes.close );
          self.$targets.removeClass( self.options.classes.active ).addClass( self.options.classes.close );

          if (self.options.useJqMethods && self.options.jqMethodOpen && self.options.jqMethodClose) {
            self.$targets[self.options.jqMethodClose]();
          }
        }
      }else{
        self.$anchors.removeClass( self.options.classes.active );
        self.$element.removeClass( self.options.classes.close ).addClass( self.options.classes.active );

        self.$targets.removeClass( self.options.classes.active ).addClass( self.options.classes.close );
        self.$target.removeClass( self.options.classes.close ).addClass( self.options.classes.active );

        if (self.options.useJqMethods && self.options.jqMethodOpen && self.options.jqMethodClose) {
          self.$targets[self.options.jqMethodClose]();
          self.$target[self.options.jqMethodOpen]();
        }

        var $swiper = self.$target.find('.swiper-container');

        if ($swiper && $swiper[0] && $swiper[0].swiper) {
          $.each($swiper, function(index, $el) {
            $el.swiper.update(true);
          });
        }
      }

    });
  }

  DataTabs.prototype.initElements = function () {
    var self = this;

    self.$controls = self.$element.parents( '[data-' + self.options.controls.control + ']' + ':first' );

    if (self.$controls.length == 0) {
      self.$controls = $(self.options.$parent);
    }

    self.$anchors = self.$controls.find( '[data-' + self.options.controls.anchor + ']' );

    self.$box = $( '[data-' + self.options.controls.box + '="' + self.$controls.data(self.options.controls.control) + '"]' );

    if (self.$box.length == 0) {
      self.$box = $(self.options.$parent);
    }

    self.$targets = self.$box.find( '[data-' + self.options.controls.target + ']' );

    self.$target = self.$box.find( '[data-' + self.options.controls.target + '="' + self.$element.data(self.options.controls.anchor) + '"]' );

  }

  /**
  * Проверить инициализирован ли плагин
  */
  function _checkInitInstance(_self) {
    if (_self && _self.className) {
      var $selector = '.' + _self.className.trim().replace(/\s/g, '.');
      $(window).on('load', function(event) {
        $(document).on('click', $selector, function(event) {
          if (!$.data(this, 'datatabs')) {
            console.warn('Проверьте порядок инициализации dataTabs!');
          }
        });
      });
    }
  }

  $.fn.dataTabs = function ( _options ) {
    var args = arguments;
    var instance;
    var options = _options || {};

    _checkInitInstance($(this)[0])

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
