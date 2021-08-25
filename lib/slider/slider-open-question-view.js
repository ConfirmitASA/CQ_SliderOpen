import QuestionWithAnswersView from './question-with-answers-view';
import QuestionErrorBlock from './question-error-block';
import ErrorBlockManager from './error-block-manager';
import HorizontalSlider from './horizontal-slider';
import VerticalSlider from './vertical-slider';
import HorizontalRtlSlider from './horizontal-rtl-slider';
import FloatingLabels from './floating-labels';
import ValidationTypes from './validation-types';
import Utils from './utils';

const DEFAULT_SLIDER_SETTINGS = {
	isVertical: true,
	isQuestionValue: true,
	isCustomScale: true,
	customScale: {
		min: -10,
		max: 10,
		start: '',
		step: 1
	}
}
			
class SliderOpenQuestionView extends QuestionWithAnswersView {
	/**
	 * @param {OpenQuestion} question - base question
	 * @param {QuestionViewSettings} settings - base question settings
	 * @param {Object} customSettings - custom settings object that includes sliderSettings property
	 * @param {HTMLDivElement} sliderContainer - the slider will be appended to this container
	 */
	constructor(question, settings, customSettings, sliderContainer) {
		super(question, settings);		
		this.sliderSettings = this.getValidSliderSettings(customSettings.sliderSettings);
		this.container = sliderContainer ? sliderContainer : this.getDefaultContainer();

		this.init();
	}

	getValidSliderSettings(sliderSettings) {
		if(sliderSettings === null) {
			return DEFAULT_SLIDER_SETTINGS;
		}
		this.setDefaultSettingsIfNeeded(sliderSettings, DEFAULT_SLIDER_SETTINGS);
		return sliderSettings;
	}

	setDefaultSettingsIfNeeded(settings, defaultSettings) {
		debugger;
		for (const property in defaultSettings) {
			if (typeof(defaultSettings[property]) === 'object') {
				this.setDefaultSettingsIfNeeded(settings[property], defaultSettings[property]);
			} else if(!settings.hasOwnProperty(property) ||
					settings[property] === null ||
					settings[property] === undefined ||
					isNaN(settings[property]))
				{
					settings[property] = defaultSettings[property];
				}
			}
		}
	
	init() {
		this.sliderValues = this.getValues(this.sliderSettings.customScale.min,
			this.sliderSettings.customScale.max);
		this.sliderStartValue = this.sliderSettings.customScale.start;
		
		this.render();
		this.slider = this.createSlider();
		
		this.slider.changeEvent.on(this.onSliderChange.bind(this));
		this.questionErrorBlock = new QuestionErrorBlock(this.getQuestionErrors());
		this.answerErrorBlockManager = new ErrorBlockManager();

		this.sliderValues.forEach(answer => {
			this.getAnswerTextNode(answer.code).addEventListener('click', () => {
				this.setSliderValue(answer.code); 
			});
		});

		this.setSliderValue(this.sliderSettings.customScale.start);
	}
		
	render() {
		let container = this.container;	
		let textContainer = this.createTextContainer();
		let instructionContainer = this.createInstructionContainer();
		let errorsContainer = this.createErrorsContainer();
		let sliderContainer = this.createSliderContainer();

		let labelsContainer = this.createLabelsContainer();

		let questionDirection = this.sliderSettings.isVertical ? 'cf-single-slider-question--vertical'
								: (this.question.isRtl ? 'cf-single-slider-question--horizontal-rtl' : 'cf-single-slider-question--horizontal');
		let sliderDirection = this.sliderSettings.isVertical ? 'cf-slider--vertical' : 'cf-slider--horizontal';
		sliderDirection = this.question.isRtl ? sliderDirection + '-rtl' : sliderDirection;
																				
		sliderContainer.innerHTML = '<div class="cf-single-slider-question ' + questionDirection + '">' + labelsContainer.outerHTML +
																'<div class="cf-single-slider-question__slider cf-slider ' + sliderDirection + '" id="' + this.question.id + '_input">' +
																'<div class="cf-slider__track-area">' +
																'<div class="cf-slider__track">' +
																'<div class="cf-slider__no-value"></div>' +
																'<div class="cf-slider__handle cf-slider__handle--no-value" role="slider" aria-readonly="false" tabindex="0" aria-valuenow="-1" aria-valuetext="NO RESPONSE"></div>'+
																'</div></div></div></div></div>';
						
		container.append(textContainer);
		container.append(instructionContainer);
		container.append(errorsContainer);
		container.append(sliderContainer);
	}

