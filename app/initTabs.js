'use strict';
import triggerTab from './triggerTab.js';

export default function initTabs (self, activeIndex) {
  let _activeTab = --activeIndex;

  if (_activeTab < 0) {
    _activeTab = 0;
  }

  triggerTab(self, _activeTab);

}
