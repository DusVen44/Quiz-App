//Set beginning question and score numbers to 0
let currentQuestion = 0;
let currentScore = 0;

//Function to begin the quiz when button is clicked
function startQuiz() {
    $(".start-page").on("click", ".start-button", function(event) {
        $(".start-page").hide();
        nextQuestion();
    });
}

//Update Current Question Number
function updateCurrentQuestionNumber() {
    $(".question-number").text(`Current Question: ${currentQuestion+1}/${STORE.length}`);
}

//Update Current Score Number
function updateCurrentScoreNumber() {
    currentScore++
    $(".score-number").text(`Current Score: ${currentScore}`);
}

//Function to update options on each question page
function nextOptions() {
    let choices = STORE[currentQuestion].options;
    for (i=0; i<choices.length; i++) {
        $(".options").append(`<label for="option${i+1}"><input type="radio" name="options"
        id="option${i+1}" class="optionChosen" value="${choices[i]}" required>
        ${choices[i]}</label><br>`);
    };
}

//Function to generate a question
function nextQuestion() {
    let question = STORE[currentQuestion].question;
    let newQuestionHtml = $(`<fieldset class="question-field">
    <p>${question}</p>
    <div class="options"></div>
    <button class="answer-button" type="submit">Submit Answer
    </button>
    <button class="next-button" type="button">Next >>
    </button>
    </fieldset>`)
    $("form").html(newQuestionHtml);
    nextOptions();//will be inserted between div tags with class of "options"
    $(".next-button").hide();
    updateCurrentQuestionNumber();
}

//Function to submit answer, display correct or wrong, and show "Next" button
function submitAnswer() {
    $("body").on("submit", function(event) {
        event.preventDefault();
        $("input").attr("disabled", true);
        $(".answer-button").hide();
        let chosen = $(".optionChosen:checked").val();
        let correctAnswer = STORE[currentQuestion].answer;
        if (chosen === correctAnswer) {
            updateCurrentScoreNumber();
            $(".question-field").append("Correct!");
        } else if (chosen != correctAnswer) {
            $(".question-field").append("Wrong!");
        } else {
            alert("Must choose an option!");
        };
        $(".next-button").show();
        });
}

//Function to make the "Next Question" button work
function goToNextQuestion() {
     $("form").on("click", ".next-button", function() {
         STORE[currentQuestion++];
         if (currentQuestion < STORE.length) {
             nextQuestion();
         } else {
             showResults();
         }
     });
     }

//Function for the Results Page and Restart Button
function showResults() {
    $("fieldset").hide();
    let resultsPage = $(`<div class="results"><p>Final Result</p>
    <p>Your Score Is...</p>
    <p>${currentScore}/${STORE.length}</p>
    <button type="button" class="restart-button">Restart Quiz</button>
    </div>`);
    $("form").html(resultsPage);
    currentQuestion = 0
    $("h2").hide();
}

//Function to make Restart Button work
function restartQuiz() {
    $("form").on("click", ".restart-button", function() {
        location.reload(true);
    });
}


console.log(STORE);
console.log(STORE.length);
console.log(STORE[currentQuestion]);
console.log(STORE[currentQuestion].question);
console.log(STORE[currentQuestion].options);
console.log(STORE[currentQuestion].answer);

startQuiz();
submitAnswer();
goToNextQuestion();
restartQuiz();