	createTextContainer() {
		let textContainer = document.createElement('div');
		textContainer.setAttribute('id', this.question.id + '_text');
		textContainer.setAttribute('class', 'cf-question__text');
		
		if(this.question.text) {
			textContainer.innerHTML = this.question.text;
		}
		
		return textContainer;
	}
	
	createInstructionContainer() {
		let instructionContainer = document.createElement('div');
		instructionContainer.setAttribute('id', this.question.id + '_instruction');
		instructionContainer.setAttribute('class', 'cf-question__instruction');
		
		if(this.question.instruction) {
			instructionContainer.innerHTML = this.question.instruction;
		}
		
		return instructionContainer;
	}
	
	createErrorsContainer() {
		let errorsContainer = document.createElement('div');
		errorsContainer.setAttribute('id', this.question.id + '_error');
		errorsContainer.setAttribute('class', 'cf-question__error cf-error-block cf-error-block--bottom cf-error-block--hidden');
		errorsContainer.innerHTML = '<ul class="cf-error-list" id="' + this.question.id + '_error_list"></ul>';
		
		return errorsContainer;
	}
	
	createSliderContainer() {
		let sliderContainer = document.createElement('div');
		sliderContainer.setAttribute('id', this.question.id + '_content');
		this.setDefaultStylesIfNeeded(sliderContainer);
		
		return sliderContainer;
	}

	createLabelsContainer() {
		let labelsContainer = document.createElement('ol');
		labelsContainer.className = 'cf-single-slider-question__labels';

		this.sliderValues = this.question.isRtl ? this.sliderValues.slice().reverse() : this.sliderValues;
		let valuesWithStep = this.getValuesWithStep(this.sliderSettings.customScale.min,
			this.sliderSettings.customScale.max, this.sliderSettings.customScale.step);
		if (this.sliderSettings.isVertical) {
			labelsContainer.style.minHeight = (valuesWithStep.length * 2).toString() + 'em';
		}
		let intervalStep = 100 / this.sliderValues.length;
		let labelOffset = Utils.round(intervalStep / 2, 2);
		this.sliderValues.forEach(value => {
			let label = this.createLabel(value.code, value.text);

			if (!valuesWithStep.includes(value.code)) {
				label.style.display = 'none';
			}
			if (!this.sliderSettings.isVertical) {
				label.style.left = labelOffset.toString() + '%';
				label.style.marginLeft = (-0.25 + value.text.length * -0.25).toString() + 'em';
			}
			if (this.sliderSettings.isVertical) {
				label.style.top = labelOffset.toString() + '%';
			}
			labelOffset += intervalStep;
			labelOffset = Utils.round(labelOffset, 2);
			labelsContainer.insertAdjacentElement('beforeend', label);
		});

		return labelsContainer;
	}

	createLabel(valueCode, valueText) {
		let label = document.createElement('li');
		label.setAttribute('class', 'cf-single-slider-question__label');
		let answerText = document.createElement('div');
		answerText.setAttribute('class', 'cf-single-slider-question__answer-text');
		answerText.setAttribute('id', this.question.id + '_' + valueCode + '_text');
		answerText.innerHTML = valueText;
		label.insertAdjacentElement('beforeend', answerText);

		return label;
	}
	
