/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

// UNUSED EXPORTS: default

;// CONCATENATED MODULE: ./lib/slider/constants.js
var SLIDER_DIRECTION = {
  horizontal: 'horizontal',
  vertical: 'vertical',
  verticalBtt: 'verticalBtt'
};

;// CONCATENATED MODULE: ./lib/slider/slider-default-settings.js

var DEFAULT_SLIDER_SETTINGS = {
  direction: SLIDER_DIRECTION.horizontal,
  isQuestionValue: true,
  isCustomScale: true,
  containerSize: 600,
  customScale: {
    min: -10,
    max: 10,
    start: '',
    step: 1
  }
};

;// CONCATENATED MODULE: ./lib/slider/utils.js
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Utils = /*#__PURE__*/function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: "floor",
    value: function floor(value, precision) {
      var multiplier = Math.pow(10, precision);
      return Math.floor(value * multiplier) / multiplier;
    }
  }, {
    key: "round",
    value: function round(value, precision) {
      var multiplier = Math.pow(10, precision);
      return Math.round(value * multiplier) / multiplier;
    }
  }, {
    key: "getElementOffset",
    value: function getElementOffset(element) {
      if (!element) {
        return;
      }

      var rect = element.getBoundingClientRect();
      var offset = {
        // for cross-browser compatibility, use window.page(X/Y)Offset instead of window.scroll(X/Y)
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset
      };
      return offset;
    }
  }, {
    key: "outerWidth",
    value: function outerWidth(element) {
      if (!element) {
        return;
      }

      var width = element.offsetWidth;
      var style = window.getComputedStyle(element);
      width += parseInt(style.marginLeft) + parseInt(style.marginRight);
      return width;
    }
  }, {
    key: "outerHeight",
    value: function outerHeight(element) {
      if (!element) {
        return;
      }

      var height = element.offsetHeight;
      var style = window.getComputedStyle(element);
      height += parseInt(style.marginTop) + parseInt(style.marginBottom);
      return height;
    }
    /**
     * @param {Element} element
     * @return {object} get computed style for an element, excluding any default styles 
     */

  }, {
    key: "getStylesWithoutDefaults",
    value: function getStylesWithoutDefaults(element) {
      if (!element) {
        return;
      } // creating an empty dummy object to compare with


      var dummy = document.createElement('div');
      element.parentNode.appendChild(dummy); // getting computed styles for both elements

      var defaultStyles = window.getComputedStyle(dummy);
      var elementStyles = window.getComputedStyle(element); // calculating the difference

      var diff = {};

      var _iterator = _createForOfIteratorHelper(elementStyles),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var key = _step.value;

          if (defaultStyles.hasOwnProperty(key) && defaultStyles[key] !== elementStyles[key]) {
            diff[key] = elementStyles[key];
          }
        } // clear dom

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      dummy.parentNode.removeChild(dummy);
      return diff;
    }
  }]);

  return Utils;
}();


;// CONCATENATED MODULE: ./lib/slider/slider-open-renderer.js
function slider_open_renderer_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function slider_open_renderer_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function slider_open_renderer_createClass(Constructor, protoProps, staticProps) { if (protoProps) slider_open_renderer_defineProperties(Constructor.prototype, protoProps); if (staticProps) slider_open_renderer_defineProperties(Constructor, staticProps); return Constructor; }




