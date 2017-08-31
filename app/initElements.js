'use strict';
import generateUUID from './generateUUID.js';
import logger from './logger.js';

export function initElements () {
  const self = this;
  const options = self.options;
  const anchorSelector = getDataAttrName(options.controls.anchor);
  const targetSelector = getDataAttrName(options.controls.target);
  const containerSelector = getDataAttrName(options.controls.container);

  if (!self.$element.is(containerSelector)) {
    console.warn('Не указан контейнер для блока табов: ' + containerSelector);
    self.$element.attr('data-'+options.controls.container, '')
  }

  if (!self.$element.get(0).dataTabs) {
    self.$element.get(0).dataTabs = {};
    self.$element.get(0).dataTabs.list = [];
  }

  self.$element.get(0).dataTabs.instance = self;
  self.$element.get(0).dataTabs.uuid = generateUUID();

  logger(self.options, 'self.$element.get(0).dataTabs', self.$element.get(0).dataTabs);

  const main_uuid = self.$element.get(0).dataTabs.uuid;

  // все контролы
  // нельзя вкладывать контролы внутрь контента
  self.$anchors = self.$element.find( anchorSelector ).filter(function( index, el ) {
    let isMain = false;
    const $parent = $(el).parents( containerSelector + ":first" ).get(0);
    if ($parent && $parent.dataTabs && $parent.dataTabs.uuid) {
      isMain = $parent.dataTabs.uuid == main_uuid;
    }

    return isMain;
  });

  logger(self.options, 'self.$anchors', self.$anchors);

  // весь контент
  self.$targets = self.$element.find( targetSelector ).filter(function( index, el ) {
    let isMain = false;
    const $parent = $(el).parents( containerSelector ).get(0);
    if ($parent && $parent.dataTabs && $parent.dataTabs.uuid) {
      isMain = $parent.dataTabs.uuid == main_uuid;
    }

    return isMain;
  });

  logger(self.options, 'self.$targets', self.$targets);

  // Устанавливаем активный таб по дата атрибуту
  let $activeAnchors = self.$anchors.is('[data-tab-active]');

  if ($activeAnchors === true) {
    self.options.activeIndex = [];
  }

  self.$anchors.each(function(index, el) {
    const anchorId = $(el).data( options.controls.anchor );
    const targetSearch = getDataAttrName(options.controls.target, anchorId);
    const anchor = $(el).get(0);
    if (!anchor.dataTabs) {
      anchor.dataTabs = {};
    }

    anchor.dataTabs.myIndex = index;
    anchor.dataTabs.$target = null;

    if ($(el).is('[data-tab-active]')) {
      self.options.activeIndex.push(index)
    }

    // Присвоить кнопкам блок контента
    self.$targets.each(function(index, elem) {
      if ($(elem).is(targetSearch)) {
        $(el).get(0).dataTabs.$target = $(elem);
      }
    });

    logger(self.options, 'anchor.dataTabs', anchor.dataTabs);

    if (!$(el).get(0).dataTabs.$target) {
      console.warn('Для кнопки не назначен контент!', $(el));
    }
  });

  self.counterElements = self.$anchors.length;
}

export function initSwitchers() {
  const self = this;
  // переключатель на следующий элемент
  self.$next = self.$element.find( getDataAttrName(self.options.controls.next) );
  // переключатель на предыдущий элемент
  self.$prev = self.$element.find( getDataAttrName(self.options.controls.prev) );
}

function getDataAttrName(name, value) {
  const resultName = (value) ? name + '="'+value+'"' : name;

  return '[data-' + resultName + ']';
}
