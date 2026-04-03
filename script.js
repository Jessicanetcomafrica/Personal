const params = new URLSearchParams(window.location.search);

const recipient = params.get("to") || "my favorite human";
const sender = params.get("from") || "someone who is completely gone for you";

const questions = [
  {
    prompt: "Quand tu me vois marcher vers toi, ta premiere pensee est probablement...",
    answers: [
      { label: "Oh, here comes trouble.", response: "The best kind of trouble, surely." },
      { label: "Okay, let me try to act normal.", response: "Don't worry, I'm struggling with that too." },
      { label: "She's definitely going to make me laugh.", response: "Guilty as charged. It's my favorite mission." }
    ]
  },
  {
    prompt: "Si nous etions un type de moment precis, nous serions...",
    answers: [
      { label: "An unexpected long weekend.", response: "Rare, exciting and exactly what you needed." },
      { label: "The song you can't stop playing.", response: "Stuck in your head in the best way possible." },
      { label: "A conversation that never actually ends.", response: "The kind where you look at the clock and it's suddenly 2 AM." }
    ]
  },
  {
    prompt: "Sois honnete, quand nous sommes assis ensemble au bureau, le meilleur moment c'est...",
    answers: [
      { label: "Our highly productive 'collaboration' sessions.", response: "By 'collaboration,' I mean us just flirting and doing zero work? Agreed." },
      { label: "Me watching you make financially questionable decisions.", response: "I'm just the supportive audience for your shopping sprees. No regrets." },
      { label: "The fact that I am your favorite office Resource.", response: "Definitely your favourite" }
    ]
  }
];

const poemLines = [
  "Pour une femme qui sait ce qu'elle veut,",
  "Tu es un délice, un éclat, un vœu.",
  "",
  "Que tes rêves les plus fous deviennent réalité,",
  "Portés par ta force et ta volonté.",
  "",
  "Et si dans tes projets, il reste une place,",
  "Je serais ravi que tu penses à moi."
];

const dedicationPill = document.getElementById("dedication-pill");
const questionScreen = document.getElementById("question-screen");
const poemScreen = document.getElementById("poem-screen");
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const answerGrid = document.getElementById("answer-grid");
const answerFeedback = document.getElementById("answer-feedback");
const poemTitle = document.getElementById("poem-title");
const poemBlock = document.getElementById("poem-block");
const signature = document.getElementById("signature");
const copyLinkButton = document.getElementById("copy-link-button");
const restartButton = document.getElementById("restart-button");
const toast = document.getElementById("toast");

let currentQuestion = 0;

dedicationPill.textContent = `For ${recipient}`;
poemTitle.textContent = `for ${recipient}`;
signature.textContent = `Love, ${sender}`;
poemBlock.textContent = poemLines.join("\n");

function renderQuestion() {
  const question = questions[currentQuestion];

  questionNumber.textContent = String(currentQuestion + 1);
  questionText.textContent = question.prompt;
  answerFeedback.textContent = "";
  answerGrid.innerHTML = "";

  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.textContent = answer.label;
    button.addEventListener("click", () => handleAnswer(answer.response));
    answerGrid.appendChild(button);
  });
}

function handleAnswer(response) {
  answerFeedback.textContent = response;

  window.setTimeout(() => {
    currentQuestion += 1;

    if (currentQuestion < questions.length) {
      renderQuestion();
      return;
    }

    revealPoem();
  }, 900);
}

function revealPoem() {
  questionScreen.classList.add("hidden");
  poemScreen.classList.remove("hidden");
}

function resetExperience() {
  currentQuestion = 0;
  poemScreen.classList.add("hidden");
  questionScreen.classList.remove("hidden");
  renderQuestion();
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    showToast("Link copied. Send it when you're ready.");
  } catch {
    showToast("Copy failed. Just grab the URL from the address bar.");
  }
}

let toastTimeoutId;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimeoutId);
  toastTimeoutId = window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 2200);
}

copyLinkButton.addEventListener("click", copyLink);
restartButton.addEventListener("click", resetExperience);

renderQuestion();