var SliderOpenRenderer = /*#__PURE__*/function () {
  function SliderOpenRenderer(sliderId, sliderContainer, sliderValues, sliderSettings) {
    slider_open_renderer_classCallCheck(this, SliderOpenRenderer);

    this.id = sliderId;
    this.container = sliderContainer;
    this.values = sliderSettings.isRtl && sliderSettings.direction === SLIDER_DIRECTION.horizontal ? sliderValues.slice().reverse() : sliderValues;
    this.valuesWithStep = this.getValuesWithStep(sliderSettings.customScale.min, sliderSettings.customScale.max, sliderSettings.customScale.step);
    this.settings = sliderSettings;
  }

  slider_open_renderer_createClass(SliderOpenRenderer, [{
    key: "render",
    value: function render() {
      var sliderContainer = document.createElement('div');
      var directionModifiers = this.getDirectionModifiers();
      sliderContainer.setAttribute('class', 'cf-single-slider-question cf-single-slider-question--custom ' + directionModifiers.question);
      this.setContainerSize(sliderContainer, this.settings.containerSize);
      sliderContainer.setAttribute('id', this.id);
      var slider = document.createElement('div');
      slider.setAttribute('class', 'cf-single-slider-question__slider cf-slider ' + directionModifiers.slider);
      var labels = this.createLabels();
      slider.appendChild(labels);
      var trackArea = this.createTrackArea();
      slider.appendChild(trackArea);
      sliderContainer.appendChild(slider);
      this.container.appendChild(sliderContainer);
      this.setDefaultStylesIfNeeded(this.container);

      if (this.settings.direction === SLIDER_DIRECTION.horizontal) {
        this.setHorizontalSliderLabelMargins(labels.querySelectorAll('li'));
      }
    }
  }, {
    key: "getDirectionModifiers",
    value: function getDirectionModifiers() {
      var directionModifiers = {};

      if (this.settings.direction === SLIDER_DIRECTION.horizontal) {
        directionModifiers.question = this.settings.isRtl ? 'cf-single-slider-question--horizontal-rtl' : 'cf-single-slider-question--horizontal';
        directionModifiers.slider = 'cf-slider--horizontal';
      } else if (this.settings.direction === SLIDER_DIRECTION.vertical) {
        directionModifiers.question = 'cf-single-slider-question--vertical';
        directionModifiers.slider = 'cf-slider--vertical';
      } else if (this.settings.direction === SLIDER_DIRECTION.verticalBtt) {
        directionModifiers.question = this.settings.isRtl ? 'cf-single-slider-question--vertical-rtl' : 'cf-single-slider-question--vertical';
        directionModifiers.question += this.settings.isRtl ? ' cf-single-slider-question--vertical-btt-rtl' : ' cf-single-slider-question--vertical-btt';
        directionModifiers.slider = this.settings.isRtl ? 'cf-slider--vertical-rtl' : 'cf-slider--vertical';
        directionModifiers.slider += ' cf-slider--vertical-btt';
      }

      directionModifiers.slider += this.settings.isRtl ? '-rtl' : '';
      return directionModifiers;
    }
  }, {
    key: "createTrackArea",
    value: function createTrackArea() {
      var trackArea = document.createElement('div');
      trackArea.setAttribute('class', 'cf-slider__track-area');
      var track = document.createElement('div');
      track.setAttribute('class', 'cf-slider__track');
      var noValue = document.createElement('div');
      noValue.setAttribute('class', 'cf-slider__no-value');
      var handle = this.createHandle();
      track.appendChild(noValue);
      track.appendChild(handle);
      trackArea.appendChild(track);
      return trackArea;
    }
  }, {
    key: "createHandle",
    value: function createHandle() {
      var handle = document.createElement('div');
      handle.setAttribute('class', 'cf-slider__handle cf-slider__handle--no-value');
      handle.setAttribute('role', 'slider');
      handle.setAttribute('aria-readonly', 'false');
      handle.setAttribute('tabindex', '0');
      handle.setAttribute('aria-valuenow', '-1');
      handle.setAttribute('aria-valuemin', this.settings.customScale.min);
      handle.setAttribute('aria-valuemax', this.settings.customScale.max);
      handle.setAttribute('aria-valuetext', 'NO RESPONSE');
      handle.setAttribute('aria-orientation', this.settings.direction);
      return handle;
    }
  }, {
    key: "createLabels",
    value: function createLabels() {
      var labelsContainer = document.createElement('ol');
      labelsContainer.className = 'cf-single-slider-question__labels';
      var intervalSize = 100 / this.values.length;

      for (var i = 0; i < this.values.length; i++) {
        var startInterval = Utils.round(i * intervalSize, 2);
        var endInterval = Utils.round((i + 1) * intervalSize, 2);
        var labelOffset = Utils.floor((startInterval + endInterval) / 2, 2);
        var value = this.values[i];
        var label = this.createLabel(value.code, value.text);
        this.setLabelOffset(label, value.text, labelOffset);
        this.setLabelVisibility(label, value.text);
        labelsContainer.insertAdjacentElement('beforeend', label);
      }

      return labelsContainer;
    }
  }, {
    key: "createLabel",
    value: function createLabel(valueCode, valueText) {
      var label = document.createElement('li');
      label.setAttribute('class', 'cf-single-slider-question__label');
      label.setAttribute('id', this.id + '_' + valueCode + '_label');
      var answerText = document.createElement('div');
      answerText.setAttribute('class', 'cf-single-slider-question__answer-text');
      answerText.setAttribute('id', this.id + '_' + valueCode + '_text');
      answerText.innerHTML = valueText;
      label.insertAdjacentElement('beforeend', answerText);
      return label;
    }
  }, {
    key: "setContainerSize",
    value: function setContainerSize(containerElement, size) {
      if (this.settings.direction === SLIDER_DIRECTION.vertical || this.settings.direction === SLIDER_DIRECTION.verticalBtt) {
        if (!size) {
          size = this.valuesWithStep.length * 3 * 16; //1em = 16px, 3 - magic number
        }

        containerElement.style.height = size + 'px';
      } else {
        containerElement.style.width = size + 'px';
      }
    }
  }, {
    key: "setLabelOffset",
    value: function setLabelOffset(label, labelText, labelOffset) {
      if (this.settings.direction === SLIDER_DIRECTION.vertical || this.settings.direction === SLIDER_DIRECTION.verticalBtt) {
        label.style.top = labelOffset.toString() + '%';
      } else {
        label.style.left = labelOffset.toString() + '%'; //label.style.marginLeft = (-0.25 + labelText.length * -0.25).toString() + 'em';
      }
    }
  }, {
    key: "setHorizontalSliderLabelMargins",
    value: function setHorizontalSliderLabelMargins(labels) {
      var fontSizeInPixels = window.getComputedStyle(labels[0]).fontSize;
      var fontSize = fontSizeInPixels.substring(0, fontSizeInPixels.length - 2);
      Array.prototype.forEach.call(labels, function (label) {
        var labelWidth = label.clientWidth;
        label.style.marginLeft = -(labelWidth / 2) / fontSize + 'em';
      });
    }
  }, {
    key: "setLabelVisibility",
    value: function setLabelVisibility(label, labelText) {
      if (!this.valuesWithStep.includes(labelText)) {
        label.classList.add('hidden');
      }
    }
    /**
     * @param {number} start
     * @param {number} end
     * @param {number} step
     * @return {Array} returns an array of numbers
     */

  }, {
    key: "getValuesWithStep",
    value: function getValuesWithStep(start, end, step) {
      var values = [];
      var currentValue = start;

      while (currentValue <= end) {
        values.push(currentValue.toString());
        currentValue += step;
      }

      return values;
    }
  }, {
    key: "setDefaultStylesIfNeeded",
    value: function setDefaultStylesIfNeeded(sliderContainer) {
      if (!sliderContainer) {
        return;
      }

      var sliderTrackArea = document.querySelector('#' + this.id + ' .cf-slider__track-area');
      var stylesToCursorApplied = window.getComputedStyle(sliderTrackArea).cursor === "pointer";

      if (!stylesToCursorApplied) {
        sliderContainer.classList.add('default-styles_active');
      }
    }
  }]);

  return SliderOpenRenderer;
}();


;// CONCATENATED MODULE: ./lib/slider/event.js
function event_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function event_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function event_createClass(Constructor, protoProps, staticProps) { if (protoProps) event_defineProperties(Constructor.prototype, protoProps); if (staticProps) event_defineProperties(Constructor, staticProps); return Constructor; }

var Event = /*#__PURE__*/function () {
  /**
   * Create instance.
   * @param {string} name - Event name.
   */
  function Event(name) {
    event_classCallCheck(this, Event);

    this._name = name;
    this.subscribers = [];
  }
  /**
   * Event name.
   * @type {string}
   * @readonly
   */


  event_createClass(Event, [{
    key: "name",
    get: function get() {
      return this._name;
    }
    /**
     * Subscribe to event.
     * @param {function} subscriber - Event handler function.
     */

  }, {
    key: "on",
    value: function on(subscriber) {
      if (this.subscribers.find(function (item) {
        return item === subscriber;
      }) !== undefined) {
        return;
      }

      this.subscribers.push(subscriber);
    }
    /**
     * Unsubscribe from event.
     * @param {function} subscriber - Event handler function.
     */

  }, {
    key: "off",
    value: function off(subscriber) {
      this.subscribers = this.subscribers.filter(function (item) {
        return item !== subscriber;
      });
    }
    /**
     * Trigger the event.
     * @param {object} data
     */

  }, {
    key: "trigger",
    value: function trigger() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this.subscribers.forEach(function (item) {
        return item(data);
      });
    }
  }]);

  return Event;
}();


;// CONCATENATED MODULE: ./lib/slider/keyboard-keys.js
/**
 * @module keybord-keys
 */
/* harmony default export */ var keyboard_keys = ({
  SpaceBar: 32,
  Enter: 13,
  ArrowLeft: 37,
  ArrowUp: 38,
  ArrowRight: 39,
  ArrowDown: 40,
  PageUp: 33,
  PageDown: 34,
  Home: 36,
  End: 35,
  Tab: 9
});
;// CONCATENATED MODULE: ./lib/slider/slider-base.js
function slider_base_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function slider_base_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function slider_base_createClass(Constructor, protoProps, staticProps) { if (protoProps) slider_base_defineProperties(Constructor.prototype, protoProps); if (staticProps) slider_base_defineProperties(Constructor, staticProps); return Constructor; }





