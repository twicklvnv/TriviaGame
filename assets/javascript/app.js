
$(".startGame").on("click", function() {
	$(this).hide(1000);
	game.loadQuestion();
});

$(document).on("click", ".answer-btn", function(e) {
	game.click(e)
	console.log("button clicked");
})

$(document).on("click", ".reset", function() {
	game.reset();
})

var questions = [{
	question: "Who was the 'Man in Black'?", 
	answers: ["Willie Nelson", "Johnny Cash", "Mel Tillis", 
	"Porter Wagoner"],
	correctAnswer: "Johnny Cash"
	},
 
	{
	question: "Which song was not a hit for Lefty Frizzell?",
	answers: ["Saginaw, Michigan", "Always Late", "Detroit City", 
	"Long, Black Veil"], 
	correctAnswer: "Detroit City"
},

	{
	question: "Who is known as the 'Red Headed Stranger'?", 
	answers: ["Willie Nelson", "Buck Owens", "Charlie Pride", "Waylon Jennings"], 
	correctAnswer: "Willie Nelson"
},

	{ 
	question: "Who got their big break on The Porter Wagoner Show?", 
	answers: ["Patsy Cline", "Marty Robbins", "Charlie Walker", "Dolly Parton"], 
	correctAnswer:"Dolly Parton"
},

	{
	question: "Which is not a Loretta Lynn song?", 
	answers: ["The End of the World", "Coal Miner's Daughter", "Fist City", 
	"The Pill"],
	correctAnswer: "The End of the World"
},

	{ 
	question: "Which of the following was a George Jones hit?", 
	answers: ["The Streets of Baltimore", "A Boy Named Sue", "The Grand Tour", 
	"Crazy"],
	correctAnswer: "The Grand Tour"
},

	{ 
	question: "Who wrote the song 'Sunday Morning Coming Down'?", 
	answers: ["Johnny Cash", "Kris Kristofferson", "Willie Nelson", "Bill Anderson"], 
	correctAnswer: "Kris Kristofferson"
},

	{
	question: "Who sang the duet 'Golden Ring'?", 
	answers: ["Dolly Parton and Porter Wagoner", "Johnny Cash and June Carter Cash", 
	"George Jones and Tammy Wynette", "Conway Twitty and Loretta Lynn"], 
	correctAnswer: "George Jones and Tammy Wynette"
},

	{ 
	question: "Whose early hits included 'Sing Me Back Home'?", 
	answers: ["Marty Robbins", "Eddie Arnold", "Merle Haggard", "Buck Owens"],
	correctAnswer: "Merle Haggard"
},

	{
	question: "Who sang the 1952 hit 'The Wild Side of Life'?", 
	answers: ["Hank Thompson", "Hank Williams", "Ray Price", "Faron Young"], 
	correctAnswer:"Hank Thompson"
}];


	

var game = {
	questions:questions,
	currentQuest:0,
	counter:20,
	correctAnswer:0,
	incorrectAnswer:0,
	unanswered:0,

	countdownTime: function() {
		game.counter--;
		$("#time").html(game.counter + " seconds left");
		if (game.counter <= 0) {
			game.timesUp();
		}
	},

	loadQuestion: function() {
		timer = setInterval(game.countdownTime, 1000);
		$("#result").empty();
		$("#question").html(questions[game.currentQuest].question);
		for (var i = 0; i < questions[game.currentQuest].answers.length;
			i++) {
				var a = $("<button>");
				a.addClass("answer-btn btn-primary");
				a.attr("data-name", questions[game.currentQuest].
					answers[i]);
				a.text(questions[game.currentQuest].answers[i]);
				$("#buttons-view").append(a);


		}	
	},

	nextQuestion: function() {
		game.counter = 20;
		$("#time").html(game.counter + " seconds left");
		game.currentQuest++;
		game.loadQuestion();
	},

	results: function () {
		clearInterval(timer);
		$("#result1").html("Game Over");
		$("#result2").html("Correct Answers: " +game.correctAnswer);
		$("#result3").html("Incorrect Answers: " +game.incorrectAnswer);
		$("#result4").html("Unanswered: " +game.unanswered);
		$("#result5").html("<button class='reset btn-primary'>Play Again</button>");
	},


	correct: function() {
		console.log("yep");
		clearInterval(timer);
		game.correctAnswer++;
		$("#result").html("You are correct!");
		if (game.currentQuest==questions.length-1) {
			setTimeout(game.results, 3000);
		} else {
			setTimeout(game.nextQuestion, 3000);
		}
		$("#buttons-view").empty();
	},

	incorrect: function() {
		console.log("nope");
		clearInterval(timer);
		game.incorrectAnswer++;
		$("#result").html("Wrong! The correct answer is " +questions[
			game.currentQuest].correctAnswer);
		if (game.currentQuest==questions.length-1) {
			setTimeout(game.results, 3000);
		} else {
			setTimeout(game.nextQuestion, 3000);
		}
		$("#buttons-view").empty();
	},

	timesUp: function() {
		clearInterval(timer);
		$("#time").html("Time has run out. ");
		game.unanswered++;
		$("#result").html("The correct answer is " +questions[game.
			currentQuest].correctAnswer);
		if (game.currentQuest==questions.length-1){
			setTimeout(game.results, 3000);
		} else {
			setTimeout(game.nextQuestion, 3000);
		}
		$("#buttons-view").empty();
	},

	reset: function() {
		game.currentQuest = 0;
		game.counter = 20;
		game.correct = 0;
		game.incorrect = 0;
		game.unanswered = 0;
		$("#buttons-view").empty();
		$("#result").empty();
		$("#result1").empty();
		$("#result2").empty();
		$("#result3").empty();
		$("#result4").empty();
		$("#result5").empty();
		game.loadQuestion();
	},

	click: function(e) {
		clearInterval(timer);
		if ($(e.target).data("name")==questions[game.currentQuest].
			correctAnswer) {
			game.correct();
		
		} else {
			game.incorrect();
	}

		}
	}

