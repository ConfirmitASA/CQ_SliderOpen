(function () {
	Confirmit.pageView.registerCustomQuestion(
		"83f8d1ad-7949-4c53-9cda-aa424ece246b",
		function (question, customQuestionSettings, questionViewSettings) {
			let sliderSettings = customQuestionSettings === null ? null : customQuestionSettings.sliderSettings;

			let textDiv = document.createElement('div');
			textDiv.setAttribute('id', question.id + '_text');
			textDiv.setAttribute('class', 'cf-question__text');
			if(question.text) {
				textDiv.innerHTML = question.text;
			}

			let instructionDiv = document.createElement('div');
			instructionDiv.setAttribute('id', question.id + '_instruction');
			instructionDiv.setAttribute('class', 'cf-question__instruction');
			if(question.instruction) {
				instructionDiv.innerHTML = question.instruction;
			}

			let errorDiv = document.createElement('div');
			errorDiv.setAttribute('id', question.id + '_error');
			errorDiv.setAttribute('class', 'cf-question__error cf-error-block cf-error-block--bottom cf-error-block--hidden');
			errorDiv.innerHTML = '<ul class="cf-error-list" id="' + question.id + '_error_list"></ul>';

			let containerDiv = document.createElement('div');
			containerDiv.setAttribute('id', question.id + '_content');
			containerDiv.setAttribute('class', 'cf-question__content');

			let questionContainer = document.getElementById(question.id);

			questionContainer.appendChild(textDiv);
			questionContainer.appendChild(instructionDiv);
			questionContainer.appendChild(errorDiv);
			questionContainer.appendChild(containerDiv);

			question.validationEvent.on(showValidationResultMessages);

			function showValidationResultMessages (validationResult) {
				let questionElement = document.querySelector('#' + question.id);
				let errorList;
				try {
					errorList = questionElement.getElementsByClassName("cf-error-list")[0];
				}
				catch (e) {
					console.log("Could not find error list element");
					return;
				}
				clearErrorList(errorList);

				let errorsCount = validationResult.errors.length;
				if(errorsCount > 0) {
					errorList.parentElement.classList.remove("cf-error-block--hidden");
					for(let i = 0; i < validationResult.errors.length; i++) {
						let errorItem = createErrorListItem(validationResult.errors[i].message);
						errorList.appendChild(errorItem);
					}
				}
			}

			function clearErrorList(errorList) {
				let errorLiElement = errorList.lastElementChild;
				while (errorLiElement) {
					errorList.removeChild(errorLiElement);
					errorLiElement = errorList.lastElementChild;
				}
				errorList.parentElement.classList.add("cf-error-block--hidden");
			}

			function createErrorListItem(message) {
				let item = document.createElement('li');
				item.className += "cf-error-list__item";
				item.innerText = message;

				return item;
			}

			let sliderComponent = new customQuestionsLibrary.SliderOpenComponent(question, questionViewSettings, sliderSettings, containerDiv);
		}
	);
})();
