var questionImgArr = [];
var imgArr = [
			{'url': '1.webp', 'answer': 'a'}, 
			{'url': '2.webp', 'answer': 'b'},
			{'url': '3.webp', 'answer': 'a'},
			{'url': '4.webp', 'answer': 'b'},
			{'url': '5.webp', 'answer': 'a'},
			{'url': '6.webp', 'answer': 'a'},
			{'url': '7.webp', 'answer': 'b'},
			{'url': '8.webp', 'answer': 'b'},
			{'url': '9.webp', 'answer': 'a'},
			{'url': '10.webp', 'answer': 'a'}];
var randomImgArr = shuffle(imgArr);
var start = window.localStorage.getItem('start');
var save = window.localStorage.getItem('save');
var skipData = window.localStorage.getItem('skip-data');

if (start == null) {
	window.localStorage.setItem('questionImgas', JSON.stringify(randomImgArr));
	window.localStorage.setItem('process', 0);
	window.localStorage.setItem('count', 0);
	window.localStorage.setItem('rightAnswerCount', 0);
	window.localStorage.setItem('wrongAnswerCount', 0);
	window.localStorage.setItem('save', false);
	window.localStorage.setItem('skip-data', false);
	questionImgArr = randomImgArr;
} else {
  questionImgArr = JSON.parse(window.localStorage.getItem('questionImgas'));
}
if (save == 'false'  && window.localStorage.getItem('count') == 10) {
	skip();
	$('#question-image').hide();
	$('#answer-btn').css('display', 'none');
} else if (save == 'true' && window.localStorage.getItem('count') == 10) {
	if (skipData == 'true') {
		skip();
		$('#question-image').hide();
		$('#answer-btn').css('display', 'none');
	} else {
		$('#question-image').hide();
		$('#answer-btn').css('display', 'none');
		$('.user-info').show();
	}
}

if(Number(window.localStorage.getItem('count')) == 10) {
	$('#question-image').attr('src', 'imgs/' + questionImgArr[Number(window.localStorage.getItem('count')) - 1].url);
} else {
	$('#question-image').attr('src', 'imgs/' + questionImgArr[Number(window.localStorage.getItem('count'))].url);
}

function nextAnswer (val) {
	var count = Number(window.localStorage.getItem('count'))+1;
	var rightAnswerCount = Number(window.localStorage.getItem('rightAnswerCount'));
	var wrongAnswerCount = Number(window.localStorage.getItem('wrongAnswerCount'));

	process = 10*count;
	window.localStorage.setItem('count', count);
	window.localStorage.setItem('process', process);
	var _process = window.localStorage.getItem('process');

	if (count == 1) {
		window.localStorage.setItem('start', 'OK');
	}
	if(count == 10) {
		window.localStorage.setItem('save', true);
		$('#question-image').hide();
		$('#answer-btn').css('display', 'none');
		$('.user-info').show();
	} else {
		$('#question-image').attr('src', 'imgs/' + questionImgArr[count].url);
		$('#question-image').hide();
		$('#question-image').fadeIn(1000);
	}

	$('.progress-bar').css('width', _process + '%');
	$('.progress-bar').text(_process + "%");
	if (questionImgArr[Number(window.localStorage.getItem('count'))-1].answer == val) {
		
		window.localStorage.setItem('rightAnswerCount', rightAnswerCount +1);
	} else {
		window.localStorage.setItem('wrongAnswerCount', wrongAnswerCount +1);;
	}

	$('.result').text("(Correct answers: " + window.localStorage.getItem('rightAnswerCount') + ", Incorrect answers: " + window.localStorage.getItem('wrongAnswerCount') + ")");
}

$(function() {
	var _process = window.localStorage.getItem('process');
	$('.progress-bar').css('width', _process + "%");
	$('.progress-bar').text(_process + "%");
	if(window.localStorage.getItem('count') != 0) {
		$('.result').text("(Correct answers: " + window.localStorage.getItem('rightAnswerCount') + ", Incorrect answers: " + window.localStorage.getItem('wrongAnswerCount') + ")");		
	}

})



function saveData() {
	var rightAnswerCount = window.localStorage.getItem('rightAnswerCount');
	var wrongAnswerCount = window.localStorage.getItem('wrongAnswerCount');
	
	var firstName = $("#first-name").val();
	var lastName = $("#last-name").val();
	var msg = "Correct answers : " + rightAnswerCount + " and incorrect answers : " + wrongAnswerCount;
	var percent = "";

	if(rightAnswerCount == 10) {
		percent = "100% in answers are right (EXCELLENT!)";
	} else {
		percent = rightAnswerCount * 10 + "% in asnwers is right (TRY AGAIN!)" ;
	}

	if (!firstName || !lastName) {
		alert("Please fill data");
		return false;
	}
	var data = "First name: " + firstName + "\n" +
						 "Last name: " + lastName + "\n" + 
						 "Number of questions: 10" + "\n" +
						 msg + "\n" + 
						 percent;

	var a = document.createElement('a');
	a.href = "data:application/octet-stream,"+encodeURIComponent(data);
	a.download = 'result.txt';
	a.click();
}

function skip () {
	window.localStorage.setItem('skip-data', true);
	var rightAnswerCount = window.localStorage.getItem('rightAnswerCount');
	var wrongAnswerCount = window.localStorage.getItem('wrongAnswerCount');
	var lsmsg = "";
	if (rightAnswerCount == 10) {
		lsmsg = "<h2 class='text-danger'>CONGRATLATIONS!</h2> <h4>All answers are right!</h4><button class='btn btn-danger'>Continue</button>";
	} else {
		lsmsg = "<h3 class='text-primary'>" + rightAnswerCount * 10 + "% in asnwers is right (TRY AGAIN!)</h2><button class='btn btn-danger' onclick='window.localStorage.clear();location.reload()'>Retry</button>"
	}

	msg = "<h3> Number of questions: 10</h3>" +
				"<h4> Correct answers: <font class='text-danger'>" + rightAnswerCount +"</font> and incorrect answers: <font class='text-primary'>" + wrongAnswerCount + "</font>" + 
				lsmsg;
	$('.user-info').hide();
	$('.progress-part').hide();
	$('#result-panel').html(msg);

}
