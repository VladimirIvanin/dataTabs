'use strict';
import triggerTab from './triggerTab.js';

export default function autoSwitching () {
  var self = this;
  
  const options = self.options;
  const $parent = self.$element;
  const $targets = self.$targets;
  const $anchors = self.$anchors;
  const main_uuid = self.$element.get(0).dataTabs.uuid;
  let activeClass = '';
  let $elementBinding = null

  switch (options.pauseTarget) {
    case 'anchor':
      $elementBinding = $anchors
      activeClass = options.classes.activeButton;
      break;
    case 'target':
      $elementBinding = $targets
      activeClass = options.classes.activeTab;
      break;
    default:
      $elementBinding = $parent
  }
  let counter = options.speedSwitching;
  let resumeTimeout = null;
  let counterInterval = null;
  let stateSwitching = 'animate'
  var triggerTabs = null;

  $(document).on("datatabs:update", (event, uuid, eventObject) => {
    if (uuid === main_uuid && eventObject.type !== 'autoSwitching') {
      stateSwitching = 'animate'
      $parent.removeClass(options.classes.stopAnimate)
      clearInterval(triggerTabs);
      clearInterval(counterInterval);
      clearTimeout(resumeTimeout);
      triggerTabs = setInterval(nextTab, options.speedSwitching);
    }
  });

  if (options.pauseOnTap) {
    $elementBinding.on('touchstart', function() {
      stopAnimate($(this))
    });
    $elementBinding.on('touchend', function() {
      resumeAnimate($(this))
    });
  }

  if (options.pauseOnHover) {
    $elementBinding.hover(function() {
      stopAnimate($(this))
    }, function() {
      resumeAnimate($(this))
    });
  }

  setTimeout(function () {
    triggerTabs = setInterval(nextTab, options.speedSwitching);
    startCountInterval()
  }, 0)

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      $elementBinding.each(function () {
        stopAnimate($(this))
      })
    } else {
      $elementBinding.each(function () {
        resumeAnimate($(this))
      })
    }
  });

  let nextTab = function () {
    $parent.removeClass(options.classes.stopAnimate)
    stateSwitching = 'animate'
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

    if (stateSwitching == 'animate' && !document.hidden) {
      clearInterval(counterInterval);
      clearTimeout(resumeTimeout);
      startCountInterval()
      triggerTab(self, _next, { type: 'autoSwitching' });
    }
  }

  function stopAnimate($el) {
    if (options.pauseTarget !== 'parent') {
      if (!$el.hasClass(activeClass)) return
    }
    $parent.addClass(options.classes.stopAnimate)
    stateSwitching = 'stop'
    clearTimeout(resumeTimeout);
    clearInterval(triggerTabs);
  }

  function resumeAnimate($el) {
    if (options.pauseTarget !== 'parent') {
      if (!$el.hasClass(activeClass)) return
    }
    let timeOut = stateSwitching == 'stop' ? counter : options.speedSwitching
    $parent.removeClass(options.classes.stopAnimate)
    stateSwitching = 'animate'
    resumeTimeout = setTimeout(() => {
      nextTab()
      triggerTabs = setInterval(nextTab, options.speedSwitching);
    }, timeOut);
  }

  function startCountInterval() {
    counter = options.speedSwitching;
    counterInterval = setInterval(() => {
      if (stateSwitching == 'animate' && counter > 0) {
        counter = counter - 1000
      }
      if (counter == 0) {
        clearInterval(counterInterval);
      }
    }, 1000)
  }

}
