'use strict';

import triggerTab from './triggerTab.js';

/**
 * Кнопки вперед/назад
 */
export function bindSwitchers() {
  const self = this;
  const options = self.options;
  let stopIndex = self.counterElements - 1;

  if (self.$next) {
    $(document).on('datatabs:update', function(event, uuid) {
      const mainId = self.$element.get(0).dataTabs.uuid;
      if (uuid == mainId) {
        let nextStatus = getStatusNext(self, stopIndex);

        if (nextStatus.isNext) {
          self.$next.removeClass(options.classes.disabledSwitcher);
        }else{
          self.$next.addClass(options.classes.disabledSwitcher);
        }
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
    $(document).on('datatabs:update', function(event, uuid) {
      const mainId = self.$element.get(0).dataTabs.uuid;
      if (uuid == mainId) {
        let prevStatus = getStatusPrev(self, stopIndex);

        if (prevStatus.isPrev) {
          self.$prev.removeClass(options.classes.disabledSwitcher);
        }else{
          self.$prev.addClass(options.classes.disabledSwitcher);
        }
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
export function bindTriggers() {
  const self = this;
  const options = self.options;

  self.$anchors.on(options.event, function(event) {
    if (options.prevent) {
      event.preventDefault();
    }

    const anchor = $(this).get(0);

    triggerTab(self, anchor.dataTabs.myIndex)

  });
}

/**
 * Закрывать контент при клике на поле вне табов?
 */
export function hideOnClosest() {
  const self = this;
  if (!self.options.hideOnClosest) {
    return;
  }

  $(document).on('click', function(event) {
    const $parent = $(event.target).closest( self.$element );
    const isClose = $parent.length == 0;

    if (isClose) {
      self.closeAllTabs();
    }
  });
}

/**
 * Закрыть все вкладки
 */
export function closeAllTabs() {
  const self = this;

  const $parent = self.$element;
  const isCloseOnJquery = (self.options.useJqMethods && self.options.jqMethodClose);
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

  $anchors.removeClass( activeButton ).addClass( closeButton );
  $targets.removeClass( activeTab ).addClass( closeTab );
}

/**
 * Ставим класс родительскому элементу при наведении
 */
export function bindHover() {
  const self = this;
  const options = self.options;
  const $parentTabs = self.$element;

  $parentTabs.hover((event) => {
    $parentTabs.addClass(options.classes.hover);
    options.onMouseover(event, self);
  }, (event) => {
    $parentTabs.removeClass(options.classes.hover);
    options.onMouseout(event, self);

    if (self.options.hideOnMouseout) {
      if (self.options.mouseoutTimeOut) {
        setTimeout(function () {
          if (!self.$element.hasClass(options.classes.hover)) {
            self.closeAllTabs();
          }
        }, self.options.mouseoutTimeOut)
      }else{
        self.closeAllTabs();
      }
    }
  });

}
