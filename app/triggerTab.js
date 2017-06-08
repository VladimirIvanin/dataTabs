'use strict';

export default function triggerTab(self, index) {
  const options = self.options;
  let $anchor = self.$element;
  let $target = null;

  let $targets = self.$targets;
  let $anchors = self.$anchors;

  // если передали больше чем есть кнопок
  let _stopIndex = self.counterElements - 1;
  if (index > _stopIndex) {
    index = _stopIndex;
  }



  if (Number.isInteger(index)) {
    $anchor = $anchors.eq(index);
    if ($anchor.get(0).dataTabs && $anchor.get(0).dataTabs.$target) {
      $target = $anchor.get(0).dataTabs['$target'];
    }else{
      console.warn('Для кнопки не назначен контент!', $anchor);
      return;
    }
  }


  var isActive = $anchor.hasClass( options.classes.activeButton ) && $target.is(':visible') && $target.hasClass( options.classes.activeTab );

  // только если активный, (isActive && options.useToggle) вызывает моргание
  if (isActive) {
    if (options.useToggle) {
      $anchors.removeClass( options.classes.activeButton ).addClass( options.classes.closeButton );
      $targets.removeClass( options.classes.activeTab ).addClass( options.classes.closeTab );

      if (options.useJqMethods && options.jqMethodOpen && options.jqMethodClose) {
        $targets[options.jqMethodClose](options.jqMethodCloseSpeed);
      }
    }
  }else{
    $anchors.removeClass( options.classes.activeButton ).addClass( options.classes.closeButton );
    $anchor.removeClass( options.classes.closeButton ).addClass( options.classes.activeButton );
    $targets.removeClass( options.classes.activeTab ).addClass( options.classes.closeTab );

    $target.removeClass( options.classes.closeTab ).addClass( options.classes.activeTab );

    if (options.useJqMethods && options.jqMethodOpen && options.jqMethodClose) {
      $targets[options.jqMethodClose](options.jqMethodCloseSpeed);
      $target[options.jqMethodOpen](options.jqMethodOpenSpeed);
    }

    // Активный индекс элемента в html коллекции кнопок.
    self.states.activeIndex = index;

    // колбек обновления
    self.options.onTab(event, self);

    const main_uuid = self.$element.get(0).dataTabs.uuid;
    // обновление табов (глобальный евент)
    $( document ).trigger( "datatabs:update", [main_uuid] );

    var $swiper = $target.find('.swiper-container');
    updateSwiper($swiper);

    var $owl = $target.find('.owl-carousel');
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
