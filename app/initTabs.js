'use strict';
import triggerTab from './triggerTab.js';

export default function initTabs (self, activeIndex) {
  const isNumber = $.isNumeric(activeIndex);
  const isArray = Array.isArray(activeIndex);

  if (isNumber) {
    let _activeTab = --activeIndex;

    if (_activeTab < 0) {
      _activeTab = 0;
    }

    triggerTab(self, _activeTab, { type: 'init' });
  }else{
    if (isArray) {
      $.each(activeIndex, function(index, el) {
        triggerTab(self, el, { type: 'init' });
      });
    }
  }

}
