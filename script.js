const quizData = [
    {
        question: "Which of these is NOT a primitive data type in JS?",
        options: ["String", "Number", "Object", "Boolean"],
        correct: 2
    },
    {
        question: "Which method adds an element to the END of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correct: 0
    },
    {
        question: "What is the result of '2' + 2?",
        options: ["4", "22", "undefined", "Error"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');

function loadQuestion() {
    resetState();
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(button);
    });
}

function resetState() {
    nextBtn.style.display = 'none';
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function selectAnswer(index) {
    const correctIndex = quizData[currentQuestionIndex].correct;
    const buttons = document.querySelectorAll('.option-btn');
    
    if (index === correctIndex) {
        score++;
        buttons[index].style.background = "#28a745"; // Green for correct
    } else {
        buttons[index].style.background = "#dc3545"; // Red for wrong
        buttons[correctIndex].style.background = "#28a745";
    }

    // Disable all buttons after selection
    buttons.forEach(btn => btn.disabled = true);
    nextBtn.style.display = 'block';
}

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    document.getElementById('question-area').innerHTML = `
        <div class="score-screen">
            Quiz Complete!<br>
            Your Score: ${score} / ${quizData.length}
        </div>
        <button onclick="location.reload()" class="option-btn" style="margin-top:20px; background:#007bff">Restart</button>
    `;
    nextBtn.style.display = 'none';
}

// Start
loadQuestion();
