'use strict';

(function() {
  var CORRECTION = 116;

  window.initSlider = function(pin, scale, sliderValue) {

    pin.addEventListener('mousedown', function(evt) {
      evt.preventDefault();

      var startCoord = {
        x: evt.clientX
      };

      var onMouseMove = function(evtMove) {
        evtMove.preventDefault();

        var shift = {
          x: startCoord.x - evtMove.clientX
        };

        startCoord = {
          x: evtMove.clientX
        };

        pin.style.left = (pin.offsetLeft - shift.x) + 'px';

        var limits = {
          left: scale.offsetLeft,
          right: scale.offsetLeft + scale.offsetWidth - pin.offsetWidth
        };

        if (parseInt(pin.style.left, 10) <= limits.left) {
          pin.style.left = limits.left + 'px';
        }
        if (parseInt(pin.style.left, 10) >= limits.right) {
          pin.style.left = limits.right + 'px';
        }

        sliderValue = ((parseInt(pin.style.left, 10) + CORRECTION) * 100 / (scale.offsetWidth - pin.offsetWidth)).toFixed(0);
      };

      var onMouseUp = function(evtUp) {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  var cropToggle = document.querySelector('.photo-post__crop-toggle');
  var cropScale = document.querySelector('.photo-post__crop-scale');
  var cropInput = document.querySelector('.photo-post__crop-input');

  var fillToggle = document.querySelector('.photo-post__fill-toggle');
  var fillScale = document.querySelector('.photo-post__fill-scale');
  var fillInput = document.querySelector('.photo-post__fill-input');

  var contrastToggle = document.querySelector('.photo-post__contrast-toggle');
  var contrastScale = document.querySelector('.photo-post__contrast-scale');
  var contrastInput = document.querySelector('.photo-post__contrast-input');

  window.initSlider(cropToggle, cropScale, cropInput);
  window.initSlider(fillToggle, fillScale, fillInput);
  window.initSlider(contrastToggle, contrastScale, contrastInput);
})();
