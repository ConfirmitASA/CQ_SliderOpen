const ISCUSTOMSCALE = true; // should be true for Open Form and false for SingleForm, GridForm
const ISQUESTIONVALUE = true;

const RANGES = {
	minimum: {
		min: -100,
		max: 100
	},
	maximum: {
		min: -100,
		max: 100
	},
	sliderSize: {
		min: 300,
		max: 900
	},
	imageSize: {
		min: 30,
		max: 300
	}
}

let VALIDATION_TEXTS = {
	required: 'Required',
	minimumLess: `Can\'t be less <br/> than ${RANGES.minimum.min}`,
	minimumGreater: `Can\'t be greater <br/> than ${RANGES.minimum.max}`,
	maximumLess: `Can\'t be less <br/> than ${RANGES.maximum.min}`,
	maximumGreater: `Can\'t be greater <br/> than ${RANGES.maximum.max}`,
	maximumLessThanMinimum: 'Must be greater <br/> than minimum',
	badStep: 'Max value label <br/> won\'t be visible',
	stepNonPositive: 'Must be greater than zero',
	sliderSizeLess: `Can\'t be less <br/> than ${RANGES.sliderSize.min}`,
	sliderSizeGreater: `Can\'t be greater <br/> than ${RANGES.sliderSize.max}`,
	imageSizeLess: `Can\'t be less <br/> than ${RANGES.imageSize.min}`,
	imageSizeGreater: `Can\'t be greater <br/> than ${RANGES.imageSize.max}`,
}

let sliderDirectionSelect = document.getElementById('sliderDirection');
let scaleMinInput = document.getElementById('scaleMin');
let scaleMaxInput = document.getElementById('scaleMax');
let scaleStepInput = document.getElementById('scaleStep');
let containerSizeInput = document.getElementById('containerSize');
let useImageSliderInput = document.getElementById('useImageSlider');
let imageSizeInput = document.getElementById('imageSize');
let handleImageInput = document.getElementById('handleImage');
let endImageInput = document.getElementById('endImage');
let leftLabelTextInput = document.getElementById('leftLabelText');
let rightLabelTextInput = document.getElementById('rightLabelText');

// Hides scale settings panel if ISCUSTOMSCALE = false
let scaleSettingsDiv = document.getElementById('scaleSettings');
if(ISCUSTOMSCALE) {
	scaleSettingsDiv.style.display = 'flex';
} else {
  scaleSettingsDiv.style.display = 'none';
}

let currentLanguage = '';
let leftLabelTextObj = {};
let rightLabelTextObj = {};

function setValues(settings, uiSettings) {
	currentLanguage = String(uiSettings.currentLanguage);

	if(!settings) {
		return;
	}

	sliderDirectionSelect.value = settings.sliderSettings.direction;
	toggleUseImageSliderAccordingToChosenDirection();
	scaleMinInput.value = settings.sliderSettings.customScale.min;
	scaleMaxInput.value = settings.sliderSettings.customScale.max;
	scaleStepInput.value = settings.sliderSettings.customScale.step;
	containerSizeInput.value = settings.sliderSettings.containerSize;

	if(settings.sliderSettings.hasOwnProperty('otherSettings')) {
		if(settings.sliderSettings.otherSettings.hasOwnProperty('useImageSlider') && settings.sliderSettings.otherSettings.useImageSlider !== undefined) {
			useImageSliderInput.checked = settings.sliderSettings.otherSettings.useImageSlider;
			toggleSubsectionOnUseImageSliderBoxChecked();
		}
		if(settings.sliderSettings.otherSettings.hasOwnProperty('imageSize') && settings.sliderSettings.otherSettings.imageSize !== undefined) {
			imageSizeInput.value = settings.sliderSettings.otherSettings.imageSize;
		}
		if(settings.sliderSettings.otherSettings.hasOwnProperty('handleImage') && settings.sliderSettings.otherSettings.handleImage !== undefined) {
			handleImageInput.value = settings.sliderSettings.otherSettings.handleImage;
			loadImagePreview(handleImageInput);
		}
		if(settings.sliderSettings.otherSettings.hasOwnProperty('endImage') && settings.sliderSettings.otherSettings.endImage !== undefined) {
			endImageInput.value = settings.sliderSettings.otherSettings.endImage;
			loadImagePreview(endImageInput);
		}

		if(settings.sliderSettings.otherSettings.hasOwnProperty('leftLabelText')) {
			leftLabelTextObj = settings.sliderSettings.otherSettings.leftLabelText;
		}
		leftLabelTextInput.value = '';
		if(settings.sliderSettings.otherSettings.hasOwnProperty('leftLabelText') && settings.sliderSettings.otherSettings.leftLabelText[currentLanguage] !== undefined) {
			leftLabelTextInput.value = settings.sliderSettings.otherSettings.leftLabelText[currentLanguage];
		}

		if(settings.sliderSettings.otherSettings.hasOwnProperty('rightLabelText')) {
			rightLabelTextObj = settings.sliderSettings.otherSettings.rightLabelText;
		}
		rightLabelTextInput.value = '';
		if(settings.sliderSettings.otherSettings.hasOwnProperty('rightLabelText') && settings.sliderSettings.otherSettings.rightLabelText[currentLanguage] !== undefined) {
			rightLabelTextInput.value = settings.sliderSettings.otherSettings.rightLabelText[currentLanguage];
		}
	}

	let errors = checkValues();
	let hasError = false;

	if(errors) {
		showErrors(errors);
		hasError = true;
	}
	toggleBadStepWarning(hasError);
}

