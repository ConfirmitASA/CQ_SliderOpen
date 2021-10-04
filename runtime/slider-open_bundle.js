/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./lib/slider/constants.js
const SLIDER_DIRECTION = {
  horizontal: 'horizontal',
  vertical: 'vertical',
  verticalBtt: 'verticalBtt'
};

;// CONCATENATED MODULE: ./lib/slider/slider-default-settings.js

const DEFAULT_SLIDER_SETTINGS = {
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
class Utils {
  static floor(value, precision) {
    const multiplier = Math.pow(10, precision);
    return Math.floor(value * multiplier) / multiplier;
  }

  static round(value, precision) {
    const multiplier = Math.pow(10, precision);
    return Math.round(value * multiplier) / multiplier;
  }

  static getElementOffset(element) {
    if (!element) {
      return;
    }

    let rect = element.getBoundingClientRect();
    let offset = {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX
    };
    return offset;
  }

  static outerWidth(element) {
    if (!element) {
      return;
    }

    let width = element.offsetWidth;
    let style = window.getComputedStyle(element);
    width += parseInt(style.marginLeft) + parseInt(style.marginRight);
    return width;
  }

  static outerHeight(element) {
    if (!element) {
      return;
    }

    let height = element.offsetHeight;
    let style = window.getComputedStyle(element);
    height += parseInt(style.marginTop) + parseInt(style.marginBottom);
    return height;
  }
  /**
   * @param {DOM} element
   * @return {object} get computed style for an element, excluding any default styles 
   */


  static getStylesWithoutDefaults(element) {
    if (!element) {
      return;
    } // creating an empty dummy object to compare with


    let dummy = document.createElement('div');
    element.parentNode.appendChild(dummy); // getting computed styles for both elements

    let defaultStyles = getComputedStyle(dummy);
    let elementStyles = getComputedStyle(element); // calculating the difference

    let diff = {};

    for (let key in elementStyles) {
      if (elementStyles.hasOwnProperty(key) && defaultStyles[key] !== elementStyles[key] && elementStyles[key].indexOf('px') === -1) {
        diff[key] = elementStyles[key];
      }
    } // clear dom


    dummy.remove();
    return diff;
  }

}
;// CONCATENATED MODULE: ./lib/slider/slider-open-renderer.js


class SliderOpenRenderer {
  constructor(sliderId, sliderContainer, sliderValues, sliderSettings) {
    this.id = sliderId;
    this.container = sliderContainer;
    this.values = sliderSettings.isRtl && sliderSettings.direction === SLIDER_DIRECTION.horizontal ? sliderValues.slice().reverse() : sliderValues;
    this.valuesWithStep = this.getValuesWithStep(sliderSettings.customScale.min, sliderSettings.customScale.max, sliderSettings.customScale.step);
    this.settings = sliderSettings;
  }

  render() {
    let sliderContainer = document.createElement('div');
    let directionModifiers = this.getDirectionModifiers();
    sliderContainer.setAttribute('class', 'cf-single-slider-question cf-single-slider-question--custom ' + directionModifiers.question);
    this.setContainerSize(sliderContainer, this.settings.containerSize);
    let slider = document.createElement('div');
    slider.setAttribute('class', 'cf-single-slider-question__slider cf-slider ' + directionModifiers.slider);
    slider.setAttribute('id', this.id);
    let labels = this.createLabels();
    slider.append(labels);
    let trackArea = this.createTrackArea();
    slider.append(trackArea);
    sliderContainer.append(slider);
    this.container.append(sliderContainer);
    this.setDefaultStylesIfNeeded(this.container);
  }

  getDirectionModifiers() {
    let directionModifiers = {};

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

  createTrackArea() {
    let trackArea = document.createElement('div');
    trackArea.setAttribute('class', 'cf-slider__track-area');
    let track = document.createElement('div');
    track.setAttribute('class', 'cf-slider__track');
    let noValue = document.createElement('div');
    noValue.setAttribute('class', 'cf-slider__no-value');
    let handle = this.createHandle();
    track.append(noValue);
    track.append(handle);
    trackArea.append(track);
    return trackArea;
  }

  createHandle() {
    let handle = document.createElement('div');
    handle.setAttribute('class', 'cf-slider__handle cf-slider__handle--no-value');
    handle.setAttribute('role', 'slider');
    handle.setAttribute('aria-readonly', 'false');
    handle.setAttribute('tabindex', '0');
    handle.setAttribute('aria-valuenow', '-1');
    handle.setAttribute('aria-valuetext', 'NO RESPONSE');
    return handle;
  }

  createLabels() {
    let labelsContainer = document.createElement('ol');
    labelsContainer.className = 'cf-single-slider-question__labels';
    let intervalStep = 100 / this.values.length;
    let labelOffset = Utils.round(intervalStep / 2, 2);
    this.values.forEach(value => {
      let label = this.createLabel(value.code, value.text);
      this.setLabelOffset(label, value.text, labelOffset);
      this.setLabelVisibility(label, value.text);
      labelOffset += intervalStep;
      labelOffset = Utils.round(labelOffset, 2);
      labelsContainer.insertAdjacentElement('beforeend', label);
    });
    return labelsContainer;
  }

  createLabel(valueCode, valueText) {
    let label = document.createElement('li');
    label.setAttribute('class', 'cf-single-slider-question__label');
    label.setAttribute('id', this.id + '_' + valueCode + '_label');
    let answerText = document.createElement('div');
    answerText.setAttribute('class', 'cf-single-slider-question__answer-text');
    answerText.setAttribute('id', this.id + '_' + valueCode + '_text');
    answerText.innerHTML = valueText;
    label.insertAdjacentElement('beforeend', answerText);
    return label;
  }

  setContainerSize(containerElement, size) {
    if (this.settings.direction === SLIDER_DIRECTION.vertical || this.settings.direction === SLIDER_DIRECTION.verticalBtt) {
      if (!size) {
        size = this.valuesWithStep.length * 3 * 16; //1em = 16px, 3 - magic number
      }

      containerElement.style.height = size + 'px';
    } else {
      containerElement.style.width = size + 'px';
    }
  }

  setLabelOffset(label, labelText, labelOffset) {
    if (this.settings.direction === SLIDER_DIRECTION.vertical || this.settings.direction === SLIDER_DIRECTION.verticalBtt) {
      label.style.top = labelOffset.toString() + '%';
    } else {
      label.style.left = labelOffset.toString() + '%';
      label.style.marginLeft = (-0.25 + labelText.length * -0.25).toString() + 'em';
    }
  }

  setLabelVisibility(label, labelText) {
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


  getValuesWithStep(start, end, step) {
    let values = [];
    let currentValue = start;

    while (currentValue <= end) {
      values.push(currentValue.toString());
      currentValue += step;
    }

    return values;
  }

  setDefaultStylesIfNeeded(sliderContainer) {
    if (!sliderContainer) {
      return;
    }

    let pageMainDiv = document.querySelector('.cf-page__main');
    let styles = Utils.getStylesWithoutDefaults(pageMainDiv);

    if (!(pageMainDiv && Object.keys(styles).length > 0)) {
      sliderContainer.className.add('default-styles_active');
    }
  }

}
;// CONCATENATED MODULE: ./lib/slider/event.js
class Event {
  /**
   * Create instance.
   * @param {string} name - Event name.
   */
  constructor(name) {
    this._name = name;
    this.subscribers = [];
  }
  /**
   * Event name.
   * @type {string}
   * @readonly
   */


  get name() {
    return this._name;
  }
  /**
   * Subscribe to event.
   * @param {function} subscriber - Event handler function.
   */


  on(subscriber) {
    if (this.subscribers.find(item => item === subscriber) !== undefined) {
      return;
    }

    this.subscribers.push(subscriber);
  }
  /**
   * Unsubscribe from event.
   * @param {function} subscriber - Event handler function.
   */


  off(subscriber) {
    this.subscribers = this.subscribers.filter(item => item !== subscriber);
  }
  /**
   * Trigger the event.
   * @param {object} data
   */


  trigger(data = null) {
    this.subscribers.forEach(item => item(data));
  }

}
;// CONCATENATED MODULE: ./lib/slider/keyboard-keys.js
/**
 * @module keybord-keys
 */
/* harmony default export */ const keyboard_keys = ({
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



class SliderBase {
  /**
   * @param sliderNodeId {string} - slider node id
   * @param values {Object[]} - array of values
   * @param value {Object} - current slider value
   * @param textValueHandler {function} - (sliderValue) => { return 'text representation of slider value' }
   * @param readOnly {boolean} is slider has to be in read only mode
   */
  constructor(sliderNodeId, values = [], value = null, textValueHandler = null, readOnly = false) {
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


  get value() {
    return this.values[this.valueIndex] || null;
  }
  /**
   * Set slider value
   * @param newValue
   */


  set value(newValue) {
    this.setValueIndex(this.values.findIndex(value => value === newValue));
  }
  /**
   * Fires after slider values is changed
   * @return {Event}
   */


  get changeEvent() {
    return this._changeEvent;
  }
  /**
   * Set slider value silently without triggering change event
   * @param newValue
   */


  setValueSilently(newValue) {
    this.setValueIndex(this.values.findIndex(value => value === newValue), true);
  }
  /**
   * Detach slider control from DOM
   */


  detachFromDOM() {
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

  init(value) {
    this.calculateTrackIntervals();
    this.calculateTrackPageUpPageDownStep();
    this.attachToDOM();
    this.value = value;

    if (this.valueIndex === -1) {
      this.syncHandlePositionToIndexValue();
      this.updateNoValueCSSAttribute();
    }
  } // TODO: make an optimization for a large number of values, when interval less than one pixel.


  calculateTrackIntervals() {
    let intervalSize = 100 / this.values.length;

    for (let i = 0; i < this.values.length; i++) {
      let startInterval = Utils.round(i * intervalSize, 2);
      let endInterval = Utils.round((i + 1) * intervalSize, 2);
      this.trackIntervals.push([startInterval, endInterval]);
    }
  }

  calculateTrackPageUpPageDownStep() {
    if (this.values.length < 10) {
      this.trackPageUpPageDownStep = 1;
    }

    this.trackPageUpPageDownStep = Math.round(this.values.length / 5);
  }

  attachToDOM() {
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

  getValueIndexByTrackValue(trackValue) {
    let search = (minIndex, maxIndex) => {
      if (minIndex > maxIndex) {
        return -1;
      }

      let midIndex = Math.floor((minIndex + maxIndex) / 2);
      let interval = this.trackIntervals[midIndex];

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

  setValueIndex(value, isSilent = false) {
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


  getTrackValue(absoluteValue) {
    if (absoluteValue < 0) {
      absoluteValue = 0;
    }

    if (absoluteValue > this.getTrackNodeSize()) {
      absoluteValue = this.getTrackNodeSize();
    }

    return Math.round(absoluteValue / this.getTrackNodeSize() * 100);
  }

  getTrackValueByInterval(interval) {
    return Utils.floor((interval[0] + interval[1]) / 2, 2);
  } // eslint-disable-next-line no-unused-vars


  setHandleNodePosition(position) {
    throw 'Not implemented exception';
  }

  getTrackNodeSize() {
    throw 'Not implemented exception';
  }

  getHandleNodeSize() {
    throw 'Not implemented exception';
  }

  getHandleNodeMargin() {
    throw 'Not implemented exception';
  }

  getNoValueNodeOffset() {
    throw 'Not implemented exception';
  }

  getTrackNodeOffset() {
    throw 'Not implemented exception';
  }

  getNoValueHandleNodePosition() {
    throw 'Not implemented exception';
  } // eslint-disable-next-line no-unused-vars


  getMouseEventPointerPosition(event) {
    throw 'Not implemented exception';
  } // eslint-disable-next-line no-unused-vars


  getTouchEventPointerPosition(event) {
    throw 'Not implemented exception';
  } // eslint-disable-next-line no-unused-vars


  getPointerPositionOnTheTrack(pointerPosition) {
    throw 'Not implemented exception';
  }

  getSliderNode(sliderNodeId) {
    try {
      return document.querySelector(`#${sliderNodeId}`);
    } catch (e) {
      throw `Could not find the sliderNode with id = '${sliderNodeId}'`;
    }
  }

  getHandleNode() {
    try {
      return this.sliderNode.querySelector('.cf-slider__handle');
    } catch (e) {
      throw 'Could not find the ".cf-slider__handle"';
    }
  }

  getNoValueNode() {
    try {
      return this.sliderNode.querySelector('.cf-slider__no-value');
    } catch (e) {
      throw 'Could not find the ".cf-slider__no-value"';
    }
  }

  getTrackNode() {
    try {
      return this.sliderNode.querySelector('.cf-slider__track-area');
    } catch (e) {
      throw 'Could not find the ".cf-slider__track-area"';
    }
  }

  moveHandleNode(trackValue) {
    this.setHandleNodePosition(`${trackValue}%`); //let index = this.getValueIndexByTrackValue(trackValue);
    //this.setValueIndex(index);
  }

  moveHandleNodeByAbsoluteValue(absoluteTrackValue) {
    this.setHandleNodePosition(`${absoluteTrackValue}px`);
  }

  moveHandleToNoValuePosition() {
    this.moveHandleNodeByAbsoluteValue(this.getNoValueHandleNodePosition());
  }

  moveHandleBack() {
    if (this.valueIndex > -1) {
      this.setValueIndex(this.valueIndex - 1);
    }
  }

  moveHandleForward() {
    if (this.valueIndex < this.values.length - 1) {
      this.setValueIndex(this.valueIndex + 1);
    }
  }

  syncHandlePositionToIndexValue() {
    if (this.valueIndex === -1) {
      this.moveHandleToNoValuePosition();
      return;
    }

    let interval = this.trackIntervals[this.valueIndex];
    let trackValue = this.getTrackValueByInterval(interval);
    this.moveHandleNode(trackValue);
  }

  updateNoValueCSSAttribute() {
    this.toggleHandleNodeNoValueCSSModifier(this.valueIndex === -1);
  }

  updateAccessibilityState() {
    let textValue = null;

    if (this.textValueHandler !== null) {
      textValue = this.textValueHandler(this.value);
    } else if (this.valueIndex > -1) {
      textValue = this.value;
    }

    this.handleNode.setAttribute('aria-valuetext', textValue);
    this.handleNode.setAttribute('aria-valuenow', this.valueIndex);
  }

  toggleHandleNodeNoValueCSSModifier(add) {
    if (add) {
      this.handleNode.classList.add(this.handleNodeNoValueModifierClass);
      return;
    }

    this.handleNode.classList.remove(this.handleNodeNoValueModifierClass);
  }

  handleCommonKeys(keyCode) {
    let newIndex = this.valueIndex;

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


  handleArrowsKeys(keyCode) {
    throw 'Not implemented exception';
  }

  onTrackClick(event) {
    let pointerPositionOnTheTrack = this.getPointerPositionOnTheTrack(this.getMouseEventPointerPosition(event));

    if (pointerPositionOnTheTrack < 0) {
      return;
    }

    let trackValue = this.getTrackValue(pointerPositionOnTheTrack);
    let index = this.getValueIndexByTrackValue(trackValue);
    this.setValueIndex(index);
  }

  onNoValueNodeClick(event) {
    event.stopPropagation();
    this.setValueIndex(-1);
  }

  onHandleMouseDown(event) {
    event.stopPropagation();
    this.onHandleMoveStart();
  }

  onDocumentMouseMove(event) {
    if (!this.isSliding) {
      return;
    }

    event.preventDefault();
    let pointerPositionOnTheTrack = this.getPointerPositionOnTheTrack(this.getMouseEventPointerPosition(event));
    this.onHandleMove(pointerPositionOnTheTrack);
  }

  onDocumentMouseUp(event) {
    if (!this.isSliding) {
      return;
    }

    event.preventDefault();
    let pointerPositionOnTheTrack = this.getPointerPositionOnTheTrack(this.getMouseEventPointerPosition(event));
    this.onHandleMoveEnd(pointerPositionOnTheTrack);
  }

  onHandleTouchStart(event) {
    if (this.isSliding) {
      return true;
    }

    if (event.cancelable) {
      event.stopPropagation();
      event.preventDefault();
    }

    this.onHandleMoveStart();
  }

  onDocumentTouchMove(event) {
    if (!this.isSliding) {
      return;
    }

    let pointerPositionOnTheTrack = this.getPointerPositionOnTheTrack(this.getTouchEventPointerPosition(event));
    this.onHandleMove(pointerPositionOnTheTrack);
  }

  onDocumentTouchEnd(event) {
    if (!this.isSliding) {
      return;
    }

    event.preventDefault();
    let pointerPositionOnTheTrack = this.getPointerPositionOnTheTrack(this.getTouchEventPointerPosition(event));
    this.onHandleMoveEnd(pointerPositionOnTheTrack);
  }

  onHandleMoveStart() {
    this.isSliding = true;
    this.sliderNode.classList.add(this.sliderNodeSlidingModifierClass);
  }

  onHandleMove(pointerPositionOnTheTrack) {
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

    let trackValue = this.getTrackValue(pointerPositionOnTheTrack);
    this.moveHandleNode(trackValue);
  }

  onHandleMoveEnd(pointerPositionOnTheTrack) {
    this.isSliding = false;
    this.sliderNode.classList.remove(this.sliderNodeSlidingModifierClass);
    let newValueIndex = null;

    if (pointerPositionOnTheTrack < -(this.getHandleNodeSize() / 2)) {
      newValueIndex = -1;
    } else {
      let trackValue = this.getTrackValue(pointerPositionOnTheTrack);
      newValueIndex = this.getValueIndexByTrackValue(trackValue);
    }

    if (newValueIndex === this.valueIndex) {
      this.syncHandlePositionToIndexValue();
      this.updateNoValueCSSAttribute();
    } else {
      this.setValueIndex(newValueIndex);
    }
  }

  onHandleKeyPress(event) {
    let allowedKeys = [keyboard_keys.ArrowUp, keyboard_keys.ArrowLeft, keyboard_keys.ArrowRight, keyboard_keys.ArrowDown, keyboard_keys.PageUp, keyboard_keys.PageDown, keyboard_keys.Home, keyboard_keys.End];

    if (allowedKeys.includes(event.keyCode) === false) {
      return;
    }

    event.preventDefault();
    this.handleCommonKeys(event.keyCode);
    this.handleArrowsKeys(event.keyCode);
  }

}
;// CONCATENATED MODULE: ./lib/slider/vertical-btt-slider.js



class VerticalBttSlider extends SliderBase {
  setHandleNodePosition(position) {
    this.handleNode.style.bottom = position;
  }

  getTrackNodeSize() {
    return this.trackNode.offsetHeight;
  }

  getHandleNodeSize() {
    return this.handleNode.offsetHeight;
  }

  getHandleNodeMargin() {
    return Utils.outerHeight(this.handleNode) - this.handleNode.offsetHeight;
  }

  getNoValueNodeOffset() {
    return Utils.getElementOffset(this.noValueNode).top;
  }

  getTrackNodeOffset() {
    return Utils.getElementOffset(this.trackNode).top;
  }

  getNoValueHandleNodePosition() {
    return this.getTrackNodeSize() + this.getTrackNodeOffset() + this.getHandleNodeMargin() - this.getNoValueNodeOffset();
  }

  getMouseEventPointerPosition(event) {
    return event.pageY;
  }

  getTouchEventPointerPosition(event) {
    return event.changedTouches[0].pageY;
  }

  getPointerPositionOnTheTrack(pointerPosition) {
    return (pointerPosition - this.getTrackNodeSize() - this.getTrackNodeOffset()) * -1;
  }

  handleArrowsKeys(keyCode) {
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

}
;// CONCATENATED MODULE: ./lib/slider/vertical-slider.js



class VerticalSlider extends SliderBase {
  setHandleNodePosition(position) {
    this.handleNode.style.top = position;
  }

  getTrackNodeSize() {
    return this.trackNode.offsetHeight;
  }

  getHandleNodeSize() {
    return this.handleNode.offsetHeight;
  }

  getHandleNodeMargin() {
    return Utils.outerHeight(this.handleNode) - this.handleNode.offsetHeight;
  }

  getNoValueNodeOffset() {
    return Utils.getElementOffset(this.noValueNode).top;
  }

  getTrackNodeOffset() {
    return Utils.getElementOffset(this.trackNode).top;
  }

  getNoValueHandleNodePosition() {
    return this.getNoValueNodeOffset() - this.getHandleNodeMargin() - this.getTrackNodeOffset();
  }

  getMouseEventPointerPosition(event) {
    return event.pageY;
  }

  getTouchEventPointerPosition(event) {
    return event.changedTouches[0].pageY;
  }

  getPointerPositionOnTheTrack(pointerPosition) {
    return pointerPosition - this.getTrackNodeOffset();
  }

  handleArrowsKeys(keyCode) {
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

}
;// CONCATENATED MODULE: ./lib/slider/horizontal-rtl-slider.js



class HorizontalRtlSlider extends SliderBase {
  setHandleNodePosition(position) {
    this.handleNode.style.right = position;
  }

  getTrackNodeSize() {
    return this.trackNode.offsetWidth;
  }

  getHandleNodeSize() {
    return this.handleNode.offsetWidth;
  }

  getHandleNodeMargin() {
    return Utils.outerWidth(this.handleNode) - this.handleNode.offsetWidth;
  }

  getNoValueNodeOffset() {
    return Utils.getElementOffset(this.noValueNode).left + this.noValueNode.offsetWidth;
  }

  getTrackNodeOffset() {
    return Utils.getElementOffset(this.trackNode).left + this.trackNode.offsetWidth;
  }

  getNoValueHandleNodePosition() {
    return this.getTrackNodeOffset() - (this.getNoValueNodeOffset() + this.getHandleNodeMargin());
  }

  getMouseEventPointerPosition(event) {
    return event.pageX;
  }

  getTouchEventPointerPosition(event) {
    return event.changedTouches[0].pageX;
  }

  getPointerPositionOnTheTrack(pointerPosition) {
    return this.getTrackNodeOffset() - pointerPosition;
  }

  handleArrowsKeys(keyCode) {
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

}
;// CONCATENATED MODULE: ./lib/slider/horizontal-slider.js



class HorizontalSlider extends SliderBase {
  setHandleNodePosition(position) {
    this.handleNode.style.left = position;
  }

  getTrackNodeSize() {
    return this.trackNode.offsetWidth;
  }

  getHandleNodeSize() {
    return this.handleNode.offsetWidth;
  }

  getHandleNodeMargin() {
    return Utils.outerWidth(this.handleNode) - this.handleNode.offsetWidth;
  }

  getNoValueNodeOffset() {
    return Utils.getElementOffset(this.noValueNode).left;
  }

  getTrackNodeOffset() {
    return Utils.getElementOffset(this.trackNode).left;
  }

  getNoValueHandleNodePosition() {
    return this.getNoValueNodeOffset() - this.getHandleNodeMargin() - this.getTrackNodeOffset();
  }

  getMouseEventPointerPosition(event) {
    return event.pageX;
  }

  getTouchEventPointerPosition(event) {
    return event.changedTouches[0].pageX;
  }

  getPointerPositionOnTheTrack(pointerPosition) {
    return pointerPosition - this.getTrackNodeOffset();
  }

  handleArrowsKeys(keyCode) {
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

}
;// CONCATENATED MODULE: ./lib/slider/slider-open-builder.js









class SliderOpenBuilder {
  /**
   * @param {Question} question - base question to which the slider will be attached
   * @param {QuestionViewSettings} settings - base question settings
   * @param {Object} sliderSettings - slider settings object
   * @param {HTMLDivElement} [sliderContainer] - the slider will be appended to this container
   * @param {string} [sliderId] - id for this slider
   */
  constructor(question, settings, sliderSettings, sliderContainer, sliderId) {
    this.question = question;
    this.settings = settings;
    this.sliderSettings = this.getValidSliderSettings(sliderSettings);
    this.addQuestionSettingsToSliderSettings();
    this.container = sliderContainer ?? this.getDefaultContainer();
    this.sliderId = sliderId ? sliderId : this.getDefaultSliderId();
    this._changeEvent = new Event('slider:change');
    this.init();
  }

  get changeEvent() {
    return this._changeEvent;
  }
  /**
   * @param sliderSettings
   * @returns {object} - slider settings object with every needed property set.
   */


  getValidSliderSettings(sliderSettings) {
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


  setDefaultSettingsIfNeeded(settings, defaultSettings) {
    for (const property in defaultSettings) {
      if (typeof defaultSettings[property] === 'object') {
        this.setDefaultSettingsIfNeeded(settings[property], defaultSettings[property]);
      } else if (!settings.hasOwnProperty(property) || settings[property] === null || settings[property] === undefined || Number.isNaN(settings[property])) {
        settings[property] = defaultSettings[property];
      }
    }
  }
  /**
   * Extends sliderSettings object with some settings like 'isRtl' from base question.
   */


  addQuestionSettingsToSliderSettings() {
    this.sliderSettings['isRtl'] = this.question.isRtl;
    this.sliderSettings['readOnly'] = this.question.readOnly;
  }

  getDefaultContainer() {
    try {
      return document.querySelector(`#${this.question.id}`);
    } catch (e) {
      throw 'Could not find the slider default container';
    }
  }
  /**
   * @returns {string} - id of this slider node.
   */


  getSliderId() {
    return this.sliderId;
  }
  /**
   * Creates default slider node id in form <question.id>_slider_<slider number>. Slider number reflects the order this slider is added to the page.
   * @returns {string} - default slider id.
   */


  getDefaultSliderId() {
    let slidersInThisQuestion = document.querySelectorAll(`#${this.question.id} .cf-single-slider-question--custom`);
    let slidersCount = slidersInThisQuestion.length;
    return `${this.question.id}_slider_${slidersCount + 1}`;
  }

  init() {
    let areCodesReversed = this.sliderSettings.direction === SLIDER_DIRECTION.verticalBtt;
    this.sliderValues = this.getValues(this.sliderSettings.customScale.min, this.sliderSettings.customScale.max, areCodesReversed);
    let sliderRenderer = new SliderOpenRenderer(this.sliderId, this.container, this.sliderValues, this.sliderSettings);
    sliderRenderer.render();
    this.slider = this.createSlider();
    this._changeEvent = this.slider.changeEvent;
    this.slider.changeEvent.on(this.onSliderChange.bind(this));
    this.sliderValues.forEach(answer => {
      this.getAnswerTextNode(answer.code).addEventListener('click', () => {
        this.setSliderValue(answer.text);
      });
    });
    this.onSliderChange();
  }
  /**
   * @param {number} start
   * @param {number} end
   * @return {Array} returns an array of objects
   */


  getValues(start, end, areCodesReversed = false) {
    let values = Array(end - start + 1).fill().map((_, idx) => start + idx);
    values = areCodesReversed ? values.reverse() : values;
    return values.map((value, index) => {
      return {
        code: index.toString(),
        text: value.toString()
      };
    });
  }

  createSlider() {
    let sliderNodeId = this.getSliderId();
    let sliderValues = this.sliderValues.map(answer => answer.text);
    let sliderValue = this.sliderSettings.customScale.start.toString();

    if (this.sliderSettings.isQuestionValue && this.question.value) {
      sliderValue = this.question.value;
    }

    let readOnly = this.sliderSettings.readOnly;

    let sliderTextValueHandler = sliderValue => {
      return sliderValue === null ? this.settings.messages.noResponse : sliderValue;
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

  setSliderValue(value) {
    value = value == null ? null : value.toString();

    if (this.sliderSettings.isQuestionValue) {
      this.question.setValue(value);
      this.slider.value = this.question.value;
      return;
    }

    this.slider.value = value;
  }

  getSliderValue() {
    return this.slider.value;
  }

  onSliderChange() {
    if (this.sliderSettings.isQuestionValue) {
      this.question.setValue(this.slider.value);
    }

    let questionAnswerTextNodes = this.container.querySelectorAll('#' + this.sliderId + ' .cf-single-slider-question__answer-text');

    if (questionAnswerTextNodes != null && questionAnswerTextNodes.length !== 0) {
      questionAnswerTextNodes.forEach(answerTextNode => {
        answerTextNode.classList.remove('cf-single-slider-question__answer-text--selected');
      });
    }

    let selectedAnswer = this.sliderValues.find(x => x.text === this.slider.value);
    let answerTextNode = null;

    if (selectedAnswer) {
      answerTextNode = this.getAnswerTextNode(selectedAnswer.code);
    }

    if (answerTextNode != null) {
      answerTextNode.classList.add('cf-single-slider-question__answer-text--selected');
    }
  }

  getAnswerTextNode(answerCode) {
    return document.querySelector('#' + this.getAnswerTextNodeId(answerCode));
  }

  getAnswerTextNodeId(answerCode) {
    return `${this.getSliderId()}_${answerCode}_text`;
  }

}

if (window && !window.customQuestionsLibrary) {
  window.customQuestionsLibrary = {};
}

window.customQuestionsLibrary.SliderOpenComponent = SliderOpenBuilder;
/******/ })()
;