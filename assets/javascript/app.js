
$(document).ready(function(){
	
var triviaGame = {


	qAndA:[{
		question: "How many Pokémon can Evee evolve into?",
			ans1: "1",
			ans2: "6",
			ans3: "3",
			ans4: "8",
			imgUrl: "./assets/images/evee.png"},
	   {
	   	question: "How many types of Pokémon exist?",
			ans1: "5",
			ans2: "20",
			ans3: "18",
			ans4: "10",
			imgUrl: "./assets/images/types.jpg"},
		{
	   	question: "Which Pokémon was the first Pokémon ever created?",
			ans1: "Rhydon",
			ans2: "Mew",
			ans3: "Buldbasuar",
			ans4: "Pikachu",
			imgUrl: "./assets/images/rhydon.jpg"},
	   {
	   	question: "Which Pokémon is the tallest Pokémon in the game?",
			ans1: "Wailord",
			ans2: "Mega Rayquaza",
			ans3: "Mega Steelix",
			ans4: "Pikachu",
			imgUrl: "./assets/images/wailord.jpg"},
		{
		question: "Which Pokémon is the heavist Pokemon?",
		    ans1: "Mega Metagross",
		    ans2: "Mega Steelix",
		    ans3: "Mega Aggron",
		    ans4: "Mega Groudon",
			imgUrl: "./assets/images/groudon.jpg"}],

	correctAnswers: ['8', '18', 'Rhydon', 'Wailord', 'Mega Groudon'],
	userAnswers: [],

	questionCount: 0,
	beginInt: 0,

	timer: 30,
	btnClicked: false,
	numberCorrect: 0,
	numberIncorrect: 0,
	numberUnAnswered: 0,

	beginGame: function(){
		if(triviaGame.questionCount == triviaGame.qAndA.length){

			triviaGame.gameFinished();
			triviaGame.timer = 30;

		} else {

			if(triviaGame.questionCount >= 1){
				clearInterval(triviaGame.displayNextInt);
				$('#gameStart').show();
				$('#divAnswers').hide();
				triviaGame.timer = 30;
				$('#time').html(triviaGame.timer);
			}

			$('p.questions').html(triviaGame.qAndA[triviaGame.questionCount].question);
			$('button.answer1').html(triviaGame.qAndA[triviaGame.questionCount].ans1);
			$('button.answer2').html(triviaGame.qAndA[triviaGame.questionCount].ans2);
			$('button.answer3').html(triviaGame.qAndA[triviaGame.questionCount].ans3);
			$('button.answer4').html(triviaGame.qAndA[triviaGame.questionCount].ans4);

			triviaGame.beginInt = setInterval(triviaGame.countDown, 1000);

		}

	},

	countDown: function(){

		triviaGame.timer--;
		$('#time').html(triviaGame.timer);

		if(triviaGame.timer == 0){

			triviaGame.oufOfTime();

		} else if(triviaGame.btnClicked == true && triviaGame.correctAnswers[triviaGame.questionCount] == triviaGame.userAnswers[triviaGame.questionCount]){
		
			triviaGame.answersCorrect();
			

		} else if(triviaGame.btnClicked == true && triviaGame.correctAnswers[triviaGame.questionCount] != triviaGame.userAnswers[triviaGame.questionCount]){

			triviaGame.answersWrong();
			
		}

	},

	answersCorrect: function(){

		if(newImg != ""){

			$('#pic').empty();
		}

		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#outOfTime').hide();
		$('#wrongMsg').hide();	
		$('#correctMsg').show();
		$('#pCorrectAnswer').hide();	
		$('#answers').css('display', 'block');
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(triviaGame.timer);

		clearInterval(triviaGame.beginInt);

		var newImg = $("<img>").attr('src', triviaGame.qAndA[triviaGame.questionCount].imgUrl).attr('width', '130px','height', '130px').attr('id', 'correctMovieImage');

		$('#pic').append(newImg);		
		triviaGame.btnClicked = false;

		triviaGame.displayNextInt = setInterval(triviaGame.beginGame, 3000);
		triviaGame.numberCorrect++;
		triviaGame.questionCount++;
	},

	answersWrong: function(){

		if(newImg != ""){

			$('#pic').empty();
		}

		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#outOfTime').hide();
		$('#wrongMsg').show();
		$('#correctMsg').hide();
		$('#pCorrectAnswer').show();
		$('#pCorrectAnswer span').html(triviaGame.correctAnswers[triviaGame.questionCount]);
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(triviaGame.timer);
		clearInterval(triviaGame.beginInt);

		var newImg = $("<img>").attr('src', triviaGame.qAndA[triviaGame.questionCount].imgUrl).attr('width', '115px').attr('id', 'correctMovieImage');

		$('#pic').append(newImg);

		triviaGame.btnClicked = false;
		triviaGame.displayNextInt = setInterval(triviaGame.beginGame, 5000);
		triviaGame.numberIncorrect++;
		triviaGame.questionCount++;
	},
 
	oufOfTime: function(){

		if(newImg != ""){

			$('#pic').empty();
		}

		triviaGame.userAnswers.push(""); 
		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#pCorrectAnswer span').html(triviaGame.correctAnswers[triviaGame.questionCount]);
		$('#pCorrectAnswer').show();
		$('#correctMsg').hide();
		$('#wrongMsg').hide();		
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(triviaGame.timer);	
		clearInterval(triviaGame.beginInt);
		var newImg = $("<img>").attr('src', triviaGame.qAndA[triviaGame.questionCount].imgUrl).attr('width', '115px').attr('id', 'correctMovieImage');

		$('#pic').append(newImg);

		triviaGame.numberUnAnswered++;

		triviaGame.displayNextInt = setInterval(triviaGame.beginGame, 5000);

		triviaGame.questionCount++;	

	},

	restart: function(){

		triviaGame.questionCount = 0;
		triviaGame.userAnswers.length = 0;
		$('#time').html("30");

		triviaGame.beginGame();
		$('#gameStart').show();
		$('#gameComplete').hide();
		$('#restartPlaceholder').css('display', 'none');
		clearInterval(triviaGame.displayNextInt);
		$('#elapsedTime').empty();
		triviaGame.numberCorrect = 0;
		triviaGame.numberIncorrect = 0;
		triviaGame.numberUnAnswered = 0;
	},

	gameFinished: function(){

		$('#restartPlaceholder').css('display', 'block');
		$('#divAnswers').hide();
		$('#gameStart').hide();

		$('#gameComplete').css('display', 'block');

		$('#gameOverCorrect span').html(triviaGame.numberCorrect);
		$('#gameOverIncorrect span').html(triviaGame.numberIncorrect);
		$('#unanswered span').html(triviaGame.numberUnAnswered);
		triviaGame.timer = 30;
	}
};



 
	$('#begin').on('click', function(){

		$('div#gameStart').css('display', 'block');
		$('#btnWrapper').css('display', 'none');
		$('.questions').html(triviaGame.beginGame);

	});

	$('.answers').on('click', function(){

		triviaGame.userAnswers.push($(this).text());
		triviaGame.btnClicked = true;

	});

	$('#restartPlaceholder').on('click', function(){

		triviaGame.restart();
		
	});


});