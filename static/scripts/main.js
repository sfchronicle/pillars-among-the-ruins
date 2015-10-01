'use strict';

var App = App || {};

App = {
  init: function () {
    this.nav();
    this.profileList();
  },
  nav: function () {
    (function() {
      var body = document.body;
      var burgerMenu = document.getElementsByClassName('b-menu')[0];
      var burgerContain = document.getElementsByClassName('b-container')[0];
      var burgerNav = document.getElementsByClassName('b-nav')[0];

      burgerMenu.addEventListener('click', function toggleClasses() {
        [body, burgerContain, burgerNav].forEach(function (el) {
          el.classList.toggle('open');
        });
      }, false);
    })();
  },
  profileList: function () {
    var self = this;
    var $characters = $('.character-selection');
    self.current = $('.img-container');

    $characters.on('mouseenter', function (event) { setBg(this); });
    $characters.on('mouseout', function (event) { setBg(self.current); });

    function setBg (node) {
      var imageUrl = $(node).data('url');
      $('.img-container').css('background-image', 'url('+imageUrl+')');
    }
  }
};
