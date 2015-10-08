'use strict';

var App = App || {};

App = {
  init: function () {
    this.dropcap();
    this.triggerViz();
  },
  dropcap: function () {
    var dropcaps = document.querySelectorAll('.dropcap');
    window.Dropcap.layout(dropcaps, 3);
  },
  triggerViz: function () {
    $('aside#one').scotchPanel({
      containerSelector: '.viz',
      direction: 'left',
      duration: 300,
      transition: 'ease',
      clickSelector: '.viz-trigger',
      distanceX: '100%',
      forceMinHeight: true,
      enableEscapeKey: true
    });
  }
};
