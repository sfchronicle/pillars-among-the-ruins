/* global $, d3, d4, queue */

'use strict';

var App = App || {};

// Custom jQuery function to enable scrollTo logic
$.fn.goTo = function() {
  $('html, body').animate({
    scrollTop: $(this).offset().top + 'px'
  }, 'fast');
  return this; // for chaining...
};

App = {
  init: function () {
    this.dropcap();
    this.fadeStoryIn();
    this.nav();

    this.setupInlines();
  },
  dropcap: function () {
    var dropcaps = document.querySelectorAll('.dropcap');
    window.Dropcap.layout(dropcaps, 3);
  },
  fadeStoryIn: function () {
    $('body').hide().fadeIn(1000);
  },
  triggerViz: function () {
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
  },
  nav: function () {
    //open navigation clicking the menu icon
  	$('.nav-trigger').on('click', function(event){
  		event.preventDefault();
  		toggleNav(true);
  	});
  	//close the navigation
  	$('.cd-close-nav, .overlay').on('click', function(event){
  		event.preventDefault();
  		toggleNav(false);
  	});
  	//select a new section
  	// $('.nav-list li').on('click', function(event){
  	// 	event.preventDefault();
  	// 	var target = $(this),
  	// 		//detect which section user has chosen
  	// 		sectionTarget = target.data('menu');
  	// 	if( !target.hasClass('cd-selected') ) {
  	// 		//if user has selected a section different from the one alredy visible
  	// 		//update the navigation -> assign the .cd-selected class to the selected item
  	// 		target.addClass('cd-selected').siblings('.cd-selected').removeClass('cd-selected');
  	// 		//load the new section
  	// 		loadNewContent(sectionTarget);
  	// 	} else {
  	// 		// otherwise close navigation
  	// 		toggleNav(false);
  	// 	}
  	// });

  	function toggleNav(bool) {
  		$('nav, .overlay').toggleClass('is-visible', bool);
  		$('main').toggleClass('scale-down', bool);
  	}

  	function loadNewContent(newSection) {
  		//create a new section element and insert it into the DOM
  		var section = $('<section class="cd-section '+newSection+'"></section>').appendTo($('main'));
  		//load the new content from the proper html file
  		section.load(newSection+'.html .cd-section > *', function(){
  			//add the .cd-selected to the new section element -> it will cover the old one
  			section.addClass('cd-selected').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
  				//close navigation
  				toggleNav(false);
  			});
  			section.prev('.cd-selected').removeClass('cd-selected');
  		});

  		$('main').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
  			//once the navigation is closed, remove the old section from the DOM
  			section.prev('.cd-section').remove();
  		});

  		if( $('.no-csstransitions').length > 0 ) {
  			//if browser doesn't support transitions - don't wait but close navigation and remove old item
  			toggleNav(false);
  			section.prev('.cd-section').remove();
  		}
  	}
  },
  setupInlines: function () {
    var self = this;
    var inlines = [{
      selector: 'stepper-graphic',
      callback: App.stepper
    }];

    inlines.forEach(function (obj) {
      self.reveal(obj.selector, obj.callback);
    });
  },
  reveal: function (selector, callback) {
    var $trigger = $('button#'+selector);
    var $reveal  = $('.inline#'+selector);

    $trigger.on('click', function (e) {
      e.preventDefault();

      $reveal.slideToggle('fast')
             .toggleClass('is-expanded')
             .goTo();

      typeof callback === 'function' && callback();
    });

    $('.viz-close').on('click', function (e) {
      e.preventDefault();

      $reveal.slideToggle('fast')
             .toggleClass('is-expanded');
    });
  },
  visualize: function (step) {
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
        })
      };

      return format( us, 'us' ).concat( format( sf, 'sf' ) );
    }

    function makeViz(error, us, sf) {
      if (error) { throw error; }

      var data = combineDatasets( us, sf ).filter(function (d) {
        return parseInt(d.year) > 1984 && parseInt(d.year) < 2013;
      });


      var parseDate = d3.time.format('%Y').parse;
      var range = d3.extent(data, function(d) { return d.year; });

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
        .call(chart)
    }
    // ===================================

    var $graphic = $('#vis-canvas');

    $graphic.empty();

    queue()
      .defer(d3.csv, '/static/data/us-aids-deaths-diagnoses.csv')
      .defer(d3.csv, '/static/data/sf-aids-deaths-diagnoses.csv')
      .await(makeViz)
  },
  stepper: function () {
    App.visualize(1); // default

    function switchStep(newStep) {
      // Stepper Nav
      $('.step-link').toggleClass('active', false);
      $('#' + newStep).toggleClass('active', true);
    }

    function switchAnnotation(newStep) {
      // Step logic
      $(".annotation-step").hide();
      $("#" + newStep + "-annotation").delay(300).fadeIn(500);
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
  }
};
