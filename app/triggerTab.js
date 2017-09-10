'use strict';
import logger from './logger.js';

export default function triggerTab(self, index) {
  const options = self.options;
  const main_uuid = self.$element.get(0).dataTabs.uuid;
  let $anchor = self.$element;
  let $target = null;

  let $targets = self.$targets;
  let $anchors = self.$anchors;

  // если передали больше чем есть кнопок
  let _stopIndex = self.counterElements - 1;
  if (index > _stopIndex) {
    index = _stopIndex;
  }

  if ($.isNumeric(index)) {
    let _$anchor = $anchors.eq(index);
    let selector = _$anchor.data(options.controls.anchor);
    let containerSelector = '[data-' + options.controls.container +']';
    $anchor = self.$element.find('[data-'+options.controls.anchor+'="'+selector+'"]').filter(function( index, el ) {
      let isMain = false;
      const $parent = $(el).parents( containerSelector ).get(0);
      if ($parent && $parent.dataTabs && $parent.dataTabs.uuid) {
        isMain = $parent.dataTabs.uuid == main_uuid;
      }

      return isMain;
    });
    if ($anchor.get(0) && $anchor.get(0).dataTabs && $anchor.get(0).dataTabs.$target) {
      $target = $anchor.get(0).dataTabs.$target;
    }else{
      console.warn('Для кнопки не назначен контент!', $anchor);
      return;
    }
  }

  logger(self.options, 'triggerTab:index', index);
  logger(self.options, 'triggerTab:$anchor', $anchor);

  var isActive = $anchor.hasClass( options.classes.activeButton ) && $target.is(':visible') && $target.hasClass( options.classes.activeTab );


  if (!options.initOpenTab) {
    isActive = $target.is(':visible');
  }

  logger(self.options, 'triggerTab:isActive', isActive);

  var $swiper = $target.find('.swiper-container');
  var $owl = $target.find('.owl-carousel');

  // только если активный, (isActive && options.useToggle) вызывает моргание
  if (isActive) {
    if (options.useToggle) {
      $anchors.removeClass( options.classes.activeButton ).addClass( options.classes.closeButton );
      $targets.removeClass( options.classes.activeTab ).addClass( options.classes.closeTab );

      if (options.useJqMethods && options.jqMethodClose) {
        $.each($targets, function(_index, el) {
          if ($(el).is(':visible')) {
            $(el)[options.jqMethodClose](options.jqMethodCloseSpeed);
          }
        });
      }

      // Активный индекс элемента в html коллекции кнопок.
      self.states.activeIndex = index;

      // колбек обновления
      self.options.onTab(self, $anchor, $target);

      // обновление табов (глобальный евент)
      $( document ).trigger( "datatabs:update", [main_uuid] );


      updateSwiper($swiper);

      updateOwl($owl);

      if (options.pauseVideoAudio) {
        pauseVideoAudio($targets.not(`.${options.classes.activeTab}`))
      }
    }
  }else{
    $anchors.removeClass( options.classes.activeButton ).addClass( options.classes.closeButton );
    $anchor.removeClass( options.classes.closeButton ).addClass( options.classes.activeButton );
    $targets.removeClass( options.classes.activeTab ).addClass( options.classes.closeTab );

    $target.removeClass( options.classes.closeTab ).addClass( options.classes.activeTab );

    if (options.useJqMethods && options.jqMethodClose) {
      $.each($targets, function(_index, el) {
        if ($(el).is(':visible')) {
          $(el)[options.jqMethodClose](options.jqMethodCloseSpeed);
        }
      });
    }

    if (options.useJqMethods && options.jqMethodOpen && $target.is(':hidden')) {
      $target[options.jqMethodOpen](options.jqMethodOpenSpeed);
    }

    // Активный индекс элемента в html коллекции кнопок.
    self.states.activeIndex = index;

    // колбек обновления
    self.options.onTab(self, $anchor, $target);

    // обновление табов (глобальный евент)
    $( document ).trigger( "datatabs:update", [main_uuid] );

    updateSwiper($swiper);

    updateOwl($owl);

    if (options.pauseVideoAudio) {
      pauseVideoAudio($targets.not(`.${options.classes.activeTab}`))
    }

  }
}

function updateSwiper($swiper) {
  if ($swiper && $swiper[0] && $swiper[0].swiper) {
    $.each($swiper, function(index, $el) {
      if ($el.swiper.update) {
        $el.swiper.update(true);
      }
    });
  }
}

function updateOwl($owl) {
  if ($owl && $owl.owlCarousel && $owl.owlCarousel().trigger) {
    $owl.owlCarousel().trigger('refresh.owl.carousel');
  }
}

function pauseVideoAudio($targets) {
  $targets.each(function(index, el) {
    $(el).find('video').each(function () { this.pause() });
    $(el).find('audio').each(function () { this.pause() });
  });
}
