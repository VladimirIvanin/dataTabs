const defaults = {
  event: 'click',
  controls: {
    'control': 'tab-control',
    'anchor': 'tab-anchor',
    'box': 'tab-box',
    'target': 'tab-target'
  },
  active: 1, // активный элемент
  speedSwitching: 10000, // скорость авто переключения
  autoSwitching: false, // авто переключение
  parent: false, // parent selector "string"
  hideOnClosest: true, // hide on closest
  prevent: true, // preventDefault
  useJqMethods: true, // использовать jq методы анимаций?
  initOpenTab: true, // инициализировать активный таб?
  state: 'tab', // роль плагина tab/accordion
  jqMethodOpen: 'fadeIn', // jq метод открытия табы
  jqMethodClose: 'hide', // jq метод закрытия табы
  onTab: function () {}, // переключили таб (event, self)
  onMouseover: function () {}, // навели на блок табов (event, self)
  onMouseout: function () {}, // убрали курсор с блока табов (event, self)
  classes: {
    hover: 'is-data-tabs-hover',
    activeButton: 'is-button-active',
    closeButton: 'is-button-close',
    activeTab: 'is-tab-active',
    closeTab: 'is-tab-close'
  }
};

export default defaults;
