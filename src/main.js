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
      displayData();
      findAllInputs();
    } else {
      console.log('Error: ' + xhr.status);
    }
  }
};

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
			// create label and input elements for answers
			var label = document.createElement('label');

			var input = document.createElement('input');
			input.type = 'radio';
			input.name = 'q'+[i+1];
			input.value = input.name+'answer'+[j+1];

			label.innerHTML = questions[i].answers[j].answer;
			label.insertBefore(input, label.firstChild);
			questionListElem.appendChild(label);
		}

	}

	// create a submit button
	var submitButton = document.createElement('button');
	submitButton.setAttribute('type', 'submit');
	submitButton.innerHTML = 'Submit';
	quizContent.appendChild(submitButton);

}

// create a timer
function startTimer(duration, displayTimer) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        
        seconds = seconds < 10 ? "0" + seconds : seconds;


        displayTimer.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            displayTimer.textContent = 'Your time is up!!!';
        }
    }, 1000);
}
// create a start button
var startButton = document.querySelector('.start-button');

startButton.addEventListener('click', function (e) {
 	e.stopPropagation();
 	startButton.classList.add('hidden');

    var fiveMinutes = 300, 
        displayTimer = document.querySelector('.timer'),
        quizContent = document.querySelector('.quiz-content');

    displayTimer.classList.remove('hidden');
    quizContent.classList.remove('hidden');

    startTimer(fiveMinutes, displayTimer);
});


// find all inputs
function findAllInputs() {
	var allInputs = document.querySelectorAll('input[type=radio]');

	for(var k = 0; k <allInputs.length; k++) {
		console.log(allInputs[k]);
		allInputs[k].addEventListener('click', function() {
			
			console.log(allInputs[k]);

			// why undefined???
		});
	}
}




