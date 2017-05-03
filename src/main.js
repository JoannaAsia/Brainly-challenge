'use strict';

//load the external JSON
var xhr = new XMLHttpRequest(),
	urlJSON = 'https://cdn.rawgit.com/kdzwinel/cd08d08002995675f10d065985257416/raw/811ad96a0567648ff858b4f14d0096ba241f28ef/quiz-data.json';

xhr.open('GET', urlJSON);
xhr.send(null);

xhr.onreadystatechange = function () {
	var DONE = 4; 
    var OK = 200;
  		if (xhr.readyState === DONE) {
    		if (xhr.status === OK) {
      			openQuiz();
    	} else {
      		console.log('Error: ' + xhr.status);
    	}
  	}
};

// create a start quiz function
function openQuiz() {
	var startButton = document.querySelector('.start-btn');

	startButton.addEventListener('click', function() {
		var goodLuck = document.createElement('p');
		goodLuck.classList.add('good-luck');
		goodLuck.innerHTML = "POWODZENIA :-)";

 		startButton.classList.add('main-content--hidden');

    	var quizTime = 300, 
        	displayTimer = document.querySelector('.timer'),
        	quizContent = document.querySelector('.quiz');

    	displayTimer.classList.remove('main-content--hidden');
    	quizContent.classList.remove('main-content--hidden');

        quizContent.appendChild(goodLuck);

    	var intervalId = startTimer(quizTime, displayTimer);
    	displayData();
    	submitQuiz(intervalId);
	});
}

// create a function to submit the quiz
function submitQuiz(intervalId) {
    var quizContent = document.querySelector('.quiz'),
    	timer = document.querySelector('.timer');
	// create a submit button
	var submitButton = document.createElement('button');
	submitButton.setAttribute('type', 'submit');
	submitButton.setAttribute('class', 'quiz__btn sg-button-primary');
	submitButton.innerHTML = 'Zatwierdź';
	quizContent.appendChild(submitButton);

	submitButton.addEventListener('click', function() {
		//timer.classList.add('main-content--hidden');
		stopTimer(intervalId);
		submitButton.classList.add('sg-button-primary--disabled');
		evaluateScore();
		disableQuiz();
	});
}

// create a function that makes quize non inteactive
function disableQuiz() {
	var allAnswers = document.querySelectorAll('input[type=radio]'),
	    quizContent = document.querySelector('.quiz__list');

	for(var l = 0; l < allAnswers.length; l++) {
		allAnswers[l].disabled = true;
	}
	quizContent.classList.add('disabled');
}

// create a function that gets all selected answers
function evaluateScore() {
	var allAnswers = document.querySelectorAll('input[type=radio]'),
		score = 0;

	for(var k = 0; k < allAnswers.length; k++) {
		if(allAnswers[k].checked) {
			if(allAnswers[k].value == "true") {
				score++;
			}
		}
	}
	// create feedback for the user
	var evaluation = document.createElement('footer'),
	    displayScore = document.createElement('h2'),
	    displayScoreDesc = document.createElement('p');

	evaluation.classList.add('quiz__score');

	displayScore.innerHTML = score + '/9';

	if(score < 4) {
		displayScoreDesc.innerHTML = '...czas zabrać się do pracy!';
	}
	if(score >= 4) {
		displayScoreDesc.innerHTML = 'Całkiem nieźle mistrzu, ale stać Cię na więcej!';
	}
	if(score > 7) {
		displayScoreDesc.innerHTML = 'Świetna robota! Gratulacje :-)';
	}

	var mainContent = document.getElementById('main-content');
	mainContent.appendChild(evaluation);
	evaluation.appendChild(displayScore);
	evaluation.appendChild(displayScoreDesc);
}

// display JSON Data in HTML
function displayData() {
	var res = xhr.responseText,
	    resJSON = JSON.parse(res),
        quizContent = document.querySelector('.quiz'),
		questions = resJSON.questions,
	    questionsNum = questions.length, 
        answersNum;

    // create a list - wrapper for all q&a
	var questionList = document.createElement('ol');
	questionList.setAttribute('class', 'quiz__list sg-toplayer sg-toplayer--medium')
	quizContent.appendChild(questionList);

	// display questions
	for(var i = 0; i < questionsNum; i++) {
		var questionListElem = document.createElement('li');
		questionListElem.classList.add('quiz__list-item')
		var questionText = document.createElement('p');
		questionText.classList.add('quiz__list-item-text');
		questionText.innerHTML = questions[i].question;

		questionListElem.appendChild(questionText);
		questionList.appendChild(questionListElem);

		// display answers
		answersNum = questions[i].answers.length; //4
		for(var j = 0; j < answersNum; j++) {
			var inputValue = questions[i].answers[j].correct;

			// create label and input elements for answers
			var label = document.createElement('label');
			label.classList.add('quiz__label');
			var input = document.createElement('input');
			input.classList.add('quiz__input');
			input.type = 'radio';
			input.name = 'q'+[i+1];
			input.value = inputValue;

			label.innerHTML = questions[i].answers[j].answer;
			label.insertBefore(input, label.firstChild);
			questionListElem.appendChild(label);
		}
	}
}

// create a timer function
function startTimer(duration, displayTimer) {
    var minutes, 
        seconds;

    var intervalId = setInterval(function () {
        minutes = parseInt(duration / 60, 10);
        seconds = parseInt(duration % 60, 10)
        seconds = seconds < 10 ? "0" + seconds : seconds;
        displayTimer.textContent = minutes + ":" + seconds;

        if (--duration < 0) {
        	stopTimer(intervalId);
    	}
    }, 1000);

    return  intervalId;
}

// create a stop timer function
function stopTimer(interval) {
	clearInterval(interval);
};
