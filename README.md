# Простые табы

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
  jqMethodClose: 'hide',
  classes: {
    active: 'is-active',
    close: 'is-close'
  }
});
```
