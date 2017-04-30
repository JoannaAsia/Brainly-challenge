
// xml http request (xhr) - to jest ajax
// https://www.sitepoint.com/guide-vanilla-ajax-without-jquery/

// get ten json

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://cdn.rawgit.com/kdzwinel/cd08d08002995675f10d065985257416/raw/811ad96a0567648ff858b4f14d0096ba241f28ef/quiz-data.json');
xhr.send(null);

xhr.onreadystatechange = function () {
  var DONE = 4; // readyState 4 means the request is done.
  var OK = 200; // status 200 is a successful return.
  if (xhr.readyState === DONE) {
    if (xhr.status === OK) {
    	var response = xhr.responseText;
    	console.log(response);
    	var quizContent = document.querySelector('.quiz-content');
    	quizContent.innerHTML += response;
    	
      // function displayData () {}
    } else {
      console.log('Error: ' + xhr.status); // An error occurred during the request.
    }
  }
};

// displayData --> xhr.responseJSON