const params = new URLSearchParams(window.location.search);

const recipient = params.get("to") || "my favorite human";
const sender = params.get("from") || "someone who is completely gone for you";

const questions = [
  {
    prompt: "When I see your name pop up, my heart basically...",
    answers: [
      { label: "Runs a soft reboot", response: "Same. Immediate system-wide butterflies." },
      { label: "Starts acting suspiciously adorable", response: "Objectively the correct outcome." },
      { label: "Pretends to stay calm and absolutely fails", response: "A very elegant emotional crash." },
      { label: "Opens twenty imaginary tabs about our future", response: "Romantic overthinking counts as a love language." }
    ]
  },
  {
    prompt: "If we were a coding pattern, we'd be...",
    answers: [
      { label: "A perfect callback", response: "Because every moment with you returns joy." },
      { label: "Two functions with amazing compatibility", response: "Reusable, reliable, and absurdly cute." },
      { label: "A merge with zero conflicts", response: "Rare, suspicious, and deeply beautiful." },
      { label: "The feature nobody knew they needed", response: "And now life makes no sense without it." }
    ]
  },
  {
    prompt: "The official diagnosis for what you do to me is...",
    answers: [
      { label: "Chronic smiling", response: "Side effects include staring at the screen like an idiot." },
      { label: "Emotionally devastating levels of charm", response: "Prognosis: hopelessly devoted." },
      { label: "A complete takeover of my internal monologue", response: "Every thought now has your name in it." },
      { label: "A beautiful bug I never want fixed", response: "This one stays in production forever." }
    ]
  }
];

const poemLines = [
  `const you = "${recipient}";`,
  "",
  "function explainMyHeart() {",
  '  return [',
  '    "If fate were code, I would read every line again",',
  '    "just to find the exact moment it led me to you.",',
  '    "You arrive in my days like light across a dark screen,",',
  '    "softening the sharp parts, making everything glow.",',
  '    "You are the calm in my noise, the poetry in my logic,",',
  '    "the one line I never want to delete or rewrite.",',
  '    "So if you ever wonder what my favorite thing is,",',
  '    `it is still, and will keep being, you.`',
  '  ].join("\\n");',
  "}",
  "",
  "console.log(explainMyHeart());"
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