var SliderBase = /*#__PURE__*/function () {
  /**
   * @param sliderNodeId {string} - slider node id
   * @param values {Object[]} - array of values
   * @param value {Object} - current slider value
   * @param textValueHandler {function} - (sliderValue) => { return 'text representation of slider value' }
   * @param readOnly {boolean} should slider be in read only mode
   */
  function SliderBase(sliderNodeId) {
    var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var textValueHandler = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var readOnly = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    slider_base_classCallCheck(this, SliderBase);

    this.values = values;
    this.valueIndex = -1;
    this.trackIntervals = [];
    this.trackPageUpPageDownStep = 1;
    this.isSliding = false;
    this.readOnly = readOnly;
    this.textValueHandler = textValueHandler;
    this._changeEvent = new Event('slider:change');
    this.sliderNode = this.getSliderNode(sliderNodeId);
    this.handleNode = this.getHandleNode();
    this.noValueNode = this.getNoValueNode();
    this.trackNode = this.getTrackNode();
    this.sliderNodeSlidingModifierClass = 'cf-slider--sliding';
    this.handleNodeNoValueModifierClass = 'cf-slider__handle--no-value';
    this.init(value);
  }
  /**
   * Get slider value
   * @return {Object|null} current slider value
   */


  slider_base_createClass(SliderBase, [{
    key: "value",
    get: function get() {
      return this.values[this.valueIndex] || null;
    }
    /**
     * Set slider value
     * @param newValue
     */
    ,
    set: function set(newValue) {
      this.setValueIndex(this.values.findIndex(function (value) {
        return value === newValue;
      }));
    }
    /**
     * Fires after slider values is changed
     * @return {Event}
     */

  }, {
    key: "changeEvent",
    get: function get() {
      return this._changeEvent;
    }
    /**
     * Set slider value silently without triggering change event
     * @param newValue
     */

  }, {
    key: "setValueSilently",
    value: function setValueSilently(newValue) {
      this.setValueIndex(this.values.findIndex(function (value) {
        return value === newValue;
      }), true);
    }
    /**
     * Detach slider control from DOM
     */

  }, {
    key: "detachFromDOM",
    value: function detachFromDOM() {
      this.trackNode.removeEventListener('click', this.onTrackClick);
      this.noValueNode.removeEventListener('click', this.onNoValueNodeClick);
      this.handleNode.removeEventListener('mousedown', this.onHandleMouseDown);
      document.removeEventListener('mousemove', this.onDocumentMouseMove);
      document.removeEventListener('mouseup', this.onDocumentMouseUp);
      this.handleNode.removeEventListener('touchstart', this.onHandleTouchStart);
      document.removeEventListener('touchmove', this.onDocumentTouchMove);
      document.removeEventListener('touchend', this.onDocumentTouchEnd);
      this.handleNode.removeEventListener('keydown', this.onHandleKeyPress);
    }
  }, {
    key: "init",
    value: function init(value) {
      this.calculateTrackIntervals();
      this.calculateTrackPageUpPageDownStep();
      this.attachToDOM();
      this.value = value;

      if (this.valueIndex === -1) {
        this.syncHandlePositionToIndexValue();
        this.updateNoValueCSSAttribute();
      }
    } // TODO: make an optimization for a large number of values, when interval less than one pixel.

  }, {
    key: "calculateTrackIntervals",
    value: function calculateTrackIntervals() {
      var intervalSize = 100 / this.values.length;

      for (var i = 0; i < this.values.length; i++) {
        var startInterval = Utils.round(i * intervalSize, 2);
        var endInterval = Utils.round((i + 1) * intervalSize, 2);
        this.trackIntervals.push([startInterval, endInterval]);
      }
    }
  }, {
    key: "calculateTrackPageUpPageDownStep",
    value: function calculateTrackPageUpPageDownStep() {
      if (this.values.length < 10) {
        this.trackPageUpPageDownStep = 1;
      }

      this.trackPageUpPageDownStep = Math.round(this.values.length / 5);
    }
  }, {
    key: "attachToDOM",
    value: function attachToDOM() {
      // click
      this.onTrackClick = this.onTrackClick.bind(this);
      this.onNoValueNodeClick = this.onNoValueNodeClick.bind(this);
      this.trackNode.addEventListener('click', this.onTrackClick);
      this.noValueNode.addEventListener('click', this.onNoValueNodeClick); // mouse

      this.onHandleMouseDown = this.onHandleMouseDown.bind(this);
      this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
      this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this);
      this.handleNode.addEventListener('mousedown', this.onHandleMouseDown);
      document.addEventListener('mousemove', this.onDocumentMouseMove);
      document.addEventListener('mouseup', this.onDocumentMouseUp); // touch

      this.onHandleTouchStart = this.onHandleTouchStart.bind(this);
      this.onDocumentTouchMove = this.onDocumentTouchMove.bind(this);
      this.onDocumentTouchEnd = this.onDocumentTouchEnd.bind(this);
      this.handleNode.addEventListener('touchstart', this.onHandleTouchStart);
      document.addEventListener('touchmove', this.onDocumentTouchMove);
      document.addEventListener('touchend', this.onDocumentTouchEnd); //keyboard

      this.onHandleKeyPress = this.onHandleKeyPress.bind(this);
      this.handleNode.addEventListener('keydown', this.onHandleKeyPress);
    }
  }, {
    key: "getValueIndexByTrackValue",
    value: function getValueIndexByTrackValue(trackValue) {
      var _this = this;

      var search = function search(minIndex, maxIndex) {
        if (minIndex > maxIndex) {
          return -1;
        }

        var midIndex = Math.floor((minIndex + maxIndex) / 2);
        var interval = _this.trackIntervals[midIndex];

        if (trackValue < interval[0]) {
          return search(minIndex, midIndex - 1);
        }

        if (trackValue > interval[1]) {
          return search(midIndex + 1, maxIndex);
        }

        return midIndex;
      };

      return search(0, this.trackIntervals.length - 1);
    }
  }, {
    key: "setValueIndex",
    value: function setValueIndex(value) {
      var isSilent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (this.valueIndex === value || this.readOnly) {
        return;
      }

      this.valueIndex = value;
      this.syncHandlePositionToIndexValue();
      this.updateNoValueCSSAttribute();
      this.updateAccessibilityState();

      if (!isSilent) {
        this.changeEvent.trigger();
      }
    } // track value in percent

  }, {
    key: "getTrackValue",
    value: function getTrackValue(absoluteValue) {
      if (absoluteValue < 0) {
        absoluteValue = 0;
      }

      if (absoluteValue > this.getTrackNodeSize()) {
        absoluteValue = this.getTrackNodeSize();
      }

      return Math.round(absoluteValue / this.getTrackNodeSize() * 100);
    }
  }, {
    key: "getTrackValueByInterval",
    value: function getTrackValueByInterval(interval) {
      return Utils.floor((interval[0] + interval[1]) / 2, 2);
    } // eslint-disable-next-line no-unused-vars

  }, {
    key: "setHandleNodePosition",
    value: function setHandleNodePosition(position) {
      throw 'Not implemented exception';
    }
  }, {
    key: "getTrackNodeSize",
    value: function getTrackNodeSize() {
      throw 'Not implemented exception';
    }
  }, {
    key: "getHandleNodeSize",
    value: function getHandleNodeSize() {
      throw 'Not implemented exception';
    }
  }, {
    key: "getHandleNodeMargin",
    value: function getHandleNodeMargin() {
      throw 'Not implemented exception';
    }
  }, {
    key: "getNoValueNodeOffset",
    value: function getNoValueNodeOffset() {
      throw 'Not implemented exception';
    }
  }, {
    key: "getTrackNodeOffset",
    value: function getTrackNodeOffset() {
      throw 'Not implemented exception';
    }
  }, {
    key: "getNoValueHandleNodePosition",
    value: function getNoValueHandleNodePosition() {
      throw 'Not implemented exception';
    } // eslint-disable-next-line no-unused-vars

  }, {
    key: "getMouseEventPointerPosition",
    value: function getMouseEventPointerPosition(event) {
      throw 'Not implemented exception';
    } // eslint-disable-next-line no-unused-vars

  }, {
    key: "getTouchEventPointerPosition",
    value: function getTouchEventPointerPosition(event) {
      throw 'Not implemented exception';
    } // eslint-disable-next-line no-unused-vars

  }, {
    key: "getPointerPositionOnTheTrack",
    value: function getPointerPositionOnTheTrack(pointerPosition) {
      throw 'Not implemented exception';
    }
  }, {
    key: "getSliderNode",
    value: function getSliderNode(sliderNodeId) {
      try {
        return document.querySelector("#".concat(sliderNodeId));
      } catch (e) {
        throw "Could not find the sliderNode with id = '".concat(sliderNodeId, "'");
      }
    }
  }, {
    key: "getHandleNode",
    value: function getHandleNode() {
      try {
        return this.sliderNode.querySelector('.cf-slider__handle');
      } catch (e) {
        throw 'Could not find the ".cf-slider__handle"';
      }
    }
  }, {
    key: "getNoValueNode",
    value: function getNoValueNode() {
      try {
        return this.sliderNode.querySelector('.cf-slider__no-value');
      } catch (e) {
        throw 'Could not find the ".cf-slider__no-value"';
      }
    }
  }, {
    key: "getTrackNode",
    value: function getTrackNode() {
      try {
        return this.sliderNode.querySelector('.cf-slider__track-area');
      } catch (e) {
        throw 'Could not find the ".cf-slider__track-area"';
      }
    }
  }, {
    key: "moveHandleNode",
    value: function moveHandleNode(trackValue) {
      this.setHandleNodePosition("".concat(trackValue, "%")); //let index = this.getValueIndexByTrackValue(trackValue);
      //this.setValueIndex(index);
    }
  }, {
    key: "moveHandleNodeByAbsoluteValue",
    value: function moveHandleNodeByAbsoluteValue(absoluteTrackValue) {
      this.setHandleNodePosition("".concat(absoluteTrackValue, "px"));
    }
  }, {
    key: "moveHandleToNoValuePosition",
    value: function moveHandleToNoValuePosition() {
      this.moveHandleNodeByAbsoluteValue(this.getNoValueHandleNodePosition());
    }
  }, {
    key: "moveHandleBack",
    value: function moveHandleBack() {
      if (this.valueIndex > -1) {
        this.setValueIndex(this.valueIndex - 1);
      }
    }
  }, {
    key: "moveHandleForward",
    value: function moveHandleForward() {
      if (this.valueIndex < this.values.length - 1) {
        this.setValueIndex(this.valueIndex + 1);
      }
    }
  }, {
    key: "syncHandlePositionToIndexValue",
    value: function syncHandlePositionToIndexValue() {
      if (this.valueIndex === -1) {
        this.moveHandleToNoValuePosition();
        return;
      }

      var interval = this.trackIntervals[this.valueIndex];
      var trackValue = this.getTrackValueByInterval(interval);
      this.moveHandleNode(trackValue);
    }
  }, {
    key: "updateNoValueCSSAttribute",
    value: function updateNoValueCSSAttribute() {
      this.toggleHandleNodeNoValueCSSModifier(this.valueIndex === -1);
    }
  }, {
    key: "updateAccessibilityState",
    value: function updateAccessibilityState() {
      var textValue = null;

      if (this.textValueHandler !== null) {
        textValue = this.textValueHandler(this.value);
      } else if (this.valueIndex > -1) {
        textValue = this.value;
      }

      this.handleNode.setAttribute('aria-valuetext', textValue);
      this.handleNode.setAttribute('aria-valuenow', this.valueIndex);
    }
  }, {
    key: "toggleHandleNodeNoValueCSSModifier",
    value: function toggleHandleNodeNoValueCSSModifier(add) {
      if (add) {
        this.handleNode.classList.add(this.handleNodeNoValueModifierClass);
        return;
      }

      this.handleNode.classList.remove(this.handleNodeNoValueModifierClass);
    }
  }, {
    key: "handleCommonKeys",
    value: function handleCommonKeys(keyCode) {
      var newIndex = this.valueIndex;

      switch (keyCode) {
        case keyboard_keys.Home:
          newIndex = 0;
          break;

        case keyboard_keys.End:
          newIndex = this.values.length - 1;
          break;

        case keyboard_keys.PageUp:
          if (this.valueIndex === -1) {
            newIndex = 0;
          } else {
            newIndex = this.valueIndex + this.trackPageUpPageDownStep;

            if (newIndex > this.values.length - 1) {
              newIndex = this.values.length - 1;
            }
          }

          break;

        case keyboard_keys.PageDown:
          newIndex = this.valueIndex - this.trackPageUpPageDownStep;

          if (newIndex < 0) {
            newIndex = 0;
          }

          break;
      }

      this.setValueIndex(newIndex);
    } // eslint-disable-next-line no-unused-vars

  }, {
    key: "handleArrowsKeys",
    value: function handleArrowsKeys(keyCode) {
      throw 'Not implemented exception';
    }
  }, {
    key: "onTrackClick",
    value: function onTrackClick(event) {
      var pointerPositionOnTheTrack = this.getPointerPositionOnTheTrack(this.getMouseEventPointerPosition(event));

      if (pointerPositionOnTheTrack < 0) {
        return;
      }

      var trackValue = this.getTrackValue(pointerPositionOnTheTrack);
      var index = this.getValueIndexByTrackValue(trackValue);
      this.setValueIndex(index);
    }
  }, {
    key: "onNoValueNodeClick",
    value: function onNoValueNodeClick(event) {
      event.stopPropagation();
      this.setValueIndex(-1);
    }
  }, {
    key: "onHandleMouseDown",
    value: function onHandleMouseDown(event) {
      event.stopPropagation();
      this.onHandleMoveStart();
    }
  }, {
    key: "onDocumentMouseMove",
    value: function onDocumentMouseMove(event) {
      if (!this.isSliding) {
        return;
      }

      event.preventDefault();
      var pointerPositionOnTheTrack = this.getPointerPositionOnTheTrack(this.getMouseEventPointerPosition(event));
      this.onHandleMove(pointerPositionOnTheTrack);
    }
  }, {
    key: "onDocumentMouseUp",
    value: function onDocumentMouseUp(event) {
      if (!this.isSliding) {
        return;
      }

      event.preventDefault();
      var pointerPositionOnTheTrack = this.getPointerPositionOnTheTrack(this.getMouseEventPointerPosition(event));
      this.onHandleMoveEnd(pointerPositionOnTheTrack);
    }
  }, {
    key: "onHandleTouchStart",
    value: function onHandleTouchStart(event) {
      if (this.isSliding) {
        return true;
      }

      if (event.cancelable) {
        event.stopPropagation();
        event.preventDefault();
      }

      this.onHandleMoveStart();
    }
  }, {
    key: "onDocumentTouchMove",
    value: function onDocumentTouchMove(event) {
      if (!this.isSliding) {
        return;
      }

      var pointerPositionOnTheTrack = this.getPointerPositionOnTheTrack(this.getTouchEventPointerPosition(event));
      this.onHandleMove(pointerPositionOnTheTrack);
    }
  }, {
    key: "onDocumentTouchEnd",
    value: function onDocumentTouchEnd(event) {
      if (!this.isSliding) {
        return;
      }

      event.preventDefault();
      var pointerPositionOnTheTrack = this.getPointerPositionOnTheTrack(this.getTouchEventPointerPosition(event));
      this.onHandleMoveEnd(pointerPositionOnTheTrack);
    }
  }, {
    key: "onHandleMoveStart",
    value: function onHandleMoveStart() {
      this.isSliding = true;
      this.sliderNode.classList.add(this.sliderNodeSlidingModifierClass);
    }
  }, {
    key: "onHandleMove",
    value: function onHandleMove(pointerPositionOnTheTrack) {
      this.toggleHandleNodeNoValueCSSModifier(pointerPositionOnTheTrack < 0);

      if (pointerPositionOnTheTrack < 0) {
        // Out of track
        if (pointerPositionOnTheTrack < this.getNoValueHandleNodePosition()) {
          // beyond no value position
          this.moveHandleToNoValuePosition();
          return;
        }

        this.moveHandleNodeByAbsoluteValue(pointerPositionOnTheTrack);
        return;
      }

      var trackValue = this.getTrackValue(pointerPositionOnTheTrack);
      this.moveHandleNode(trackValue);
    }
  }, {
    key: "onHandleMoveEnd",
    value: function onHandleMoveEnd(pointerPositionOnTheTrack) {
      this.isSliding = false;
      this.sliderNode.classList.remove(this.sliderNodeSlidingModifierClass);
      var newValueIndex = null;

      if (pointerPositionOnTheTrack < -(this.getHandleNodeSize() / 2)) {
        newValueIndex = -1;
      } else {
        var trackValue = this.getTrackValue(pointerPositionOnTheTrack);
        newValueIndex = this.getValueIndexByTrackValue(trackValue);
      }

      if (newValueIndex === this.valueIndex) {
        this.syncHandlePositionToIndexValue();
        this.updateNoValueCSSAttribute();
      } else {
        this.setValueIndex(newValueIndex);
      }
    }
  }, {
    key: "onHandleKeyPress",
    value: function onHandleKeyPress(event) {
      var allowedKeys = [keyboard_keys.ArrowUp, keyboard_keys.ArrowLeft, keyboard_keys.ArrowRight, keyboard_keys.ArrowDown, keyboard_keys.PageUp, keyboard_keys.PageDown, keyboard_keys.Home, keyboard_keys.End];

      if (allowedKeys.includes(event.keyCode) === false) {
        return;
      }

      event.preventDefault();
      this.handleCommonKeys(event.keyCode);
      this.handleArrowsKeys(event.keyCode);
    }
  }]);

  return SliderBase;
}();


