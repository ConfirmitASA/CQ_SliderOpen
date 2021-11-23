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

			let container = document.getElementById(question.id);

			container.appendChild(textDiv);
			container.appendChild(instructionDiv);
			container.appendChild(errorDiv);

			let sliderComponent = new customQuestionsLibrary.SliderOpenComponent(question, questionViewSettings, sliderSettings);
			// sliderComponent.changeEvent.on(function() {
			// 	console.log(sliderComponent.getSliderValue());
			// });
			//new customQuestionsLibrary.SliderOpenComponent(question, questionViewSettings, sliderSettings);
		}
	);
})();
