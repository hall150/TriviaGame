var panel = $('#quiz-area');
var countStartNumber = 45;

//buttons 

$(document).on('click', '#start-over', function(t) {
  game.reset();
});

$(document).on('click', '.answer-button', function(t) {
  game.clicked(t);
});

$(document).on('click', '#start', function(t) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">45</span> Seconds</h2>');
  game.loadQuestion();
});

//questions

var questions = [{
  question: "Tenochtitlan, founded in 1324, is now known as what city?",
  answers: ["  Mexico City", "Tampa", "London", "Lima"],
  correctAnswer: "Mexico City",
}, {

  question: "Located in southern Siberia, what lake is the deepest and largest freshwater lake in the world?",
  answers: ["Lake Taymyr", "Lake Elgygytgyn", "Lake Baikal", "Lake Labynkyr"],
  correctAnswer: "Lake Baikal",
 
 }, { 
  question: "Which actress played the character Annie Reed in the 1993 American romantic comedy Sleepless in Seattle?",
  answers: ["Meg Ryan", "Emma Thompson", "Marisa Tomei", "Miranda Richardson"],
  correctAnswer: "Meg Ryan",

}, { 
  question: "What is the English translation for the name of the German automaker Volkswagen?",
  answers: ["Volkswagen", "Car", "None of the above", "People’s car"],
  correctAnswer: "Volkswagen",
}, {

  question: "In what organ of the body is insulin produced?",
  answers: ["Liver", "Kidney", "Pancreas", "Stomach"],
  correctAnswer: "Pancreas",
}];



var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log("TIME'S UP");
      game.timeUp();
    }
  },
  
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
 
  // if no answer

  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html("<h2>Time's Up! </h2>");
    panel.append('<h3>The Correct Answer is: ' + questions[this.currentQuestion].correctAnswer);

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  // results 

  results: function() {
    clearInterval(timer);

    panel.html('<h2>Final Score</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(t) {
    clearInterval(timer);

    if ($(t.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },

  // answers incorrect/correct

  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Sorry...wrong answer</h2>');
    panel.append('<h3>The Correct Answer is: ' + questions[game.currentQuestion].correctAnswer + '</h3>');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};