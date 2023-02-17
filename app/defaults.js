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
  pauseOnHover: true, // останавливать при наведении?
  pauseOnTap: true, // останавливать при тапе?
  pauseTarget: 'parent', // Останавливать при наведении на весь блок или на item ('parent', 'anchor', 'target')
  activeIndex: 1, // активный элемент
  speedSwitching: 5000, // скорость авто переключения
  useToggle: false, // Скрытие активных вкладок
  autoSwitching: false, // авто переключение
  hideOnClosest: false, // hide on closest
  hideOnMouseout: false, // hide on Mouseout
  prevent: true, // preventDefault
  debug: false, // дебагер
  useHash: true, // использовать window.location.hash
  useJqMethods: true, // использовать jq методы анимаций?
  loop: false, // замкнуть цикл при переключении?
  initOpenTab: true, // инициализировать активный таб?
  pauseVideoAudio: true, // ставить на паузу аудио и видео при переключении табов?
  state: 'tab', // роль плагина tab/accordion
  mouseoutTimeOut: false, // таймаут после снятия курсора
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
    closeTab: 'is-tab-close',
    activeContainer: 'is-active-container',
    closeContainer: 'is-close-container',
    stopAnimate: 'stop-animate',
    beforeOut: 'before-out'
  }
};

/**
 * global events
 * datatabs:update - обновление табов (переход в новое состояние)
 */

export default defaults;
