import autoSwitching from './autoSwitching.js';
import triggerTab from './triggerTab.js';
import initTabs from './initTabs.js';
import {initElements, initSwitchers} from './initElements.js';
import {  binding,
          bindSwitchers,
          bindTriggers,
          bindHover,
          hideOnClosest
        } from './binding.js';
import defaults from './defaults.js';

;(function ( $, window, undefined ) {

  function DataTabs(element, options) {
    this.element = element;
    this.$element = $(element);

    this.states = {};

    this.options = $.extend(true, {}, defaults, options);

    this.init();
  }

  DataTabs.prototype.initElements = initElements;
  DataTabs.prototype.initTabs = initTabs;
  DataTabs.prototype.initAutoSwitching = autoSwitching;
  DataTabs.prototype.initBinds = binding;
  DataTabs.prototype.initSwitchers = initSwitchers;
  DataTabs.prototype.bindSwitchers = bindSwitchers;
  DataTabs.prototype.bindTriggers = bindTriggers;
  DataTabs.prototype.bindHover = bindHover;
  DataTabs.prototype.hideOnClosest = hideOnClosest;


  DataTabs.prototype.init = function () {
    var self = this;

    if (self.options.state == 'accordion') {
      // можно переключать состояние активного элемента
      self.options.useToggle = true;
      // при аккордеоне скорость закрытия == открытию при дефолтных настройках
      if (self.options.jqMethodCloseSpeed == 0) {
        self.options.jqMethodCloseSpeed = self.options.jqMethodOpenSpeed;
      }
    }

    self.initElements();
    self.initSwitchers();
    self.bindSwitchers();
    self.bindTriggers();
    self.bindHover();
    self.hideOnClosest();

    if (self.options.initOpenTab) {
      self.initTabs(self, self.options.activeIndex);
    }

    if (self.options.autoSwitching) {
      self.initAutoSwitching();
    }

    self.options.onInit(self);
  }

  $.fn.dataTabs = function ( _options ) {
    var args = arguments;
    var instance;
    var options = _options || {};

    if (options === undefined || typeof options === 'object') {
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
