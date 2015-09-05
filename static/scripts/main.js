'use strict';

var App = App || {};

App = {
  init: function () {
      console.log('Wdaup');
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
      var $characters = $('.character-selection');
      setBg( $characters.parent().first().children() );

      $characters.on('mouseenter', function (event) {
          setBg(this);
      });

      function setBg (node) {
          var imageUrl = $(node).data('url');
          $('.img-container').css('background-image', 'url('+imageUrl+')');
      }
  }
};
