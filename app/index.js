// ==================================================
// dataTabs v0.0.1
// https://github.com/VladimirIvanin/dataTabs/
//
// Licensed under the MIT license:
// https://opensource.org/licenses/MIT
//
// Copyright 2017, Vladimir Ivanin
// https://github.com/VladimirIvanin/
//
// ==================================================

import autoSwitching from './autoSwitching.js';
import triggerTab from './triggerTab.js';
import initElements from './initElements.js';
import { binding } from './binding.js';
import defaults from './defaults.js';

;(function ( $, window, undefined ) {

  function DataTabs(element, options) {
    this.element = element; // Selected DOM element
    this.$element = $(element); // Selected jQuery element

    this.states = {};
    this.tabs = []; // Create tabs array

    // Extend the defaults with the passed options
    this.options = Object.assign({}, defaults, options);

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

    if (self.options.state == 'accordion') {
      // можно переключать состояние активного элемента
      self.options.useToggle = true;
    }

    self.initElements();
    self.initBinds();
    if (self.options.initOpenTab) {
      self.initTabs();
    }
    if (self.options.autoSwitching) {
      self.initAutoSwitching();
    }
  }

  DataTabs.prototype.initAutoSwitching = autoSwitching;

  DataTabs.prototype.initTabs = function () {
    var self = this;

    var _activeTab = --self.options.active;

    if (_activeTab < 0) {
      _activeTab = 0;
    }

    triggerTab(self, _activeTab)
  }

  DataTabs.prototype.initBinds = binding;

  DataTabs.prototype.initElements = initElements

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