;// CONCATENATED MODULE: ./lib/slider/vertical-btt-slider.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function vertical_btt_slider_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function vertical_btt_slider_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function vertical_btt_slider_createClass(Constructor, protoProps, staticProps) { if (protoProps) vertical_btt_slider_defineProperties(Constructor.prototype, protoProps); if (staticProps) vertical_btt_slider_defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var VerticalBttSlider = /*#__PURE__*/function (_SliderBase) {
  _inherits(VerticalBttSlider, _SliderBase);

  var _super = _createSuper(VerticalBttSlider);

  function VerticalBttSlider() {
    vertical_btt_slider_classCallCheck(this, VerticalBttSlider);

    return _super.apply(this, arguments);
  }

  vertical_btt_slider_createClass(VerticalBttSlider, [{
    key: "setHandleNodePosition",
    value: function setHandleNodePosition(position) {
      this.handleNode.style.bottom = position;
    }
  }, {
    key: "getTrackNodeSize",
    value: function getTrackNodeSize() {
      return this.trackNode.offsetHeight;
    }
  }, {
    key: "getHandleNodeSize",
    value: function getHandleNodeSize() {
      return this.handleNode.offsetHeight;
    }
  }, {
    key: "getHandleNodeMargin",
    value: function getHandleNodeMargin() {
      return Utils.outerHeight(this.handleNode) - this.handleNode.offsetHeight;
    }
  }, {
    key: "getNoValueNodeOffset",
    value: function getNoValueNodeOffset() {
      return Utils.getElementOffset(this.noValueNode).top;
    }
  }, {
    key: "getTrackNodeOffset",
    value: function getTrackNodeOffset() {
      return Utils.getElementOffset(this.trackNode).top;
    }
  }, {
    key: "getNoValueHandleNodePosition",
    value: function getNoValueHandleNodePosition() {
      return this.getTrackNodeSize() + this.getTrackNodeOffset() + this.getHandleNodeMargin() - this.getNoValueNodeOffset();
    }
  }, {
    key: "getMouseEventPointerPosition",
    value: function getMouseEventPointerPosition(event) {
      return event.pageY;
    }
  }, {
    key: "getTouchEventPointerPosition",
    value: function getTouchEventPointerPosition(event) {
      return event.changedTouches[0].pageY;
    }
  }, {
    key: "getPointerPositionOnTheTrack",
    value: function getPointerPositionOnTheTrack(pointerPosition) {
      return (pointerPosition - this.getTrackNodeSize() - this.getTrackNodeOffset()) * -1;
    }
  }, {
    key: "handleArrowsKeys",
    value: function handleArrowsKeys(keyCode) {
      switch (keyCode) {
        case keyboard_keys.ArrowUp:
        case keyboard_keys.ArrowLeft:
          this.moveHandleBack();
          break;

        case keyboard_keys.ArrowDown:
        case keyboard_keys.ArrowRight:
          this.moveHandleForward();
          break;
      }
    }
  }]);

  return VerticalBttSlider;
}(SliderBase);


