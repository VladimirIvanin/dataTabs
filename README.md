# Табы на jQuery

## CDN

```
  <script src="https://cdn.jsdelivr.net/gh/VladimirIvanin/dataTabs@0.5.0/dist/dataTabs.js"></script>
```

## Настройки

| Параметр        | Тип      | Значение поумолчанию                                                                                                                                | Описание                                                                                 |
|-----------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| event           | string   | 'click'                                                                                                                                             | Событие по которому будет происходить переключение табов.                                |
| prevent         | boolean  | true                                                                                                                                                | Использовать preventDefault?                                                             |
| onInit           | function   |  -                                                                                                                                             | Callback инициализации плагина.                                |
| initOpenTab     | boolean  | true                                                                                                                                                | Открывать активный таб при инициализации?                                                |
| activeIndex          | number   | 1                                                                                                                                                   | Активный элемент                                                                         |
| autoSwitching   | boolean  | false                                                                                                                                               | Авто переключение                                                                        |
| speedSwitching  | number   | 10000                                                                                                                                               | скорость авто переключения                                                               |
| parent          | string   | -                                                                                                                                                   | Селектор родительского DOM элемента для переключателей и содержимого табов               |
| hideOnClosest   | boolean  | true                                                                                                                                                | Закрыть содержимое при клике вне родительского DOM элемента (активно в режиме accordion) |
| useJqMethods    | boolean  | true                                                                                                                                                | Использовать jQuery методы анимаций?                                                     |
| jqMethodOpen    | string   | fadeIn                                                                                                                                              | jQuery метод открытия                                                                    |
| jqMethodClose   | string   | hide                                                                                                                                                | jQuery метод закрытия                                                                    |
| pauseVideoAudio | boolean  | true                                                                                                                                                | Cтавить на паузу аудио и видео при переключении табов?                                   |
| state           | string   | 'tab'                                                                                                                                               | Режим плагина tab/accordion                                                              |
| onTab           | function | -                                                                                                                                                   | Callback при нажатии на переключатель                                                    |
| onMouseover     | function | -                                                                                                                                                   | Навели курсор на блок табов                                                              |
| onMouseout      | function | -                                                                                                                                                   | Убрали курсор с блока табов                                                              |
| classes         | object   | `hover`: 'is-data-tabs-hover'<br/>`activeButton`: 'is-button-active'<br/>`closeButton`: 'is-button-close'<br/>`activeTab`: 'is-tab-active'<br/>`closeTab`: 'is-tab-close' | Классы состояний                                                                                         |


## Разметка

Вместо привычных `href="#target"/id="target"` для связки переключателей и блоков иcпользуются data атрибуты.

`data-tab-anchor` - дата атрибут переключателей.

`data-tab-target` - дата атрибут блоков содержимого.

> Значения атрибутов переключателей и блоков содержимого должны быть идентичны

> Не указывая `parent` следует использовать следущие вложенности: Родительский контейнер > Контейнер переключателей > Переключатель, Родительский контейнер > Контейнер блоков содержимого > блок содержимого

## Пример

[Онлайн пример табов на codepen.io.](https://codepen.io/brainmurder/pen/jwPoRZ)

[Онлайн пример аккордеона на codepen.io.](https://codepen.io/brainmurder/pen/jwPoMB)

[Онлайн пример переключения по наведению курсора на codepen.io.](https://codepen.io/brainmurder/pen/RgWbxw)

```
<div class="js-tabs">
  <div>
    <button data-tab-anchor="1" type="button" name="button" class="js-tabs-item">
      Первая вкладка
    </button>
    <button data-tab-anchor="2" type="button" name="button" class="js-tabs-item">
      Вторая вкладка
    </button>
  </div>


  <div>
    <div data-tab-target="1">
      Содержимое первой вкладки
    </div>
    <div data-tab-target="2">
      Содержимое второй вкладки
    </div>
  </div>
</div>
```

```js
$('.js-tabs-item').dataTabs({
  event: 'click',
  parent: '.js-tabs',
  jqMethodOpen: 'fadeIn',
  jqMethodClose: 'hide'
});
```
