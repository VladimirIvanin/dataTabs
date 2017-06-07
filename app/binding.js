'use strict';

import triggerTab from './triggerTab.js';

/**
 * Кнопки вперед/назад
 */
export function bindSwitchers(self) {
  const options = self.options;
  let stopIndex = self.counterElements - 1;

  if (self.$next) {
    $(document).on('datatabs:update', function(event) {
      let nextStatus = getStatusNext(self, stopIndex);

      if (nextStatus.isNext) {
        self.$next.removeClass(options.classes.disabledSwitcher);
      }else{
        self.$next.addClass(options.classes.disabledSwitcher);
      }
    });

    self.$next.on(options.switchersEvent, function(event) {
      event.preventDefault();
      let nextStatus = getStatusNext(self, stopIndex);

      if (nextStatus.isNext) {
        triggerTab(self, nextStatus.next);
      }
    });
  }

  if (self.$prev) {
    $(document).on('datatabs:update', function(event) {
      let prevStatus = getStatusPrev(self, stopIndex);

      if (prevStatus.isPrev) {
        self.$prev.removeClass(options.classes.disabledSwitcher);
      }else{
        self.$prev.addClass(options.classes.disabledSwitcher);
      }
    });

    self.$prev.on(options.switchersEvent, function(event) {
      event.preventDefault();
      let prevStatus = getStatusPrev(self, stopIndex);

      if (prevStatus.isPrev) {
        triggerTab(self, prevStatus.prev);
      }
    });
  }
}

function getStatusNext(self, stopIndex) {
  let next = self.states.activeIndex + 1;
  let isNext = true; // разрешен следующий?
  if (next > stopIndex) {
    if(self.options.loop){
      next = 0;
    }else{
      isNext = false;
    }
  };

  return {next,isNext}
}

function getStatusPrev(self, stopIndex) {
  let prev = self.states.activeIndex - 1;
  let isPrev = true; // разрешен предыдущий?
  if (prev < 0) {
    if(self.options.loop){
      prev = stopIndex;
    }else{
      isPrev = false;
    }
  };

  return {prev,isPrev}
}
/**
 * Отслеживаем переключение
 */
export function bindTriggers(self) {
  const options = self.options;

  self.$element.on(options.event, function(event) {
    if (options.prevent) {
      event.preventDefault();
    }
    const dataId = self.options.controls.anchor;

    let _index = 0;
    self.$box.find( '[data-' + dataId + ']' ).each(function(index, el) {
      var _id = $(el).data(dataId);
      if (_id == self.$element.data(dataId)) {
        _index = index;
      }
    });

    triggerTab(self, _index)

  });
}

/**
 * Закрывать контент при клике на поле вне табов?
 */
export function hideOnClosest(self) {
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
export function bindHover(self) {
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
