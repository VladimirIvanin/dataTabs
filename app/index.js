import autoSwitching from './autoSwitching.js';
import triggerTab from './triggerTab.js';
import initTabs from './initTabs.js';
import initElements from './initElements.js';
import { binding } from './binding.js';
import defaults from './defaults.js';

;(function ( $, window, undefined ) {

  function DataTabs(element, options) {
    this.element = element;
    this.$element = $(element);

    this.states = {};

    this.options = $.extend(true, {}, defaults, options);

    this.init();
  }


  DataTabs.prototype.init = function () {
    var self = this;

    if (self.options.state == 'accordion') {
      // можно переключать состояние активного элемента
      self.options.useToggle = true;
    }

    self.initElements();
    self.initBinds();

    var isLastElement = self.options.indexElement == self.counterElements;
    if (self.options.initOpenTab && isLastElement) {
      self.initTabs(self, self.options.activeIndex);
    }

    if (self.options.autoSwitching) {
      self.initAutoSwitching();
    }

  }

  DataTabs.prototype.initElements = initElements;
  DataTabs.prototype.initTabs = initTabs;
  DataTabs.prototype.initAutoSwitching = autoSwitching;
  DataTabs.prototype.initBinds = binding;

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
      return this.each(function (index, el) {
        if (!$.data(this, 'datatabs')) {
          options.indexElement = index + 1;
          $.data(this, 'datatabs', new DataTabs( this, options ));
        }
      });
    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
      instance = $.data(this, 'datatabs');
      if (instance instanceof datatabs && typeof instance[options] === 'function') {
        return instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
      } else {
        return this;
      }
    }
  };
}(jQuery, window));