;// CONCATENATED MODULE: ./lib/slider/vertical-slider.js
function vertical_slider_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { vertical_slider_typeof = function _typeof(obj) { return typeof obj; }; } else { vertical_slider_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return vertical_slider_typeof(obj); }

function vertical_slider_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function vertical_slider_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function vertical_slider_createClass(Constructor, protoProps, staticProps) { if (protoProps) vertical_slider_defineProperties(Constructor.prototype, protoProps); if (staticProps) vertical_slider_defineProperties(Constructor, staticProps); return Constructor; }

function vertical_slider_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) vertical_slider_setPrototypeOf(subClass, superClass); }

function vertical_slider_setPrototypeOf(o, p) { vertical_slider_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return vertical_slider_setPrototypeOf(o, p); }

function vertical_slider_createSuper(Derived) { var hasNativeReflectConstruct = vertical_slider_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = vertical_slider_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = vertical_slider_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return vertical_slider_possibleConstructorReturn(this, result); }; }

function vertical_slider_possibleConstructorReturn(self, call) { if (call && (vertical_slider_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return vertical_slider_assertThisInitialized(self); }

function vertical_slider_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function vertical_slider_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function vertical_slider_getPrototypeOf(o) { vertical_slider_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return vertical_slider_getPrototypeOf(o); }





var VerticalSlider = /*#__PURE__*/function (_SliderBase) {
  vertical_slider_inherits(VerticalSlider, _SliderBase);

  var _super = vertical_slider_createSuper(VerticalSlider);

  function VerticalSlider() {
    vertical_slider_classCallCheck(this, VerticalSlider);

    return _super.apply(this, arguments);
  }

  vertical_slider_createClass(VerticalSlider, [{
    key: "setHandleNodePosition",
    value: function setHandleNodePosition(position) {
      this.handleNode.style.top = position;
    }
  }, {
    key: "getTrackNodeSize",
    value: function getTrackNodeSize() {
      return this.trackNode.offsetHeight;
    }
  }, {
    key: "getHandleNodeSize",
    value: function getHandleNodeSize() {
      return this.handleNode.offsetHeight;
    }
  }, {
    key: "getHandleNodeMargin",
    value: function getHandleNodeMargin() {
      return Utils.outerHeight(this.handleNode) - this.handleNode.offsetHeight;
    }
  }, {
    key: "getNoValueNodeOffset",
    value: function getNoValueNodeOffset() {
      return Utils.getElementOffset(this.noValueNode).top;
    }
  }, {
    key: "getTrackNodeOffset",
    value: function getTrackNodeOffset() {
      return Utils.getElementOffset(this.trackNode).top;
    }
  }, {
    key: "getNoValueHandleNodePosition",
    value: function getNoValueHandleNodePosition() {
      return this.getNoValueNodeOffset() - this.getHandleNodeMargin() - this.getTrackNodeOffset();
    }
  }, {
    key: "getMouseEventPointerPosition",
    value: function getMouseEventPointerPosition(event) {
      return event.pageY;
    }
  }, {
    key: "getTouchEventPointerPosition",
    value: function getTouchEventPointerPosition(event) {
      return event.changedTouches[0].pageY;
    }
  }, {
    key: "getPointerPositionOnTheTrack",
    value: function getPointerPositionOnTheTrack(pointerPosition) {
      return pointerPosition - this.getTrackNodeOffset();
    }
  }, {
    key: "handleArrowsKeys",
    value: function handleArrowsKeys(keyCode) {
      switch (keyCode) {
        case keyboard_keys.ArrowUp:
        case keyboard_keys.ArrowLeft:
          this.moveHandleBack();
          break;

        case keyboard_keys.ArrowDown:
        case keyboard_keys.ArrowRight:
          this.moveHandleForward();
          break;
      }
    }
  }]);

  return VerticalSlider;
}(SliderBase);


;// CONCATENATED MODULE: ./lib/slider/horizontal-rtl-slider.js
function horizontal_rtl_slider_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { horizontal_rtl_slider_typeof = function _typeof(obj) { return typeof obj; }; } else { horizontal_rtl_slider_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return horizontal_rtl_slider_typeof(obj); }

function horizontal_rtl_slider_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function horizontal_rtl_slider_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function horizontal_rtl_slider_createClass(Constructor, protoProps, staticProps) { if (protoProps) horizontal_rtl_slider_defineProperties(Constructor.prototype, protoProps); if (staticProps) horizontal_rtl_slider_defineProperties(Constructor, staticProps); return Constructor; }

function horizontal_rtl_slider_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) horizontal_rtl_slider_setPrototypeOf(subClass, superClass); }

