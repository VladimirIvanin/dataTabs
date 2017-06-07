'use strict';

export default function triggerTab(self, index) {
  const options = self.options;
  let $anchor = self.$element;
  let $target = self.$target;

  let $targets = self.$targets;
  let $anchors = self.$anchors;

  if (Number.isInteger(index)) {
    $anchor = self.$box.find( '[data-' + self.options.controls.anchor + ']' ).eq(index);

    $target = self.$box.find( '[data-' + self.options.controls.target + '="' + $anchor.data(self.options.controls.anchor) + '"]' );
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

    self.states.activeIndex = $anchor.index();

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
