const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions;
let currentQuestionIndex;
let score = 0;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  nextQuestion();
});
function startGame() {
  console.log("started");
  score = 0;
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");
  nextQuestion();
}

function nextQuestion() {
  resetState();
  showQuestions(shuffledQuestions[currentQuestionIndex]);
}

function showQuestions(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
    nextButton.innerText = `next`;
  });
}
function resetState() {
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct !== undefined) {
    score += 1;
  }
  Array.from(answerButtonsElement.children).forEach((button) => {
    setBodyClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Game over Click to restart";
    startButton.classList.remove("hide");
    nextButton.innerText = `Your Score is ${score}`;
    nextButton.classList.remove("hide");
  }
}
function setBodyClass(element, correct) {
  clearBodyClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearBodyClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: `What is the name of All-Might's quirk ?`,
    answers: [
      { text: "One for all", correct: true },
      { text: "All for one", correct: false },
      { text: "Hot and cold", correct: false },
      { text: "Hardening", correct: false },
    ],
  },
  {
    question: `What is Katsuki Bakugou's quirk ?`,
    answers: [
      { text: "Fierce Wings", correct: false },
      { text: "Rabbit", correct: false },
      { text: "Explosion", correct: true },
      { text: "Decay", correct: false },
    ],
  },
  {
    question: `The UA student with the quirk hardening is  ?`,
    answers: [
      { text: "Nejire Hado", correct: false },
      { text: "Ochaco Uraraka", correct: false },
      { text: "Eijiro Kirishima", correct: true },
      { text: "Tamaki Amajiki", correct: false },
    ],
  },
  {
    question: `Mirio Togata lost his quirk fighting against  ?`,
    answers: [
      { text: "Kai Chisaki", correct: true },
      { text: "Shin Nemoto", correct: false },
      { text: "Eraser Head", correct: false },
      { text: "Naruto", correct: false },
    ],
  },
  {
    question: `Who is Shoto Todoroki's father  ?`,
    answers: [
      { text: "Eraser Head", correct: false },
      { text: "All Might", correct: false },
      { text: "Endeavor", correct: true },
      { text: "Kurosaki Ichigo", correct: false },
    ],
  },
];
