var questionNum =0;
 var score =0;

function startQuiz() {
  $('.startQuiz').on('click','.startButton', function (event){
$('.startQuiz').addClass("hidden");
$('.quizForm').removeClass("hidden");
nextQuestion();
  });
}

function generateQuestion(){
var quizQuestion =
`<h1 class="questionTitle">${quizQuestions[questionNum].text}</h1>
<form class= "quizForm">
  <fieldset>
  <legend>${quizQuestions[questionNum].text}</legend>
  `;

for (i=0; i< quizQuestions[questionNum].options.length; i++){ 
  
  quizQuestion += 
  `<label>
      <input class="answer" type="radio" name="option" required>
      </input><span>${quizQuestions[questionNum].options[i]}</span>
    </label>`
    }
    
    quizQuestion +=
    `<button type="submit" role= "button" class="submitButton">Submit</button>
    </fieldset>
</form>
<div class ="scoreBar">
<h3 class="questionCount">Question:${quizQuestions[questionNum].number}/10</h3>
<h3 class="scoreCount">Score:${score}/10</h3>
</div>`

return quizQuestion;
}
function nextQuestion() {
  if (questionNum === 10){
      $('.quizForm').addClass("hidden");
      $('.resultsForm').html(generateQuizEnd());
      }

else {
  $('.quizForm').html(generateQuestion());
}
}

function handleSubmit() {
  $('body').on('click','.submitButton', function(event){
     event.preventDefault();

    let selected = $('input:checked').siblings('span');
    let correctAnswer= `${quizQuestions[questionNum].answer}`;
    
    if ($('input:checked').siblings('span').text()

== ""){
  alert("You must select an answer.");
}
else {
    
    if (selected.text() === correctAnswer) {
      $('.quizForm').addClass("hidden");
      $('.resultsForm').html(generateCorrectFeedback());
      score ++;
    }
    else {
       $('.quizForm').addClass("hidden");
       $('.resultsForm').html(generateIncorrectFeedback());
    }
 
  } 
});
}
function generateCorrectFeedback() {
return `<h1>That's correct! Nicely done, try the next one!</h1>
<button type="submit" role= "button" class="nextButton">Next</button>
`
}

function generateIncorrectFeedback() {
  return `<h1>Sorry, that's incorrect. The answer is <span class ="correct">  ${quizQuestions[questionNum].answer} </span> Try the next one!</h1>
<button type="submit" role= "button" class="nextButton">Next</button>`
}

function generateQuizEnd() {
  return `<h1>Congratulations!</h1>
  <h3>You have completed the quiz with a score of ${score}/10.</h3> 
  <button type="submit" role= "button" class="clearButton">Start Over</button>
  `
}

function handleNext() {
  $('.resultsForm').on('click','.nextButton', function(event){
     event.preventDefault();
    questionNum ++;
    $('.quizForm').removeClass("hidden");
    $('.resultsForm').html('');
    nextQuestion();
  })
}
  function handleClear() {
 $('.resultsForm').on('click','.clearButton', function(event){
     event.preventDefault();
     questionNum =0;
 score =0;
 $('.startQuiz').removeClass("hidden");
 $('.resultsForm').html('');
  })
}
function runQuiz() {
  startQuiz();
  handleSubmit();
  handleNext();
  handleClear();
}

$(runQuiz);