function saveChanges() {
	removeErrors();
	let hasError = false;
	let errors = checkValues();

	if(errors) {
		showErrors(errors);
		hasError = true;
	}
	toggleBadStepWarning(hasError);

	leftLabelTextObj[currentLanguage] = leftLabelTextInput.value;
	rightLabelTextObj[currentLanguage] = rightLabelTextInput.value;

	let settings = {
		sliderSettings: {
			direction: sliderDirectionSelect.value,
			containerSize: containerSizeInput.value,
			isQuestionValue: ISQUESTIONVALUE,
			isCustomScale: ISCUSTOMSCALE,
			customScale: {
				min: parseInt(scaleMinInput.value),
				max: parseInt(scaleMaxInput.value),
				start: '',
				step: parseInt(scaleStepInput.value)
			},
			otherSettings: {
				useImageSlider: useImageSliderInput.checked,
				imageSize: parseInt(imageSizeInput.value),
				handleImage: handleImageInput.value,
				endImage: endImageInput.value,
				leftLabelText: leftLabelTextObj,
				rightLabelText: rightLabelTextObj
			}
		}
	};

	customQuestion.saveChanges(settings, hasError);
}

function toggleBadStepWarning(hasError) {
	let isBadStep = false;
	if(!!scaleStepInput.value) {
		let x = (scaleMaxInput.value - scaleMinInput.value) / scaleStepInput.value;
		isBadStep = !Number.isInteger(x);
	}

	if(isBadStep && !hasError) {
		warningTooltipShow(scaleStepInput, VALIDATION_TEXTS.badStep);
		scaleStepInput.classList.add('form-input--warning');
	} else {
		let warningTooltip = document.getElementById('warning--' + scaleStepInput.id);
		if(!!warningTooltip) {
			scaleStepInput.classList.remove('form-input--warning');
			warningTooltip.outerHTML = '';
		}
	}
}

function checkValues() {
	let errorsList = [];
	//check required
	if(!scaleMinInput.value) {
		let newItem = {
			'element': scaleMinInput,
			'errorText': VALIDATION_TEXTS.required
		};
		errorsList.push(newItem);
	}
	if(!scaleMaxInput.value) {
		let newItem = {
			'element': scaleMaxInput,
			'errorText': VALIDATION_TEXTS.required
		};
		errorsList.push(newItem);
	}
	// check scale Min setting
	if(!!scaleMinInput.value) {
		if(parseInt(scaleMinInput.value) < RANGES.minimum.min || parseInt(scaleMinInput.value) > RANGES.minimum.max) {
			if(parseInt(scaleMinInput.value) < RANGES.minimum.min) {
				let newItem = {
					'element': scaleMinInput,
					'errorText': VALIDATION_TEXTS.minimumLess
				};
				errorsList.push(newItem);
			} else {
				let newItem = {
					'element': scaleMinInput,
					'errorText': VALIDATION_TEXTS.minimumGreater
				};
				errorsList.push(newItem);
			}
		}
	}

	// check scale Max setting
	if(!!scaleMaxInput.value) {
		if (parseInt(scaleMaxInput.value) < RANGES.maximum.min || parseInt(scaleMaxInput.value) > RANGES.maximum.max) {
			if (parseInt(scaleMaxInput.value) < RANGES.maximum.min) {
				let newItem = {
					'element': scaleMaxInput,
					'errorText': VALIDATION_TEXTS.maximumLess
				};
				errorsList.push(newItem);
			} else {
				let newItem = {
					'element': scaleMaxInput,
					'errorText': VALIDATION_TEXTS.maximumGreater
				};
				errorsList.push(newItem);
			}
		}
	}

	// compare Min and Max values
	if(!!scaleMaxInput.value && !!scaleMinInput.value) {
		if(parseInt(scaleMaxInput.value) <= parseInt(scaleMinInput.value)) {
			let newItem = {
				'element': scaleMaxInput,
				'errorText': VALIDATION_TEXTS.maximumLessThanMinimum
			};
			errorsList.push(newItem);
		}
	}

	// check the step value is greater than 1
	if(!!scaleStepInput.value) {
		if(parseInt(scaleStepInput.value) < 1) {
			let newItem = {
				'element': scaleStepInput,
				'errorText': VALIDATION_TEXTS.stepNonPositive
			};
			errorsList.push(newItem);
		}
	}

	// check container size limits
	if(!!containerSizeInput.value) {
		if(parseInt(containerSizeInput.value) < RANGES.sliderSize.min) {
			let newItem = {
				'element': containerSizeInput,
				'errorText': VALIDATION_TEXTS.sliderSizeLess
			};
			errorsList.push(newItem);
		}
	}
	if(!!containerSizeInput.value) {
		if(parseInt(containerSizeInput.value) > RANGES.sliderSize.max) {
			let newItem = {
				'element': containerSizeInput,
				'errorText': VALIDATION_TEXTS.sliderSizeGreater
			};
			errorsList.push(newItem);
		}
	}

	// check image size limits
	if(!!imageSizeInput.value) {
		if(parseInt(imageSizeInput.value) < RANGES.imageSize.min) {
			let newItem = {
				'element': imageSizeInput,
				'errorText': VALIDATION_TEXTS.imageSizeLess
			};
			errorsList.push(newItem);
		}
	}
	if(!!imageSizeInput.value) {
		if(parseInt(imageSizeInput.value) > RANGES.imageSize.max) {
			let newItem = {
				'element': imageSizeInput,
				'errorText': VALIDATION_TEXTS.imageSizeGreater
			};
			errorsList.push(newItem);
		}
	}

	if(errorsList.length > 0) {
		return errorsList;
	} else {
		return false;
	}
}

