
class Question {
    constructor(question, answerA,answerB,answerC,answerD, answerCorrect){
        this.question = question;
        this.answerA = answerA;
        this.answerB = answerB;
        this.answerC = answerC;
        this.answerD = answerD;
        this.answerCorrect = answerCorrect;
    }
}

class QuestionManager {
    constructor() {
        this.question = [];
      }
    
      addQuestion(question) {
        this.question.push(question);
      }
    
      removeQuestion(index) {
        this.question.splice(index, 1);
      }
    
      getQuestions() {
        return this.question;
      }
}

// Crear instancia de Preguntas
const questionManager =  new QuestionManager();

//Interacción con el DOM
const $questionForm = document.getElementById("question-form");

const $question = document.getElementById("question");
const $answerA = document.getElementById("answer_a");
const $answerB = document.getElementById("answer_b");
const $answerC = document.getElementById("answer_c");
const $answerD = document.getElementById("answer_d");

const $answerCorrect = document.getElementById("answer_correct");

const $questionsList = document.getElementById("quiz");

//Formulario
$questionForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    console.log("sadfsdg")
    //Validación de la respuesta
    const arrayAnswer = ["A","B","C","D"];
    const question = $question.value;

    const answerA = $answerA.value;
    const answerB = $answerB.value;
    const answerC = $answerC.value;
    const answerD = $answerD.value;

    const answerCorrect = $answerCorrect.value;

    if(!arrayAnswer.includes(answerCorrect.toUpperCase())){
        alert("La respuesta ingresada no es válida")
        return
    }
    
    const newQuestion = new Question(question,answerA,answerB,answerC,answerD,answerCorrect);
    questionManager.addQuestion(newQuestion);
    renderQuestions();
    $questionForm.reset();

    console.log(questionManager)
    console.log(newQuestion)

})


function renderQuestions(){
  $questionsList.innerHTML=" ";
  const questions = questionManager.getQuestions();

  for(let i = 0; i < questions.length; i++){
    const item = questions[i];

    let html = `<span>${item.question}</span>
                <div class="form-check">
                <input value=${"A"+i}class="form-check-input" type="radio" name="select"  >
                <label class="form-check-label">${item.answerA}</label>

                <input value=${"D"+i}  class="form-check-input" type="radio" name="select"  >
                <label class="form-check-label">${item.answerB}</label>

                <input value=${"D"+i}class="form-check-input" type="radio" name="select"  >
                <label class="form-check-label">${item.answerC}</label>

                <input value=${"D"+i}class="form-check-input" type="radio" name="select"  >
                <label class="form-check-label">${item.answerD}</label>
                
                 </div>`;

    $questionsList.insertAdjacentHTML('beforeend',html)
  }
}