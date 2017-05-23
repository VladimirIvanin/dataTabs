# Простые табы

```
<div data-tab-control="my-tabs">
  <button data-tab-anchor="1" type="button" name="button" class="js-tabs-item">
    Первая вкладка
  </button>
  <button data-tab-anchor="2" type="button" name="button" class="js-tabs-item">
    Вторая вкладка
  </button>
</div>


<div data-tab-box="my-tabs">
  <div data-tab-target="1">
    Содержимое первой вкладки
  </div>
  <div data-tab-target="2">
    Содержимое второй вкладки
  </div>
</div>


```

```js
$('.js-tabs-item').dataTabs({
  event: 'click',
  jqMethodOpen: 'fadeIn',
  jqMethodClose: 'hide',
  classes: {
    close: 'hide'
  }
});
```
