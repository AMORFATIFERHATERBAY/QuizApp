// function Question(text, choises, answer) {
//     (this.text = text), (this.choises = choises), (this.answer = answer);
// }

let Questions = function (text, choises, answer) {
  (this.text = text), (this.choises = choises), (this.answer = answer);
};

Questions.prototype.checkAnswer = function (answer) {
  return this.answer === answer;
};

let q1 = new Questions(
  "What is the most popular web scripting language used for both client-side and server-side development?",
  ["C#", "Javascript", "Phyton", "Java"],
  "Javascript"
);
let q2 = new Questions(
  'For which of the following languages ​​was ".NET Framework" developed by Microsoft?',
  ["Javascript", "C#", "Phyton", "Java"],
  "C#"
);
let q3 = new Questions(
  "Which programming language was released by Sun Microsystems in 1995?",
  ["C#", "Javascript", "Phyton", "Java"],
  "Java"
);

console.log(q1.checkAnswer("Javascript"));
console.log(q2.checkAnswer("C#"));
console.log(q3.checkAnswer("Java"));

let questions = [q1, q2, q3];

// function Quiz(questions) {
//   (this.questions = questions), (this.score = 0), (this.questionIndex = 0);
// }

let Quiz = function (questions) {
  (this.questions = questions),
    (this.score = 0),
    (this.questionIndex = 0),
    (this.isCorrect = false);
};

Quiz.prototype.getQuestion = function () {
  return this.questions[this.questionIndex];
};

Quiz.prototype.isFinish = function () {
  return this.questions.length === this.questionIndex;
};

Quiz.prototype.guess = function (answer) {
  let question = this.getQuestion();
  if (question.checkAnswer(answer)) {
    this.score++;
    this.isCorrect = true;
  }
  this.questionIndex++;
};

// Start Quiz

var quiz = new Quiz(questions);

loadQuestion();

function loadQuestion() {
  quiz.isCorrect = false;
  if (quiz.isFinish()) {
    showScore();
  } else {
    let question = quiz.getQuestion();
    let choises = question.choises;
    document.querySelector("#question").textContent = question.text;

    for (let i = 0; i < choises.length; i++) {
      let element = document.querySelector("#choise" + i);
      element.textContent = choises[i];

      guess("btn" + i, choises[i]);
    }
    showProgress();
  }
}

function guess(id, answer) {
  let btn = document.getElementById(id);
  btn.onclick = function () {
    quiz.guess(answer);
    if (quiz.isCorrect) {
      swal({
        title: "Good job",
        text: "Congratulations",
        icon: "success",
        button: "Continue!",
      }).then(function () {
        this.loadQuestion();
      });
    } else {
      swal({
        title: "Sorry!",
        text: "You Answered Wrong!",
        icon: "warning",
        button: "Continue!",
      }).then(function () {
        loadQuestion();
      });
    }
    //loadQuestion();
  };
}

function showScore() {
  quiz.questionIndex = 0;
  let html = `<h2>Score</h2> <h4>${quiz.score}</h4>`;
  let htmlEx = document.querySelector(".card-body").innerHTML;
  document.querySelector(".card-body").innerHTML = html;
  let btn = document.createElement("button");
  btn.id = "backQuiz";
  btn.className = "btn btn-primary";
  btn.textContent = "Back Quiz";
  document.querySelector(".card-body").appendChild(btn);
  document.getElementById("backQuiz").addEventListener("click", function (e) {
    document.querySelector(".card-body").innerHTML = htmlEx;
    loadQuestion();
    console.log(quiz.questionIndex);
    quiz.score = 0;
  });
}

function showProgress() {
  let totalQues = quiz.questions.length;
  let currentQues = quiz.questionIndex + 1;
  console.log(currentQues);
  document.getElementById("progress").innerHTML =
    "Question " + currentQues + " of " + totalQues;
}
