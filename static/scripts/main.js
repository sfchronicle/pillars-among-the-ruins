'use strict';

var App = App || {};

App = {
  init: function () {
    this.dropcap();
    this.fadeStoryIn();
    this.triggerViz();
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
  }
};
