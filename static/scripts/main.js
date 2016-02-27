/* global $, FastClick, Swiper, Blazy, document */

'use strict';

var App = App || {};

// Globals
// ===============================================
App.LooperID = '145925416';

// Initialize application
// =====================================================

App.init = function () {
  FastClick.attach(document.body);

  this.initProject();
  this.initProfile();
};

// Project design
// =====================================================
App.initProject = function () {
  this.dropcap();
  this.nav();
};

App.dropcap = function () {
  var dropcaps = document.querySelectorAll('.dropcap');
  window.Dropcap.layout(dropcaps, 2);
};

App.nav = function () {
  //open navigation clicking the menu icon
  var $trigger = $('.nav-trigger, .their-stories');
	$('.nav-trigger, .overlay, .landing-nav-trigger, .their-stories').on('click', function(event){
		event.preventDefault();

    if ( $trigger.hasClass('active') ) {
      toggleNav(false);
    } else {
      toggleNav(true);
      App.blazy.load( document.querySelectorAll('.grid-item') );
    }
	});

  function toggleNav(bool) {
		$('nav, .overlay').toggleClass('is-visible', bool);
    $('.nav-trigger').toggleClass('active', bool);
	}
};

App.bigvideo = function () {
  var self = this;
  $.okvideo({
    source: self.LooperID,
    volume: 0,
    hd:true,
    loop: true,
    adproof: true,
    annotations: false
  });
};

// Profile logic
// =====================================================
App.initProfile = function () {
  this.lazyload();
  this.profileScroll();
};

App.profileScroll = function () {
  var self = this;

  function lazyloadnodes (array) {
    // Take an array of DOM elements and lazy load images
    array.forEach(function (node) {
      if (!node) { return; }
      var twoUpCover = node.querySelector('.two-up#left'),
          imageCover = node.querySelector('.image-cover');

      if (imageCover) { self.blazy.load( imageCover ); }
      if (twoUpCover) { self.blazy.load( twoUpCover ); }
    });
  }

  self.swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    keyboardControl: true,
    mousewheelControl: true,
    hashnav: true,
    watchSlidesVisibility: true,
    effect: 'fade',
    fade: {
      crossFade: true
    },
    slidesPerView: 1,
    preloadImages: false,
    lazyLoading: true,
    a11y: true,
    followFinger: false,
    simulateTouch: false,
    onInit: function (swiper) {
      var slide = swiper.slides[swiper.activeIndex],
          nextSlide = document.querySelector('.swiper-slide-next');

      lazyloadnodes([slide, nextSlide]);
    },
    onSlideChangeStart: function () {
      var prevSlide = document.querySelector('.swiper-slide-prev'),
          nextSlide = document.querySelector('.swiper-slide-next');

      lazyloadnodes([prevSlide, nextSlide]);
    }
  });

  $('.fa-arrow-up').on('click', function (event) {
    event.preventDefault();
    self.swiper.slidePrev();
  });

  $('.fa-arrow-down, #start-profile').on('click', function (event) {
    event.preventDefault();
    self.swiper.slideNext();
  });
};

App.lazyload = function () {
  var self = this;
  self.blazy = new Blazy();
};

App.triggerModel = function () {
};

    $("#mobile-menu").on('click', function (event) {
      event.preventDefault();
      $("#mobile-navbar").slideToggle("open");
    });