function horizontal_rtl_slider_setPrototypeOf(o, p) { horizontal_rtl_slider_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return horizontal_rtl_slider_setPrototypeOf(o, p); }

function horizontal_rtl_slider_createSuper(Derived) { var hasNativeReflectConstruct = horizontal_rtl_slider_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = horizontal_rtl_slider_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = horizontal_rtl_slider_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return horizontal_rtl_slider_possibleConstructorReturn(this, result); }; }

function horizontal_rtl_slider_possibleConstructorReturn(self, call) { if (call && (horizontal_rtl_slider_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return horizontal_rtl_slider_assertThisInitialized(self); }

function horizontal_rtl_slider_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function horizontal_rtl_slider_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function horizontal_rtl_slider_getPrototypeOf(o) { horizontal_rtl_slider_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return horizontal_rtl_slider_getPrototypeOf(o); }





var HorizontalRtlSlider = /*#__PURE__*/function (_SliderBase) {
  horizontal_rtl_slider_inherits(HorizontalRtlSlider, _SliderBase);

  var _super = horizontal_rtl_slider_createSuper(HorizontalRtlSlider);

  function HorizontalRtlSlider() {
    horizontal_rtl_slider_classCallCheck(this, HorizontalRtlSlider);

    return _super.apply(this, arguments);
  }

  horizontal_rtl_slider_createClass(HorizontalRtlSlider, [{
    key: "setHandleNodePosition",
    value: function setHandleNodePosition(position) {
      this.handleNode.style.right = position;
    }
  }, {
    key: "getTrackNodeSize",
    value: function getTrackNodeSize() {
      return this.trackNode.offsetWidth;
    }
  }, {
    key: "getHandleNodeSize",
    value: function getHandleNodeSize() {
      return this.handleNode.offsetWidth;
    }
  }, {
    key: "getHandleNodeMargin",
    value: function getHandleNodeMargin() {
      return Utils.outerWidth(this.handleNode) - this.handleNode.offsetWidth;
    }
  }, {
    key: "getNoValueNodeOffset",
    value: function getNoValueNodeOffset() {
      return Utils.getElementOffset(this.noValueNode).left + this.noValueNode.offsetWidth;
    }
  }, {
    key: "getTrackNodeOffset",
    value: function getTrackNodeOffset() {
      return Utils.getElementOffset(this.trackNode).left + this.trackNode.offsetWidth;
    }
  }, {
    key: "getNoValueHandleNodePosition",
    value: function getNoValueHandleNodePosition() {
      return this.getTrackNodeOffset() - (this.getNoValueNodeOffset() + this.getHandleNodeMargin());
    }
  }, {
    key: "getMouseEventPointerPosition",
    value: function getMouseEventPointerPosition(event) {
      return event.pageX;
    }
  }, {
    key: "getTouchEventPointerPosition",
    value: function getTouchEventPointerPosition(event) {
      return event.changedTouches[0].pageX;
    }
  }, {
    key: "getPointerPositionOnTheTrack",
    value: function getPointerPositionOnTheTrack(pointerPosition) {
      return this.getTrackNodeOffset() - pointerPosition;
    }
  }, {
    key: "handleArrowsKeys",
    value: function handleArrowsKeys(keyCode) {
      switch (keyCode) {
        case keyboard_keys.ArrowDown:
        case keyboard_keys.ArrowRight:
          this.moveHandleBack();
          break;

        case keyboard_keys.ArrowUp:
        case keyboard_keys.ArrowLeft:
          this.moveHandleForward();
          break;
      }
    }
  }]);

  return HorizontalRtlSlider;
}(SliderBase);


;// CONCATENATED MODULE: ./lib/slider/horizontal-slider.js
function horizontal_slider_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { horizontal_slider_typeof = function _typeof(obj) { return typeof obj; }; } else { horizontal_slider_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return horizontal_slider_typeof(obj); }

function horizontal_slider_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function horizontal_slider_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function horizontal_slider_createClass(Constructor, protoProps, staticProps) { if (protoProps) horizontal_slider_defineProperties(Constructor.prototype, protoProps); if (staticProps) horizontal_slider_defineProperties(Constructor, staticProps); return Constructor; }

function horizontal_slider_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) horizontal_slider_setPrototypeOf(subClass, superClass); }

