//load our external JSON
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://cdn.rawgit.com/kdzwinel/cd08d08002995675f10d065985257416/raw/811ad96a0567648ff858b4f14d0096ba241f28ef/quiz-data.json');
xhr.send(null);

xhr.onreadystatechange = function () {
  var DONE = 4; 
  var OK = 200;
  if (xhr.readyState === DONE) {
    if (xhr.status === OK) {
      displayData();
    } else {
      console.log('Error: ' + xhr.status); // An error occurred during the request.
    }
  }
};

// display JSON Data
function displayData() {
	var res = xhr.responseText;
	var resJSON = JSON.parse(res);

	var quizContent = document.querySelector('.quiz-content');
	var questionsNum = resJSON.questions.length; // 9
    var answersNum;

    // create a list - wrapper for all q&a
	var questionList = document.createElement('ol');
	quizContent.appendChild(questionList);


	// get questions
	for(var i = 0; i < questionsNum; i++) {
		var questionListElem = document.createElement('li');
		var questionText = document.createElement('h3');
		questionText.innerHTML = resJSON.questions[i].question;

		questionListElem.appendChild(questionText);
		questionList.appendChild(questionListElem);

		// get answers
		answersNum = resJSON.questions[i].answers.length; //4
		for(var j = 0; j < answersNum; j++) {
			// create label and input elements for answers
			var label = document.createElement('label');

			var answer = document.createElement('input');
			answer.type = 'radio';
			answer.name = 'q'+[i+1];
			answer.value = 'answer'+[j];

			label.innerHTML = resJSON.questions[i].answers[j].answer;
			label.insertBefore(answer, label.firstChild);
			questionListElem.appendChild(label);


			// var correctAnswer = resJSON.questions[i].answers[j].correct;
			// console.log(correctAnswer);
		}

	}

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

var startButton = document.querySelector('.start-button');

startButton.addEventListener('click', function (e) {
 	e.stopPropagation();

 	startButton.classList.add('hidden');
    var fiveMinutes = 20,
        displayTimer = document.querySelector('.timer'),
        quizContent = document.querySelector('.quiz-content');

    displayTimer.classList.remove('hidden');
    quizContent.classList.remove('hidden');

    startTimer(fiveMinutes, displayTimer);
});

