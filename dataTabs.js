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
    active: 1, // активный элемент
    speedSwitching: 10000, // скорость авто переключения
    autoSwitching: false, // авто переключение
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
      hover: 'is-hover',
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
    if (self.options.autoSwitching) {
      self.initAutoSwitching();
    }
  }

  DataTabs.prototype.initAutoSwitching = function () {
    var self = this;

    var bindSwitch = $(self.options.$parent).get(0).dataTabs.bindSwitch
    var triggerTabs = null;
    if (!bindSwitch) {
      $(self.options.$parent).get(0).dataTabs.bindSwitch = true;

      $(self.options.$parent).on('touchstart', function(event) {
        clearInterval(triggerTabs);
      });

      $(self.options.$parent).hover(function() {
        clearInterval(triggerTabs);
      }, function() {
        triggerTabs = setInterval(nextTab, self.options.speedSwitching);
      });

      setTimeout(function () {
        triggerTabs = setInterval(nextTab, self.options.speedSwitching);
      }, 1000)

      var nextTab = function () {
        var $anchors = $(self.options.$parent).find( '[data-' + self.options.controls.anchor + ']' )
        var _size = $anchors.length;
        var _index = $(self.options.$parent).find( '[data-' + self.options.controls.anchor + '].' + self.options.classes.active ).index();
        var _next = 0;
        if (typeof _index == 'number') {
          _next = ++_index;
        }
        if (_next >= _size) {
          _next = 0;
        }

        var isFocused = $(self.options.$parent).hasClass(self.options.classes.hover);

        if (!isFocused) {
          $anchors.eq(_next).trigger( self.options.event );
        }
      }


    }

  }

  DataTabs.prototype.initTabs = function () {
    var self = this;

    var _activeTab = --self.options.active;

    if (_activeTab < 0) {
      _activeTab = 0;
    }

    self.$controls.each(function(index, el) {
      $(el).find( '[data-' + self.options.controls.anchor + ']' ).eq(_activeTab).trigger( self.options.event );
    });
  }

  DataTabs.prototype.initBinds = function () {
    var self = this;

    var bindHover = $(self.options.$parent).get(0).dataTabs.bindHover;

    if (!bindHover) {
      $(self.options.$parent).get(0).dataTabs.bindHover = true;

      $(self.options.$parent).hover(function() {
        $(this).addClass(self.options.classes.hover);
      }, function() {
        $(this).removeClass(self.options.classes.hover);
      });
    }

    if (self.options.hideOnClosest) {
      $(document).on('click', function(event) {
        var isClose = $(event.target).closest( self.options.$parent ).length == 0;

        if (isClose && self.options.useJqMethods && self.options.jqMethodClose) {
          self.$targets[self.options.jqMethodClose]();
        }

        if (isClose) {
          self.$anchors.removeClass( self.options.classes.active );

          self.$targets.removeClass( self.options.classes.active ).addClass( self.options.classes.close );
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

    if (!$(self.options.$parent).get(0).dataTabs) {
      $(self.options.$parent).get(0).dataTabs = {};
      $(self.options.$parent).get(0).dataTabs.list = [];
    }
    $(self.options.$parent).get(0).dataTabs.list.push(self);

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
