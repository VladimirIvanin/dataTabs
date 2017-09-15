import autoSwitching from './autoSwitching.js';
import initTabs from './initTabs.js';
import {initElements, initSwitchers} from './initElements.js';
import {  binding,
          bindSwitchers,
          bindTriggers,
          bindHover,
          closeAllTabs,
          hideOnClosest
        } from './binding.js';
import defaults from './defaults.js';

;(function ( $, window, undefined ) {

  function DataTabs(element, options) {
    this.element = element;
    this.$element = $(element);
    this.states = {};
    this.activeHash = null;
    var dataParams = this.getDataParam();

    this.options = $.extend(true, {}, defaults, options);
    this.options = $.extend(true, {}, this.options, dataParams);

    this.init(options);
  }

  DataTabs.prototype.init = function (options) {
    var self = this;

    if (self.options.state == 'accordion') {
      // в state == 'accordion' activeIndex = null;
      self.options.activeIndex = options.activeIndex || null;
      // можно переключать состояние активного элемента
      self.options.useToggle = true;
      // при аккордеоне скорость закрытия == открытию при дефолтных настройках
      if (self.options.jqMethodCloseSpeed == 0) {
        self.options.jqMethodCloseSpeed = self.options.jqMethodOpenSpeed;
      }
    }

    if (self.options.useHash) {
      self.activeHash = window.location.hash;
    }

    self.initElements();
    self.initSwitchers();
    self.bindSwitchers();
    self.bindTriggers();
    self.bindHover();
    self.hideOnClosest();

    if (self.options.initOpenTab && self.options.activeIndex) {
      self.initTabs(self, self.options.activeIndex);
    }

    if (self.options.autoSwitching) {
      self.initAutoSwitching();
    }

    self.options.onInit(self);
  }

  DataTabs.prototype.initElements = initElements;
  DataTabs.prototype.initTabs = initTabs;
  DataTabs.prototype.initAutoSwitching = autoSwitching;
  DataTabs.prototype.initBinds = binding;
  DataTabs.prototype.initSwitchers = initSwitchers;
  DataTabs.prototype.bindSwitchers = bindSwitchers;
  DataTabs.prototype.bindTriggers = bindTriggers;
  DataTabs.prototype.bindHover = bindHover;
  DataTabs.prototype.closeAllTabs = closeAllTabs;
  DataTabs.prototype.hideOnClosest = hideOnClosest;
  DataTabs.prototype.getDataParam = function () {
    var self = this;
    return self.$element.data();
  };

  $.fn.dataTabs = function ( _options ) {
    var args = arguments;
    var instance;
    var options = _options || {};

    if (typeof options === 'undefined' || typeof options === 'object') {
      return this.each(function (index, el) {
        if (!$.data(this, 'datatabs')) {
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
