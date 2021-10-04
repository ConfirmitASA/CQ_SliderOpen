
# Custom Slider

Custom Slider is a library for adding a slider component to a custom question.
![Slider component](https://user-images.githubusercontent.com/70640199/135821099-13736ab5-cfe0-4faf-b963-0c0da4ebdcf6.png)

## Usage

1) Create a SliderOpenComponent object
```js
new customQuestionsLibrary.SliderOpenComponent(question, questionViewSettings, sliderSettings);
```
2) Before creating a SliderOpenComponent object you can change slider's settings. For instance:

```js
sliderSettings = {
  direction: 'vertical',
  isQuestionValue: true,
  isCustomScale: true,
  containerSize: 400,
  customScale: {
      min: -10,
      max: 10,
      start: 0,
      step: 2
  }
}
```
Default slider's settings are the following:
```js
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
}
```
They can be found in [slider-default-settings.js](lib/slider/slider-default-settings.js). If `sliderSettings` object is `null` these default settings are used. If any property is missing or is `null/undefined/NaN` corresponding default value is used.
Possible directions are the following:
- `SLIDER_DIRECTION.horizontal: 'horizontal'`
- `SLIDER_DIRECTION.vertical: 'vertical'` - standard vertical slider with *no value* handle located at the top of the slider, values ascending from top to bottom.
- `SLIDER_DIRECTION.verticalBtt: 'verticalBtt'` - vertical slider with *no value* handle located at the bottom of the slider, values ascending from bottom to top.

Properties `isQuestionValue` and `isCustomScale` imply the following meaning:
- If `isQuestionValue = true` then a slider will set a value of a question, if it's `false`, only a slider value will change.
- `isCustomScale` should be true for `OpenForm`, and false for `SingleForm, GridForm`. If it's true the slider will take a form of a scale
  with a range from `customScale.min` to `customScale.max` with `customScale.step` step between values and `customScale.start` as a start point. `''` start point = handle in *no value* position.

3) An example of how you can implement slider options on Custom Settings page is in the design/index.html (see comments there).
4) Properties isQuestionValue and isCustomScale should be also set in design/index.js and should be equal to the previous ones (see examples for fields' validation there).

## Events
You can subscribe to slider's **change event** like so:
```js
let sliderComponent = new customQuestionsLibrary.SliderOpenComponent(question, questionViewSettings, sliderSettings);
sliderComponent.changeEvent.on(function() {
  console.log(sliderComponent.getSliderValue());
});
```
## Code snippets
To hide all labels:
```js
function hideLabels() {
     document.querySelector('.cf-single-slider-question__labels').style.display = "none";
}
window.addEventListener("load", hideLabels);
```
