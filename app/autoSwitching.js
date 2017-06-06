'use strict';

export default function autoSwitching () {
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
    }, 0)

    var nextTab = function () {
      var $anchors = $(self.options.$parent).find( '[data-' + self.options.controls.anchor + ']' )
      var _size = $anchors.length;
      var _index = 0;

      $(self.options.$parent).find( '[data-' + self.options.controls.anchor + ']' ).each(function(index, el) {
        if ($(el).hasClass(self.options.classes.activeTab)) {
          _index = index;
        }
      });

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
