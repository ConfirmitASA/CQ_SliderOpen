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
	stepNonPositive: 'Must be greater than zero'
}

let sliderDirectionSelect = document.getElementById('sliderDirection');
let scaleMinInput = document.getElementById('scaleMin');
let scaleMaxInput = document.getElementById('scaleMax');
let scaleStepInput = document.getElementById('scaleStep');
let containerSizeInput = document.getElementById('containerSize');

// Hides scale settings panel if ISCUSTOMSCALE = false
let scaleSettingsDiv = document.getElementById('scaleSettings');
if(ISCUSTOMSCALE) {
	scaleSettingsDiv.style.display = 'flex';
} else {
  scaleSettingsDiv.style.display = 'none';
}

function setValues(settings, uiSettings) {
	if(!settings) {
		return;
	}

	sliderDirectionSelect.value = settings.sliderSettings.direction;
	scaleMinInput.value = settings.sliderSettings.customScale.min;
	scaleMaxInput.value = settings.sliderSettings.customScale.max;
	scaleStepInput.value = settings.sliderSettings.customScale.step;
	containerSizeInput.value = settings.sliderSettings.containerSize;

	toggleBadStepWarning(false);
}

function saveChanges() {
	removeErrors();
	let hasError = false;

	let errors = checkValues();
	//let elementsWithErrors = document.querySelectorAll('.form-input--error');

	if(errors) {
		showErrors(errors);
		hasError = true;
	}
	toggleBadStepWarning(hasError);

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
	
customQuestion.onSettingsReceived = setValues; 
sliderDirectionSelect.addEventListener('input', saveChanges);
subscribeToSaveChanges();
function subscribeToSaveChanges() {
	var containers = [];
	containers.push(document.querySelector('.sliderOptions'));
	for (var c = 0; c < containers.length; c++) {
		containers[c].addEventListener('input', saveChanges, true);
	}
}