function horizontal_slider_setPrototypeOf(o, p) { horizontal_slider_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return horizontal_slider_setPrototypeOf(o, p); }

function horizontal_slider_createSuper(Derived) { var hasNativeReflectConstruct = horizontal_slider_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = horizontal_slider_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = horizontal_slider_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return horizontal_slider_possibleConstructorReturn(this, result); }; }

function horizontal_slider_possibleConstructorReturn(self, call) { if (call && (horizontal_slider_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return horizontal_slider_assertThisInitialized(self); }

function horizontal_slider_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function horizontal_slider_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function horizontal_slider_getPrototypeOf(o) { horizontal_slider_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return horizontal_slider_getPrototypeOf(o); }





var HorizontalSlider = /*#__PURE__*/function (_SliderBase) {
  horizontal_slider_inherits(HorizontalSlider, _SliderBase);

  var _super = horizontal_slider_createSuper(HorizontalSlider);

  function HorizontalSlider() {
    horizontal_slider_classCallCheck(this, HorizontalSlider);

    return _super.apply(this, arguments);
  }

  horizontal_slider_createClass(HorizontalSlider, [{
    key: "setHandleNodePosition",
    value: function setHandleNodePosition(position) {
      this.handleNode.style.left = position;
    }
  }, {
    key: "getTrackNodeSize",
    value: function getTrackNodeSize() {
      return this.trackNode.offsetWidth;
    }
  }, {
    key: "getHandleNodeSize",
    value: function getHandleNodeSize() {
      return this.handleNode.offsetWidth;
    }
  }, {
    key: "getHandleNodeMargin",
    value: function getHandleNodeMargin() {
      return Utils.outerWidth(this.handleNode) - this.handleNode.offsetWidth;
    }
  }, {
    key: "getNoValueNodeOffset",
    value: function getNoValueNodeOffset() {
      return Utils.getElementOffset(this.noValueNode).left;
    }
  }, {
    key: "getTrackNodeOffset",
    value: function getTrackNodeOffset() {
      return Utils.getElementOffset(this.trackNode).left;
    }
  }, {
    key: "getNoValueHandleNodePosition",
    value: function getNoValueHandleNodePosition() {
      return this.getNoValueNodeOffset() - this.getHandleNodeMargin() - this.getTrackNodeOffset();
    }
  }, {
    key: "getMouseEventPointerPosition",
    value: function getMouseEventPointerPosition(event) {
      return event.pageX;
    }
  }, {
    key: "getTouchEventPointerPosition",
    value: function getTouchEventPointerPosition(event) {
      return event.changedTouches[0].pageX;
    }
  }, {
    key: "getPointerPositionOnTheTrack",
    value: function getPointerPositionOnTheTrack(pointerPosition) {
      return pointerPosition - this.getTrackNodeOffset();
    }
  }, {
    key: "handleArrowsKeys",
    value: function handleArrowsKeys(keyCode) {
      switch (keyCode) {
        case keyboard_keys.ArrowDown:
        case keyboard_keys.ArrowLeft:
          this.moveHandleBack();
          break;

        case keyboard_keys.ArrowUp:
        case keyboard_keys.ArrowRight:
          this.moveHandleForward();
          break;
      }
    }
  }]);

  return HorizontalSlider;
}(SliderBase);


;// CONCATENATED MODULE: ./lib/slider/slider-open-component.js
function slider_open_component_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { slider_open_component_typeof = function _typeof(obj) { return typeof obj; }; } else { slider_open_component_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return slider_open_component_typeof(obj); }

function slider_open_component_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function slider_open_component_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function slider_open_component_createClass(Constructor, protoProps, staticProps) { if (protoProps) slider_open_component_defineProperties(Constructor.prototype, protoProps); if (staticProps) slider_open_component_defineProperties(Constructor, staticProps); return Constructor; }










var SliderOpenComponent = /*#__PURE__*/function () {
  /**
   * @param {Question} question - base question to which the slider will be attached
   * @param {QuestionViewSettings} settings - base question settings
   * @param {Object} sliderSettings - slider settings object
   * @param {HTMLDivElement} [sliderContainer] - the slider will be appended to this container
   * @param {string} [sliderId] - id for this slider
   */
  function SliderOpenComponent(question, settings, sliderSettings, sliderContainer, sliderId) {
    slider_open_component_classCallCheck(this, SliderOpenComponent);

    this.question = question;
    this.settings = settings;
    this.sliderSettings = this.getValidSliderSettings(sliderSettings);
    this.addQuestionSettingsToSliderSettings();
    this.container = sliderContainer !== null && sliderContainer !== void 0 ? sliderContainer : this.getDefaultContainer();
    this.sliderId = sliderId ? sliderId : this.getDefaultSliderId();
    this._changeEvent = new Event('slider:change');
    this.init();
  }

  slider_open_component_createClass(SliderOpenComponent, [{
    key: "changeEvent",
    get: function get() {
      return this._changeEvent;
    }
    /**
     * @param sliderSettings
     * @returns {object} - slider settings object with every needed property set.
     */

  }, {
    key: "getValidSliderSettings",
    value: function getValidSliderSettings(sliderSettings) {
      if (sliderSettings === null) {
        return DEFAULT_SLIDER_SETTINGS;
      }

      this.setDefaultSettingsIfNeeded(sliderSettings, DEFAULT_SLIDER_SETTINGS);
      return sliderSettings;
    }
    /**
     * Recursively checks every property of settings object and replaces its value with the default one if needed.
     * @param settings - slider settings
     * @param defaultSettings - default settings
     */

  }, {
    key: "setDefaultSettingsIfNeeded",
    value: function setDefaultSettingsIfNeeded(settings, defaultSettings) {
      for (var property in defaultSettings) {
        if (slider_open_component_typeof(defaultSettings[property]) === 'object') {
          this.setDefaultSettingsIfNeeded(settings[property], defaultSettings[property]);
        } else if (!settings.hasOwnProperty(property) || settings[property] === null || settings[property] === undefined || Number.isNaN(settings[property])) {
          settings[property] = defaultSettings[property];
        }
      }
    }
    /**
     * Extends sliderSettings object with some settings like 'isRtl' from base question.
     */

  }, {
    key: "addQuestionSettingsToSliderSettings",
    value: function addQuestionSettingsToSliderSettings() {
      this.sliderSettings['isRtl'] = this.question.isRtl;
      this.sliderSettings['readOnly'] = this.question.readOnly;
    }
  }, {
    key: "getDefaultContainer",
    value: function getDefaultContainer() {
      try {
        return document.querySelector("#".concat(this.question.id));
      } catch (e) {
        throw 'Could not find the slider default container';
      }
    }
    /**
     * @returns {string} - id of this slider node.
     */

  }, {
    key: "getSliderId",
    value: function getSliderId() {
      return this.sliderId;
    }
    /**
     * Creates default slider node id in form <question.id>_slider_<slider number>. Slider number reflects the order this slider is added to the page.
     * @returns {string} - default slider id.
     */

  }, {
    key: "getDefaultSliderId",
    value: function getDefaultSliderId() {
      var slidersInThisQuestion = document.querySelectorAll("#".concat(this.question.id, " .cf-single-slider-question--custom"));
      var slidersCount = slidersInThisQuestion.length;
      return "".concat(this.question.id, "_slider_").concat(slidersCount + 1);
    }
  }, {
    key: "init",
    value: function init() {
      var _this = this;

      var areCodesReversed = this.sliderSettings.direction === SLIDER_DIRECTION.verticalBtt;
      this.sliderValues = this.getValues(this.sliderSettings.customScale.min, this.sliderSettings.customScale.max, areCodesReversed);
      var sliderRenderer = new SliderOpenRenderer(this.sliderId, this.container, this.sliderValues, this.sliderSettings);
      sliderRenderer.render();
      this.slider = this.createSlider();
      this._changeEvent = this.slider.changeEvent;
      this.slider.changeEvent.on(this.onSliderChange.bind(this));
      this.sliderValues.forEach(function (answer) {
        _this.getAnswerTextNode(answer.code).addEventListener('click', function () {
          _this.setSliderValue(answer.text);
        });
      });
      this.onSliderChange();
    }
    /**
     * @param {number} start
     * @param {number} end
     * @return {Array} returns an array of objects
     */

  }, {
    key: "getValues",
    value: function getValues(start, end) {
      var areCodesReversed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var values = Array(end - start + 1).fill().map(function (_, idx) {
        return start + idx;
      });
      values = areCodesReversed ? values.reverse() : values;
      return values.map(function (value, index) {
        return {
          code: index.toString(),
          text: value.toString()
        };
      });
    }
  }, {
    key: "createSlider",
    value: function createSlider() {
      var _this2 = this;

      var sliderNodeId = this.getSliderId();
      var sliderValues = this.sliderValues.map(function (answer) {
        return answer.text;
      });
      var sliderValue = this.sliderSettings.customScale.start.toString();

      if (this.sliderSettings.isQuestionValue && this.question.value) {
        sliderValue = this.question.value;
      }

      var readOnly = this.sliderSettings.readOnly;

      var sliderTextValueHandler = function sliderTextValueHandler(sliderValue) {
        return sliderValue === null ? _this2.settings.messages.noResponse : sliderValue;
      };

      switch (this.sliderSettings.direction) {
        case SLIDER_DIRECTION.horizontal:
          if (this.sliderSettings.isRtl) {
            return new HorizontalRtlSlider(sliderNodeId, sliderValues, sliderValue, sliderTextValueHandler, readOnly);
          }

          return new HorizontalSlider(sliderNodeId, sliderValues, sliderValue, sliderTextValueHandler, readOnly);

        case SLIDER_DIRECTION.vertical:
          return new VerticalSlider(sliderNodeId, sliderValues, sliderValue, sliderTextValueHandler, readOnly);

        case SLIDER_DIRECTION.verticalBtt:
          return new VerticalBttSlider(sliderNodeId, sliderValues.reverse(), sliderValue, sliderTextValueHandler, readOnly);

        default:
          return new HorizontalSlider(sliderNodeId, sliderValues, sliderValue, sliderTextValueHandler, readOnly);
      }
    }
  }, {
    key: "setSliderValue",
    value: function setSliderValue(value) {
      value = value == null ? null : value.toString();

      if (this.sliderSettings.isQuestionValue) {
        this.question.setValue(value);
        this.slider.value = this.question.value;
        return;
      }

      this.slider.value = value;
    }
  }, {
    key: "getSliderValue",
    value: function getSliderValue() {
      return this.slider.value;
    }
  }, {
    key: "onSliderChange",
    value: function onSliderChange() {
      var _this3 = this;

      if (this.sliderSettings.isQuestionValue) {
        this.question.setValue(this.slider.value);
      }

      var questionAnswerTextNodes = this.container.querySelectorAll('#' + this.sliderId + ' .cf-single-slider-question__answer-text');

      if (questionAnswerTextNodes != null && questionAnswerTextNodes.length !== 0) {
        Array.prototype.forEach.call(questionAnswerTextNodes, function (answerTextNode) {
          answerTextNode.classList.remove('cf-single-slider-question__answer-text--selected');
        });
      }

      var selectedAnswer = this.sliderValues.find(function (x) {
        return x.text === _this3.slider.value;
      });
      var answerTextNode = null;

      if (selectedAnswer) {
        answerTextNode = this.getAnswerTextNode(selectedAnswer.code);
      }

      if (answerTextNode != null) {
        answerTextNode.classList.add('cf-single-slider-question__answer-text--selected');
      }
    }
  }, {
    key: "getAnswerTextNode",
    value: function getAnswerTextNode(answerCode) {
      return document.querySelector('#' + this.getAnswerTextNodeId(answerCode));
    }
  }, {
    key: "getAnswerTextNodeId",
    value: function getAnswerTextNodeId(answerCode) {
      return "".concat(this.getSliderId(), "_").concat(answerCode, "_text");
    }
  }]);

  return SliderOpenComponent;
}();



if (window && !window.customQuestionsLibrary) {
  window.customQuestionsLibrary = {};
}

window.customQuestionsLibrary.SliderOpenComponent = SliderOpenComponent;
/******/ })()
;