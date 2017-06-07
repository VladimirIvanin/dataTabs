'use strict';

import triggerTab from './triggerTab.js';

export function binding () {
  const self = this;

  bindHover(self);

  hideOnClosest(self);

  bindTriggers(self);
}

/**
 * Отслеживаем переключение
 */
function bindTriggers(self) {
  const options = self.options;

  self.$element.on(options.event, function(event) {
    if (options.prevent) {
      event.preventDefault();
    }

    options.onTab(event, self);

    triggerTab(self, self.$element.index())

  });
}

/**
 * Закрывать контент при клике на поле вне табов?
 */
function hideOnClosest(self) {
  if (!self.options.hideOnClosest) {
    return;
  }

  const $parentTabs = $(self.options.$parent);
  const $parentInstance = $parentTabs.get(0).dataTabs;
  let isHideOnClosest = $parentInstance.hideOnClosest;

  if (isHideOnClosest) {
    return;
  }

  $parentInstance.hideOnClosest = true;

  $(document).on('click', function(event) {
    const $parent = $(event.target).closest( self.options.$parent );
    const isClose = $parent.length == 0;
    const isCloseOnJquery = (isClose && self.options.useJqMethods && self.options.jqMethodClose);
    const closeAll = self.options.useToggle;

    const activeTab = self.options.classes.activeTab;
    const closeTab = self.options.classes.closeTab;
    const activeButton = self.options.classes.activeButton;
    const closeButton = self.options.classes.closeButton;

    // если можно скрывать активный таб то скрываем все, иначе все кроме активного
    let $targets = (closeAll) ? self.$targets : self.$targets.not( `.${activeTab}` );
    let $anchors = (closeAll) ? self.$anchors : self.$anchors.not( `.${activeButton}` );

    if (isCloseOnJquery) {
      $targets[self.options.jqMethodClose]();
    }

    if (isClose) {
      $anchors.removeClass( activeButton ).addClass( closeButton );
      $targets.removeClass( activeTab ).addClass( closeTab );
    }
  });

}

/**
 * Ставим класс родительскому элементу при наведении
 */
function bindHover(self) {
  const options = self.options;
  const $parentTabs = $(options.$parent);
  const $parentInstance = $parentTabs.get(0).dataTabs;
  let bindHover = $parentInstance.bindHover;

  if (bindHover) {
    return;
  }

  bindHover = true;

  $parentTabs.hover((event) => {
    $parentTabs.addClass(options.classes.hover);
    options.onMouseover(event, self);
  }, (event) => {
    $parentTabs.removeClass(options.classes.hover);
    options.onMouseout(event, self);
  });

}
