'use strict';
import triggerTab from './triggerTab.js';

export default function autoSwitching () {
  var self = this;

  const options = self.options;
  const $parent = $(options.$parent);

  var bindSwitch = $parent.get(0).dataTabs.bindSwitch
  var triggerTabs = null;
  if (!bindSwitch) {
    $parent.get(0).dataTabs.bindSwitch = true;

    $parent.on('touchstart', function(event) {
      clearInterval(triggerTabs);
    });

    $parent.hover(function() {
      clearInterval(triggerTabs);
    }, function() {
      triggerTabs = setInterval(nextTab, options.speedSwitching);
    });

    setTimeout(function () {
      triggerTabs = setInterval(nextTab, options.speedSwitching);
    }, 0)

    let nextTab = function () {
      var $anchors = $parent.find( '[data-' + options.controls.anchor + ']' )
      var _size = $anchors.length;
      var _index = self.states.activeIndex || 0;

      var _next = 0;
      if (typeof _index == 'number') {
        _next = ++_index;
      }

      if (_next >= _size) {
        _next = 0;
      }

      var isFocused = $parent.hasClass(options.classes.hover);

      if (!isFocused) {
        triggerTab(self, _next);
      }
    }

  }

}
