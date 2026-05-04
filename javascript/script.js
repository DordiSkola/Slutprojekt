function calculate() {
  let input = document.getElementById("calcInput").value;
  try {
    let result = eval(input);
    document.getElementById("result").innerText = "Svar: " + result;
  } catch {
    document.getElementById("result").innerText = "Ogiltigt uttryck";
  }
}

const frågaContainer = document.getElementById("fråga-container");
const frågaElement = document.getElementById("fråga");
const svarButtons = document.getElementById("svar-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const svarDiv = document.getElementById("svar");

let shuffledQuestions, currentQuestionIndex, score;

const frågor = [
    {
        fråga: "Vad är 2 + 2?",
        svar: [
            {text:"4", correct:true},
            {text:"22", correct:false},
            {text:"8", correct:false},
            {text:"6", correct:false},
        ],
    },
    {
        fråga: "Vad är 6/10?",
        svar: [
            {text:"0.24", correct:false},
            {text:"0.6", correct:true},
            {text:"6", correct:false},
            {text:"2.4", correct:false},
        ],
    },
    {
        fråga: "Vad är 444-243?",
        svar: [
            {text:"211", correct:false},
            {text:"234", correct:false},
            {text:"202", correct:false},
            {text:"201", correct:true},
        ],
    },
    {
        fråga: "Vad är 2211+678?",
        svar: [
            {text:"2288", correct:false},
            {text:"2299", correct:false},
            {text:"2889", correct:true},
            {text:"2789", correct:false},
        ],
    },
    {
        fråga: "Vad är 45x5?",
        svar: [
            {text:"560", correct:false},
            {text:"134", correct:false},
            {text:"225", correct:true},
            {text:"122", correct:false},
        ],
    },
];

function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(fråga){
    frågaElement.innerText = fråga.fråga;
    fråga.svar.forEach((answer, index)=>{
        const inputGroup = document.createElement("div");
        inputGroup.classList.add("input-group");

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.id = "svar" + index;
        radio.name = "svar";
        radio.value = index;

        const label = document.createElement("label");
        label.htmlFor = "svar" + index;
        label.innerText = answer.text;

        inputGroup.appendChild(radio);
        inputGroup.appendChild(label);
        svarButtons.appendChild(inputGroup);
    })
}

function resetState(){
    while (svarButtons.firstChild){
        svarButtons.removeChild(svarButtons.firstChild);
    }
}

function startQuiz(){
    score = 0;
    frågaContainer.style.display = "flex";
    shuffledQuestions = frågor.sort(()=> Math.random() - 0.5);
    currentQuestionIndex = 0;
    nextButton.classList.remove("hide");
    restartButton.classList.add("hide");
    svarDiv.classList.add("hide");
    setNextQuestion();
}

startQuiz();

nextButton.addEventListener("click", () => {
    const svarIndex = Array.from(
    svarButtons.querySelectorAll("input")
    ).findIndex((radio) => radio.checked);
    if(svarIndex !== -1){
        if(shuffledQuestions[currentQuestionIndex].svar[svarIndex].correct){
            score++;
        }
        currentQuestionIndex++;
        if(shuffledQuestions.length > currentQuestionIndex) {
            setNextQuestion();
        } else{
            endQuiz();
        }
    } else {
        alert("Tryck på en av knapparna för att svara.");
    }
});

restartButton.addEventListener("click", startQuiz);

function endQuiz(){
    frågaContainer.style.display = "none";
    nextButton.classList.add("hide");
    restartButton.classList.remove("hide");
    svarDiv.classList.remove("hide");
    svarDiv.innerText = `Din slutliga resultat: ${score} /${shuffledQuestions.length}`
}