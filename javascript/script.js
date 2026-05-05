function calculate() {
  let input = document.getElementById("calcInput").value;
  try {
    let result = eval(input);
    document.getElementById("result").innerText = "Svar: " + result;
  } catch {
    document.getElementById("result").innerText = "Ogiltigt uttryck";
  }
}

const frågaContainer = document.getElementById("fråga-container"); //behållaren för hela frågan
const frågaElement = document.getElementById("fråga"); //frågan
const svarButtons = document.getElementById("svar-buttons"); //knappar med svarsalternativ
const nextButton = document.getElementById("next-btn"); //knapp nästa
const restartButton = document.getElementById("restart-btn"); //knapp restart
const svarDiv = document.getElementById("svar"); //div där slutresultatet visas

let shuffledQuestions/*Array*/, currentQuestionIndex/*Mäter vilket tal vi e på*/, score/*Räknar poängen man samlat in*/; 

const frågor = [ //Array med 5 frågor
    {
        fråga: "Vad är 2 + 2?",//En av frågorna
        svar: [//Alternativ
            {text:"4", correct:true},//Korrekta svaret har correct satt som true
            {text:"22", correct:false},//Fel svar har correct som false
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

function setNextQuestion(){//För att rensa gamla svar och visa nya frågan
    resetState();//Tar bort gamla svarsalternativ från skärmen
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(fråga){//Skriver ut frågan på skärmen
    frågaElement.innerText = fråga.fråga;
    fråga.svar.forEach((answer, index)=>{ //Lopp genom varje svarsalternativ. Answer lika med ett svarsalternativ och indexnummer
        const inputGroup = document.createElement("div"); //Skapar en div för varje svar och ger det svaret klassen input-group
        inputGroup.classList.add("input-group");

        const radio = document.createElement("input");//Skapar radioknappar för att välja det svaret man vill välja
        radio.type = "radio";//Radioknapp
        radio.id = "svar" + index;//Ger radioknappen en id av svar och sen indexen för att göra de unika från varann
        radio.name = "svar";//Ger radioknappen ett namn "svar"
        radio.value = index;//Get radioknappen värdet av index

        const label = document.createElement("label");//Skapar en label
        label.htmlFor = "svar" + index; //Kopplar label med varsin radioknapp
        label.innerText = answer.text;

        inputGroup.appendChild(radio);//Lägger till radioknappen inuti InputGroup
        inputGroup.appendChild(label);//Lägger till label inuti InputGroup
        svarButtons.appendChild(inputGroup);//Lägger till InputGroup inuti svarButtons
    })
}

function resetState(){//Tar bort gamla svarsalternativ från skärmen
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




function escapeHtml(text) { //det här är koden som gör att en XSS attack inte är möjlig. Den byter ut alla tecken som kan leda till en XSS attack mot bokstäver som förstör den attacken
        return String(text)
            .replace(/&/g, '&amp;') // '&' byts ut till '&amp'
            .replace(/</g, '&lt;') // osv.
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }