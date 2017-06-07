'use strict';

export default function initElements () {
  const self = this;
  const options = self.options;

  options.parents = self.$element.parents().not('body, html');

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

  self.$controls = self.$element.parents( getDataAttrName(self.options.controls.control) + ':first' );

  if (self.$controls.length == 0) {
    self.$controls = $(self.options.$parent);
  }



  self.$anchors = self.$controls.find( getDataAttrName(self.options.controls.anchor) );

  self.$box = $( getDataAttrName(self.options.controls.box, self.$controls.data(self.options.controls.control) ) );

  if (self.$box.length == 0) {
    self.$box = $(self.options.$parent);
  }

  self.$targets = self.$box.find( getDataAttrName(self.options.controls.target) );

  self.$target = self.$box.find( getDataAttrName(self.options.controls.target, self.$element.data(self.options.controls.anchor) ) );

  if (!$(self.options.$parent).get(0).dataTabs) {
    $(self.options.$parent).get(0).dataTabs = {};
    $(self.options.$parent).get(0).dataTabs.list = [];
  }

  self.counterElements = self.$anchors.length

  $(self.options.$parent).get(0).dataTabs.list.push(self);

}

function getDataAttrName(name, value) {
  const resultName = (value) ? name + '="'+value+'"' : name;

  return '[data-' + resultName + ']';
}
