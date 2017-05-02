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
      startQuiz();
    } else {
      console.log('Error: ' + xhr.status);
    }
  }
};



// create a start button
function startQuiz() {
	var startButton = document.querySelector('.start-button');

	startButton.addEventListener('click', function() {
 	// e.stopPropagation();
 	startButton.classList.add('hidden');

    var fiveMinutes = 300, 
        displayTimer = document.querySelector('.timer'),
        quizContent = document.querySelector('.quiz-content');

    displayTimer.classList.remove('hidden');
    quizContent.classList.remove('hidden');

    startTimer(fiveMinutes, displayTimer);
    displayData();
    submitQuiz();

	});
}


// create a submit quiz function
function submitQuiz() {
    var quizContent = document.querySelector('.quiz-content')
	// create a submit button
	var submitButton = document.createElement('button');
	submitButton.setAttribute('type', 'submit');
	submitButton.innerHTML = 'Submit';
	quizContent.appendChild(submitButton);

	submitButton.addEventListener('click', function() {
		getSelectedAnswers();
	});

	// stop the quiz

	// display a score
}


// create  a function that gets all selected answers
function getSelectedAnswers() {
	var allAnswers = document.querySelectorAll('input[type=radio]'),
		score = 0;

	for(var k = 0; k < allAnswers.length; k++) {
		if(allAnswers[k].checked) {
			// check if answers are correct
			console.log(allAnswers[k].checked); // returns true
			if(allAnswers[k].value == true) {
				score++;
				// todo: this is doesn't work
			}
		}
	}
}



// display JSON Data
function displayData() {
	var res = xhr.responseText,
	    resJSON = JSON.parse(res),
        quizContent = document.querySelector('.quiz-content'),
		questions = resJSON.questions,
	    questionsNum = questions.length, // 9
        answersNum;


    // create a list - wrapper for all q&a
	var questionList = document.createElement('ol');
	quizContent.appendChild(questionList);


	// get questions
	for(var i = 0; i < questionsNum; i++) {
		var questionListElem = document.createElement('li');
		var questionText = document.createElement('p');
		questionText.innerHTML = questions[i].question;

		questionListElem.appendChild(questionText);
		questionList.appendChild(questionListElem);

		// get answers
		answersNum = questions[i].answers.length; //4
		for(var j = 0; j < answersNum; j++) {
			var inputValue = questions[i].answers[j].correct;
			// create label and input elements for answers
			var label = document.createElement('label');
			var input = document.createElement('input');
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

    setInterval(function () {
        minutes = parseInt(duration / 60, 10);
        seconds = parseInt(duration % 60, 10)
        seconds = seconds < 10 ? "0" + seconds : seconds;
        displayTimer.textContent = minutes + ":" + seconds;

        if (--duration < 0) {
            displayTimer.textContent = 'Your time is up!!!';
            return;
        }

    }, 1000);
}




