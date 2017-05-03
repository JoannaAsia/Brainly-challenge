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
	var startButton = document.querySelector('.main-content__start-btn');

	startButton.addEventListener('click', function() {
 	startButton.classList.add('main-content--hidden');

    var quizTime = 300, 
        displayTimer = document.querySelector('.main-content__timer'),
        quizContent = document.querySelector('.main-content__quiz');

    displayTimer.classList.remove('main-content--hidden');
    quizContent.classList.remove('main-content--hidden');

    // call all needed functions
    startTimer(quizTime, displayTimer);
    displayData();
    submitQuiz();
	});
}

// create a submit quiz function
function submitQuiz() {
    var quizContent = document.querySelector('.main-content__quiz')
	// create a submit button
	var submitButton = document.createElement('button');
	submitButton.setAttribute('type', 'submit');
	submitButton.innerHTML = 'Submit';
	quizContent.appendChild(submitButton);

	submitButton.addEventListener('click', function() {
		evaluateScore();
		submitButton.classList.add('main-content--hidden');
	});
}

// create  a function that gets all selected answers
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


	displayScore.innerHTML = score + '/9';

	if(score < 4) {
		displayScoreDesc.innerHTML = 'Nie masz co się wstydzić... czas zabrać się do pracy!';
	}
	if(score >= 4) {
		displayScoreDesc.innerHTML = 'Całkiem nieźle mistrzu, ale stać Cię na więcej!';
	}
	if(score > 7) {
		displayScoreDesc.innerHTML = 'Świetna robota!!!';
	}

	var mainContent = document.getElementById('main-content');
	mainContent.appendChild(evaluation);
	evaluation.appendChild(displayScore);
	evaluation.appendChild(displayScoreDesc);
}

// display JSON Data
function displayData() {
	var res = xhr.responseText,
	    resJSON = JSON.parse(res),
        quizContent = document.querySelector('.main-content__quiz'),
		questions = resJSON.questions,
	    questionsNum = questions.length, 
        answersNum;


    // create a list - wrapper for all q&a
	var questionList = document.createElement('ol');
	questionList.setAttribute('class', 'main-content__quiz__list sg-toplayer sg-toplayer--medium')
	quizContent.appendChild(questionList);

	// display questions
	for(var i = 0; i < questionsNum; i++) {
		var questionListElem = document.createElement('li');
		var questionText = document.createElement('p');
		questionText.innerHTML = questions[i].question;

		questionListElem.appendChild(questionText);
		questionList.appendChild(questionListElem);

		// display answers
		answersNum = questions[i].answers.length; //4
		for(var j = 0; j < answersNum; j++) {
			var inputValue = questions[i].answers[j].correct;

			// create label and input elements for answers
			var label = document.createElement('label');
			var input = document.createElement('input');
			input.classList.add('main-content__quiz__input');
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
        displayTimer.textContent = 'Your time is up!!!';
        stopTimer(intervalId);
    }

    }, 1000);
}

function stopTimer(interval) {
	clearInterval(interval);
};

