const defaults = {
  event: 'click',
  switchersEvent: 'click', // event переключателей вперед/назад
  controls: {
    'container': 'tabs-container',
    'control': 'tab-control',
    'anchor': 'tab-anchor',
    'box': 'tab-box',
    'target': 'tab-target',
    'next': 'tab-next',
    'prev': 'tab-prev'
  },
  activeIndex: 1, // активный элемент
  speedSwitching: 5000, // скорость авто переключения
  useToggle: false, // Скрытие активных вкладок
  autoSwitching: false, // авто переключение
  hideOnClosest: false, // hide on closest
  prevent: true, // preventDefault
  debug: false, // дебагер
  useJqMethods: true, // использовать jq методы анимаций?
  loop: false, // замкнуть цикл при переключении?
  initOpenTab: true, // инициализировать активный таб?
  pauseVideoAudio: true, // ставить на паузу аудио и видео при переключении табов?
  state: 'tab', // роль плагина tab/accordion
  jqMethodOpenSpeed: 300, // скорость открытия табы
  jqMethodOpen: 'fadeIn', // jq метод открытия табы
  jqMethodCloseSpeed: 0, // скорость закрытия табы
  jqMethodClose: 'hide', // jq метод закрытия табы
  onInit: function () {}, // плагин инициализировался (onInit)
  onTab: function () {}, // переключили таб (self)
  onMouseover: function () {}, // навели на блок табов (event, self)
  onMouseout: function () {}, // убрали курсор с блока табов (event, self)
  classes: {
    hover: 'is-data-tabs-hover',
    disabledSwitcher: 'is-switcher-disabled',
    disabledButton: 'is-button-disabled',
    activeButton: 'is-button-active',
    closeButton: 'is-button-close',
    activeTab: 'is-tab-active',
    closeTab: 'is-tab-close'
  }
};

/**
 * global events
 * datatabs:update - обновление табов (переход в новое состояние)
 */

export default defaults;
