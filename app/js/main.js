
$(function () {
  $(".slider").slick({
    appendArrows: $('.servises__arrows'),
    nextArrow: '<button id="next" type="button" class="servises__arrow servises__arrow_next">След <img class="servises__arrow_img-next" src="img/arrowNext.svg" alt=""></button>',
    prevArrow: '<button id="prev" type="button" class="servises__arrow servises__arrow_prev"><img class="servises__arrow_img-prev"  src="img/arrowPrev.svg" alt="">Назад</button>'
  });
  $(".navigation__burger").click(function (e) {
    $(".navigation__burger, .navigation__ride-side").toggleClass("navigation__active")
  });
});