function showErrors(errors) {
	for(let i = 0; i < errors.length; i++) {
		errorTooltipShow(errors[i].element, errors[i].errorText);
		errors[i].element.classList.add('form-input--error');
	}
}

function removeErrors() {
	let elementsWithErrors = document.querySelectorAll('.form-input--error');
	if(elementsWithErrors.length > 0) {
		for(let i = 0; i < elementsWithErrors.length; i++) {
			let elementID = elementsWithErrors[i].id;
			if(document.querySelectorAll('#error--' + elementID).length > 0) {
				elementsWithErrors[i].classList.remove('form-input--error');
				document.getElementById('error--' + elementID).outerHTML = '';
			}
		}
	}
}

function loadImagePreview(inputElement) {
	const inputURL = inputElement.value;
	const previewContainer = document.querySelector("#" + inputElement.id + " + img");
	if(inputURL === '') {
		previewContainer.removeAttribute('src');
	} else {
		previewContainer.setAttribute('src', inputURL);
	}
}

function subscribeUseImageSliderCheckboxToggleSubsection() {
	useImageSliderInput.addEventListener('change', toggleSubsectionOnUseImageSliderBoxChecked);
}

function toggleSubsectionOnUseImageSliderBoxChecked() {
	let collapsableSection;
	try{
		collapsableSection = document.querySelectorAll(`.controlled-by--${useImageSliderInput.id}`)[0];
	}
	catch (e) {
		console.log("Could not find collapsable section controlled by " + useImageSliderInput.id);
		return;
	}

	if (useImageSliderInput.checked) {
		collapsableSection.classList.remove("hidden");
	} else {
		collapsableSection.classList.add("hidden");
	}
}

function toggleUseImageSliderAccordingToChosenDirection() {
	if(sliderDirectionSelect.value !== 'horizontal') {
		useImageSliderInput.disabled = true;
		useImageSliderInput.checked = false;
		useImageSliderInput.parentNode.querySelector('span').style.opacity = '0.6';
		toggleSliderSizeAccordingToUseImageSlider();
	} else {
		useImageSliderInput.disabled = false;
		useImageSliderInput.parentNode.querySelector('span').style.opacity = '1';
	}
}

function toggleSliderSizeAccordingToUseImageSlider() {
	if(useImageSliderInput.checked) {
		containerSizeInput.disabled = true;
	} else {
		containerSizeInput.disabled = false;
	}
}

subscribeUseImageSliderCheckboxToggleSubsection();
sliderDirectionSelect.addEventListener('input', toggleUseImageSliderAccordingToChosenDirection);
useImageSliderInput.addEventListener('input', toggleSliderSizeAccordingToUseImageSlider);
customQuestion.onSettingsReceived = setValues; 
sliderDirectionSelect.addEventListener('input', saveChanges);
subscribeToSaveChanges();
function subscribeToSaveChanges() {
	var containers = [];
	containers.push(document.querySelector('.sliderOptions'));
	containers.push(document.querySelector('.otherOptions'));
	for (var c = 0; c < containers.length; c++) {
		containers[c].addEventListener('input', saveChanges, true);
	}
}
