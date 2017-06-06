'use strict';

export default function initElements () {
  const self = this;

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

  $(self.options.$parent).get(0).dataTabs.list.push(self);

}

function getDataAttrName(name, value) {
  const resultName = (value) ? name + '="'+value+'"' : name;

  return '[data-' + resultName + ']';
}