	setDefaultStylesIfNeeded(sliderContainer) {
		if(!sliderContainer) {
			return;
		}
		
		let pageMainDiv = document.querySelector('.cf-page__main');
		let styles = Utils.getStylesWithoutDefaults(pageMainDiv);
		if(pageMainDiv && Object.keys(styles).length > 0) {
			sliderContainer.setAttribute('class', 'cf-question__content');
		}	else {
			sliderContainer.setAttribute('class', 'cf-question__content default-styles_active');
		}
	}
	
	createSlider() {
		let sliderNode = this.getQuestionInputNodeId();
		let sliderValues = this.sliderValues.map(answer => answer.code);
		let sliderValue = this.sliderSettings.isQuestionValue ? this.question.value : this.sliderStartValue; 
		let readOnly = this.question.readOnly;
		let sliderTextValueHandler = (sliderValue) => {
			return sliderValue === null ? this.settings.messages.noResponse : sliderValue; 
		};

		if(this.sliderSettings.isVertical) {
			return new VerticalSlider(sliderNode, sliderValues, sliderValue, sliderTextValueHandler, readOnly);
		}
		if(this.question.isRtl) {
			return new HorizontalRtlSlider(sliderNode, sliderValues, sliderValue, sliderTextValueHandler, readOnly);
		}

		return new HorizontalSlider(sliderNode, sliderValues, sliderValue, sliderTextValueHandler, readOnly);
	}

	onModelValueChange() {
		this.slider.value = this.question.value;
	}

	onSliderChange() {
		if(this.sliderSettings.isQuestionValue) {
			this.question.setValue(this.slider.value);
		}
		
		let questionAnswerTextNodes = this.container.querySelectorAll('.cf-single-slider-question__answer-text');
		if(questionAnswerTextNodes != null && questionAnswerTextNodes.length !== 0) {
			questionAnswerTextNodes.forEach(answerTextNode => {
				answerTextNode.classList.remove('cf-single-slider-question__answer-text--selected');
			});
		}
		
		let answerTextNode = this.getAnswerTextNode(this.slider.value);
		if(answerTextNode != null) {
			answerTextNode.classList.add('cf-single-slider-question__answer-text--selected');
		}
	}

	getDefaultContainer() {
		try {
			return document.querySelector(`#${this.question.id}`);
		} 
		catch (e) {
			throw 'Could not find the slider container';
		}
	}
	
	getQuestionErrors() {
		try {
			return this.container.querySelector('.cf-question__error');
		} 
		catch (e) {
			throw 'Could not find the ".cf-question__error"';
		}
	}
	
	/**
	 * @param {number} start
	 * @param {number} end
	 * @return {Array} returns an array of objects
	*/
	getValues(start, end) {
		let values = Array(end - start + 1).fill().map((_, idx) => (start + idx));	
		let valArr = [];
		let cur = 0;
		for(const key of values) {
			valArr[cur] = {
								code: key.toString(), 
								text: key.toString()
							};
			cur++; 
		}
		return valArr;
	}

	/**
	 * @param {number} start
	 * @param {number} end
	 * @param {number} step
	 * @return {Array} returns an array of objects
	 */
	getValuesWithStep(start, end, step) {
		let valuesLeft = [];
		let valuesRight = [];

		let leftValue = start;
		let rightValue = end;

		while (leftValue < rightValue) {
			valuesLeft.push(leftValue.toString());
			valuesRight.unshift(rightValue.toString());

			leftValue += step;
			rightValue -= step;
		}

		if(leftValue === rightValue) {
			valuesLeft.push(leftValue.toString());
		}

		return valuesLeft.concat(valuesRight);
	}
	
	setSliderValue(value) {
		value = value == null ? null : value.toString();
		if(this.sliderSettings.isQuestionValue) {
			this.question.setValue(value);
			return;
		} 
		
		this.slider.value = value;
	}
	
	getSliderValue() {
		return this.slider.value;
	}
}

if(window && !window.customQuestionsLibrary) {
	window.customQuestionsLibrary = {};
}
window.customQuestionsLibrary.SliderOpenQuestionView = SliderOpenQuestionView;