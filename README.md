# Табы на jQuery

## CDN

```
  <script src="https://cdn.jsdelivr.net/gh/VladimirIvanin/dataTabs@0.8.5/dist/dataTabs.js"></script>
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
| hideOnClosest   | boolean  | false                                                                                                                                                | Закрыть содержимое при клике вне родительского DOM элемента (активно в режиме accordion) |
| useJqMethods    | boolean  | true                                                                                                                                                | Использовать jQuery методы анимаций?                                                     |
| jqMethodOpen    | string   | fadeIn                                                                                                                                              | jQuery метод открытия                                                                    |
| jqMethodClose   | string   | hide                                                                                                                                                | jQuery метод закрытия                                                                    |
| pauseVideoAudio | boolean  | true                                                                                                                                                | Cтавить на паузу аудио и видео при переключении табов?                                   |
| state           | string   | 'tab'                                                                                                                                               | Режим плагина tab/accordion                                                              |
| onTab           | function | -                                                                                                                                                   | Callback при нажатии на переключатель. Возвращает (self, $anchor, $target)                                                   |
| onMouseover     | function | -                                                                                                                                                   | Навели курсор на блок табов                                                              |
| onMouseout      | function | -                                                                                                                                                   | Убрали курсор с блока табов                                                              |
| classes         | object   | `hover`: 'is-data-tabs-hover'<br/>`activeButton`: 'is-button-active'<br/>`closeButton`: 'is-button-close'<br/>`activeTab`: 'is-tab-active'<br/>`closeTab`: 'is-tab-close' | Классы состояний                                                                                         |


## Разметка

Для связки переключателей и блоков иcпользуются data атрибуты:

* `data-tabs-container` - дата атрибут контейнера.

* `data-tab-anchor` - дата атрибут переключателей.

* `data-tab-target` - дата атрибут блоков содержимого.

* `data-tab-active` - дата атрибут активного элемента. В state == 'accordion' activeIndex = null;

> Значения атрибутов переключателей и блоков содержимого должны быть идентичны

> Все data атрибуты *обязательны*!

## Пример

[Онлайн пример табов на codepen.io.](https://codepen.io/brainmurder/pen/jwPoRZ)

[Онлайн пример аккордеона на codepen.io.](https://codepen.io/brainmurder/pen/jwPoMB)

[Онлайн пример переключения по наведению курсора на codepen.io.](https://codepen.io/brainmurder/pen/RgWbxw)

```html
<!--
Для инициализации плагина используется селектор контейнера (data-tabs-container).
В данном случае это $('.js-tabs')
-->
<div class="js-tabs" data-tabs-container>
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
$('.js-tabs').dataTabs();
```
