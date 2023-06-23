
class Question {
    constructor(question, answerA,answerB,answerC,answerD, answerCorrect){
        this.question = question;
        this.answers = [answerA,answerB,answerC,answerD];
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
    if($answerCorrect.value != 'Seleccionar respuesta'){
      const question = $question.value;

      const answerA = $answerA.value;
      const answerB = $answerB.value;
      const answerC = $answerC.value;
      const answerD = $answerD.value;

      const answerCorrect = $answerCorrect.value;
      console.log(answerCorrect);
      const newQuestion = new Question(question,answerA,answerB,answerC,answerD,answerCorrect);
      questionManager.addQuestion(newQuestion);
      renderQuestions();
      $questionForm.reset();

      console.log(questionManager)
      console.log(newQuestion)
    }else{
      alert("lksdflkasd_NO")
    };
    

})

function shuffle(unshuffled){
  console.log("si buenas")
  let shuffled = unshuffled
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

  return shuffled;
}

function renderQuestions(){
  $questionsList.innerHTML=" ";
  const questions = questionManager.getQuestions();

  for(let i = 0; i < questions.length; i++){
    const item = questions[i];

    //Array desordenado
    let answers2 = shuffle(item.answers);
    console.log(answers2);
    let html = `<br><span>${(i+1)+item.question}</span>
                <div class="form-check">
                <input value="A" class="form-check-input" type="radio" name="select"  >
                <label class="form-check-label">${answers2[0]}</label>
                </div>

                <div class="form-check">
                <input value="B"  class="form-check-input" type="radio" name="select"  >
                <label class="form-check-label">${answers2[1]}</label>
                </div>

                <div class="form-check">
                <input value="C" class="form-check-input" type="radio" name="select"  >
                <label class="form-check-label">${answers2[2]}</label>
                </div>

                <div class="form-check">
                <input value="D" class="form-check-input" type="radio" name="select"  >
                <label class="form-check-label">${answers2[3]}</label>
                </div>
                <button  class="btn btn-danger" onclick="removeQuestion(${i})">Eliminar</button>
                `;

    $questionsList.insertAdjacentHTML('beforeend',html)
  }
};

function removeQuestion(index) {
  questionManager.removeQuestion(index);
  renderQuestions();
}