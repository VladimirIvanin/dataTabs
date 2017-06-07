'use strict';

export function initElements () {
  const self = this;
  const options = self.options;

  options.parents = self.$element.parents().not('body, html');

  // Установка родительского блока
  if (options.parent) {
    options.$parent = self.$element.parents(options.parent + ':first');
    if (options.$parent.length == 0) {
      options.$parent = options.parents[2] || options.parents[1] || options.parents[0];
    }
  }else{
    options.$parent = options.parents[2] || options.parents[1] || options.parents[0];
  }


  self.isDataAnchors = self.$element.is(getDataAttrName(self.options.controls.anchor));
  self.isIdAnchors = self.$element.is('[href]');

  if (!self.isDataAnchors) {
    console.warn('Не установлены дата атрибуты!', getDataAttrName(self.options.controls.anchor));
  }

  // если блок контролов не указан через дата атрибуты, берется родительский блок
  self.$controls = self.$element.parents( getDataAttrName(self.options.controls.control) + ':first' );

  if (self.$controls.length == 0) {
    self.$controls = $(self.options.$parent);
  }

  // найти все контролы
  self.$anchors = self.$controls.find( getDataAttrName(self.options.controls.anchor) );

  // найти родителькский элемент контента
  self.$box = $( getDataAttrName(self.options.controls.box, self.$controls.data(self.options.controls.control) ) );

  //  если блок контента не указан через дата атрибуты, берется родительский блок
  if (self.$box.length == 0) {
    self.$box = $(self.options.$parent);
  }

  // найти все блоки контента
  self.$targets = self.$box.find( getDataAttrName(self.options.controls.target) );

  // блок контента привязанный к контролу
  self.$target = self.$box.find( getDataAttrName(self.options.controls.target, self.$element.data(self.options.controls.anchor) ) );

  // кол-во переключателей
  self.counterElements = self.$anchors.length

  if (!$(self.options.$parent).get(0).dataTabs) {
    $(self.options.$parent).get(0).dataTabs = {};
    $(self.options.$parent).get(0).dataTabs.list = [];
  }

  // родительский блок хранит инстансы кнопок
  $(self.options.$parent).get(0).dataTabs.list.push(self);

}

export function initSwitchers(self) {
  // переключатель на следующий элемент
  self.$next = $(self.options.$parent).find( getDataAttrName(self.options.controls.next) );
  // переключатель на предыдущий элемент
  self.$prev = $(self.options.$parent).find( getDataAttrName(self.options.controls.prev) );
}

function getDataAttrName(name, value) {
  const resultName = (value) ? name + '="'+value+'"' : name;

  return '[data-' + resultName + ']';
}
