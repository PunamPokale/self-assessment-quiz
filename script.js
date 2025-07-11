let currentQuestion = 0;
let score = 0;
let selectedSubject = "";
let questions = [];

function startQuiz() {
  selectedSubject = document.getElementById("subject-select").value;
  if (!selectedSubject) return alert("Please select a subject!");

  questions = quizData[selectedSubject];
  currentQuestion = 0;
  score = 0;

  document.getElementById("quiz-box").classList.remove("hidden");
  document.getElementById("result").classList.add("hidden");
  document.getElementById("subject-select").disabled = true;
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").textContent = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const correct = questions[currentQuestion].answer;
  if (selected === correct) {
    score++;
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz-box").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  const percentage = Math.round((score / questions.length) * 100);
  document.getElementById("score").textContent = percentage;

  let feedback = "";
  if (percentage >= 80) feedback = "✅ Excellent – You're ready for placements!";
  else if (percentage >= 60) feedback = "⚠️ Good – Brush up a few topics.";
  else if (percentage >= 40) feedback = "🚧 Okay – You need to revise basics.";
  else feedback = "❌ Weak – Start revising today.";

  document.getElementById("feedback").textContent = feedback;
}
