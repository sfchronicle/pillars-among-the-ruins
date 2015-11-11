/* global $, d3, d4, queue, FastClick, Swiper, Blazy, document */

'use strict';

var App = App || {};

// Custom jQuery function to enable scrollTo logic
// =====================================================
$.fn.goTo = function() {
  $('html, body').animate({
    scrollTop: $(this).offset().top + 'px'
  }, 'fast');
  return this; // for chaining...
};

// Initialize application
// =====================================================

App.init = function () {
  FastClick.attach(document.body);

  this.initProject();
  this.initVisualizations();
  this.initProfile();
};

// Project design
// =====================================================
App.initProject = function () {
  this.dropcap();
  //this.fadeStoryIn();
  this.nav();
};

App.dropcap = function () {
  var dropcaps = document.querySelectorAll('.dropcap');
  window.Dropcap.layout(dropcaps, 3);
};
App.fadeStoryIn = function () {
  $('body').hide().fadeIn(1000);
};

App.nav = function () {
  //open navigation clicking the menu icon
	$('.nav-trigger').on('click', function(event){
		event.preventDefault();
		toggleNav(true);

    App.blazy.load( document.querySelectorAll('.grid-item') );
	});

	//close the navigation
	$('.cd-close-nav, .overlay').on('click', function(event){
		event.preventDefault();
		toggleNav(false);
	});

  function toggleNav(bool) {
		$('nav, .overlay').toggleClass('is-visible', bool);
		$('main').toggleClass('scale-down', bool);
	}
};

// Profile logic
// =====================================================
App.initProfile = function () {
  this.lazyload();
  this.profileScroll();
  this.fullscreenVideo();
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
    //setWrapperSize: true,
    keyboardControl: true,
    mousewheelControl: true,
    hashnav: true,
    watchSlidesVisibility: true,
    effect: 'fade',
    slidesPerView: 1,
    preloadImages: false,
    lazyLoading: true,
    a11y: true,
    onInit: function (swiper) {
      var slide = swiper.slides[swiper.activeIndex],
          nextSlide = document.querySelector('.swiper-slide-next');

      lazyloadnodes([slide, nextSlide]);
    },
    onSlideChangeStart: function (swiper) {
      /* So, first, in order to prevent lazyload from triggering,
         We check if we made it to the end, otherwise, we make sure
         that whether or not the reader comes from the beginning or
         the end of the slide, we preload the image in whatever
         direction they choose to navigate.
      */
      if (!swiper.isEnd) {
        // var currentSlide = swiper.slides[swiper.activeIndex];
        var prevSlide = document.querySelector('.swiper-slide-prev'),
            nextSlide = document.querySelector('.swiper-slide-next');

        lazyloadnodes([prevSlide, nextSlide]);

      } else {
        // To be implemented when this case is needed
      }
    }
  });

  $('.fa-arrow-up').on('click', function (event) {
    event.preventDefault();
    self.swiper.slidePrev();
  });

  $('.fa-arrow-down').on('click', function (event) {
    event.preventDefault();
    self.swiper.slideNext();
  });
};

App.fullscreenVideo = function () {
  $('.video-container').fitVids();
};

App.lazyload = function () {
  var self = this;
  self.blazy = new Blazy();
};
// Visualization
// =====================================================
App.initVisualizations = function () {
    this.setupInlines();
};

App.triggerViz = function () {
  $('aside#one').scotchPanel({
    containerSelector: '.viz', // .viz
    direction: 'right',
    duration: 300,
    transition: 'ease',
    clickSelector: '.viz-trigger',
    distanceX: '100%',
    forceMinHeight: true,
    enableEscapeKey: true
  });
};

App.setupInlines = function () {
  var self = this;
  var inlines = [{
    selector: 'stepper-graphic',
    callback: App.stepper
  }];

  inlines.forEach(function (obj) {
    self.reveal(obj.selector, obj.callback);
  });
};

App.reveal = function (selector, callback) {
  var $trigger = $('button#'+selector);
  var $reveal  = $('.inline#'+selector);

  $trigger.on('click', function (e) {
    e.preventDefault();

    $reveal.slideToggle('fast')
           .toggleClass('is-expanded')
           .goTo();

    if (typeof callback === 'function') { callback(); }
  });

  $('.viz-close').on('click', function (e) {
    e.preventDefault();

    $reveal.slideToggle('fast')
           .toggleClass('is-expanded');
  });
};

App.visualize = function (step) {
  console.log('Step', step);
  // ===================================
  function combineDatasets (us, sf) {
    /* Take two datasets  and combine into one
    */
    var format = function (dataset, type) {
      return dataset.map(function (d) {
        return {
          year: d.year,
          deaths: d.deaths,
          diagnoses: d.diagnoses,
          type: type
        };
      });
    };

    return format( us, 'us' ).concat( format( sf, 'sf' ) );
  }

  function makeViz(error, us, sf) {
    if (error) { throw error; }

    var data = combineDatasets( us, sf ).filter(function (d) {
      return parseInt(d.year) > 1984 && parseInt(d.year) < 2013;
    });

    var parsedData = d4.parsers.nestedGroup()
      .x(function () { return 'year'; })
        .nestKey(function () { return 'type'; })
      .y(function () { return 'diagnoses'; })
        .value(function () { return 'diagnoses'; })(data);

    var chart = d4.charts.line()
      .outerWidth( $graphic.width() )
      .x(function (x) {
        x.key('year');
      })
      .y(function (y) { y.key('diagnoses'); });


    d3.select('#vis-canvas')
      .datum(parsedData.data)
      .call(chart);
  }
  // ===================================

  var $graphic = $('#vis-canvas');

  $graphic.empty();

  queue()
    .defer(d3.csv, '/static/data/us-aids-deaths-diagnoses.csv')
    .defer(d3.csv, '/static/data/sf-aids-deaths-diagnoses.csv')
    .await(makeViz);
};

App.stepper = function () {
  App.visualize(1); // default

  function switchStep(newStep) {
    // Stepper Nav
    $('.step-link').toggleClass('active', false);
    $('#' + newStep).toggleClass('active', true);
  }

  function switchAnnotation(newStep) {
    // Step logic
    $('.annotation-step').hide();
    $('#' + newStep + '-annotation').delay(300).fadeIn(500);
  }

  // Click event to trigger annotation switch
  $('a.step-link').click(function(e) {
    e.preventDefault();

    var clickedStep = $(this).attr('id');

    switchStep(clickedStep);
    switchAnnotation(clickedStep);
    App.visualize(clickedStep);
    return false;
  });
};
