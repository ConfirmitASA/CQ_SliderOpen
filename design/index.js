const ISCUSTOMSCALE = true; // should be always true for Open Form, for SingleForm, GridForm it should be false
const ISQUESTIONVALUE = true;

let selectSliderDirection = document.getElementById('sliderDirection');
let scaleMin = document.getElementById('scaleMin');
let scaleMax = document.getElementById('scaleMax');
let scaleStart = document.getElementById('scaleStart');
let scaleStep = document.getElementById('scaleStep');

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
	
	selectSliderDirection.value = settings.sliderSettings.isVertical ? 'vertical' :  'horizontal';
	scaleMin.value = settings.sliderSettings.customScale.min;
	scaleMax.value = settings.sliderSettings.customScale.max;
	scaleStart.value = settings.sliderSettings.customScale.start;
	scaleStep.value = settings.sliderSettings.customScale.step;
}

function saveChanges() {
	let errors = checkValues();
	let elementsWithErrors = document.querySelectorAll('.form-input--error');
	removeErrors();
	if(elementsWithErrors.length > 0 || errors) {
		showErrors(errors);
	} else {
		let isVerticalVal = selectSliderDirection.value === 'vertical';
		let startVal = scaleStart.value === '' ? null : parseInt(scaleStart.value);
		let settings = {
			sliderSettings: {
				isVertical: isVerticalVal,
				isQuestionValue: ISQUESTIONVALUE,
				isCustomScale: ISCUSTOMSCALE,
				customScale: { 
					min: parseInt(scaleMin.value),
					max: parseInt(scaleMax.value),
					start: startVal,
					step: parseInt(scaleStep.value)
				}
			}
		};
		let hasError = false;
		customQuestion.saveChanges(settings, hasError);     
	}
}

function checkValues() {
	let errorsList = [];
	// check scale Min setting
	if(!!scaleMin.value) {
		if(parseInt(scaleMin.value) < -100 || parseInt(scaleMin.value) > 99) {
			if(parseInt(scaleMin.value) < -100) {
				let newItem = {
					'element': scaleMin,
					'errorText': 'Can\'t be less <br/> than -100'
				};
				errorsList.push(newItem);
			} else {
				let newItem = {
					'element': scaleMin,
					'errorText': 'Can\'t be more than 99'
				};
				errorsList.push(newItem);
			}
		}
	}

	// check scale Max setting
	if(!!scaleMax.value) {
		if (parseInt(scaleMax.value) < -99 || parseInt(scaleMax.value) > 100) {
			if (parseInt(scaleMax.value) < -99) {
				let newItem = {
					'element': scaleMax,
					'errorText': 'Can\'t be less than -99'
				};
				errorsList.push(newItem);
			} else {
				let newItem = {
					'element': scaleMax,
					'errorText': 'Can\'t be more than 100'
				};
				errorsList.push(newItem);
			}
		}
	}

	// compare Min and Max values
	if(!!scaleMax.value && !!scaleMin.value) {
		if(parseInt(scaleMax.value) <= parseInt(scaleMin.value)) {
			let newItem = {
				'element': scaleMax,
				'errorText': 'Can\'t be less or equal than scale\'s minimum'
			};
			errorsList.push(newItem);
		}
	}

	// check if the start point is inside of the Min and Max range
	if(!!scaleStart.value) {
		let rangeStart = -100;
		let rangeEnd = 100;
		if(!!scaleMin.value) {
			rangeStart = scaleMin.value;
		}
		if(!!scaleMax.value) {
			rangeEnd = scaleMax.value;
		}
		if(parseInt(scaleStart.value) < parseInt(rangeStart) || parseInt(scaleStart.value) > parseInt(rangeEnd)) {
			let newItem = {
				'element': scaleStart,
				'errorText': 'Must be in the range between ' + parseInt(rangeStart) + ' and ' + parseInt(rangeEnd)
			};
			errorsList.push(newItem);
		}
	}

	// check the step value is inside the Min and Max range
	if(!!scaleStep.value) {
		let rangeStart = 1;
		let rangeEnd = 201;

		if(!!scaleMin.value && !!scaleMax.value) {
			rangeEnd = scaleMax.value - scaleMin.value + 1;
		}
		if(parseInt(scaleStep.value) < rangeStart || parseInt(scaleStep.value) > rangeEnd) {
			let newItem = {
				'element': scaleStep,
				'errorText': 'Must be in the range between ' + rangeStart + ' and ' + parseInt(rangeEnd)
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
selectSliderDirection.addEventListener('input', saveChanges);
scaleMin.addEventListener('input', saveChanges);
scaleMax.addEventListener('input', saveChanges);
scaleStart.addEventListener('input', saveChanges);
scaleStep.addEventListener('input', saveChanges);
