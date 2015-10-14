'use strict';

var App = App || {};

App = {
  init: function () {
    this.dropcap();
    this.fadeStoryIn();
    this.nav();
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
  }
};
