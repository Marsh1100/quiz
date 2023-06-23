
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
      
      editQuestion(index,question){
        this.question.splice(index,1,question);
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

const $btnQuestion = document.getElementById("btn-question");
//Formulario
$btnQuestion.addEventListener("click", (e)=>{
    e.preventDefault();

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
      
      if(e.target.textContent == 'Agregar pregunta'){
        questionManager.addQuestion(newQuestion);
      }else{
        let index = e.target.value;
        questionManager.editQuestion(index,newQuestion)
        $btnQuestion.innerHTML = "Agregar pregunta"

      }
      
      renderQuestions();
      $question.value = "";
      $answerA.value = " ";
      $answerB.value = " ";
      $answerC.value = " ";
      $answerD.value = " ";
      $answerCorrect.value = "Seleccionar respuesta";

      console.log(questionManager)
      console.log(newQuestion)
    }else{
      alert("No ha seleccionado ninguna opción de respuesta.")
    };
    

})

function shuffle(unshuffled){

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
    let html = `<br><span>${(i+1)+"."+item.question}</span>
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
                <div class="botones">
                <button  class="btn btn-warning" onclick="editQuestion(${i})">Editar</button>
                <button  class="btn btn-danger" onclick="removeQuestion(${i})">Eliminar</button>
                </div>
                `;

    $questionsList.insertAdjacentHTML('beforeend',html)
  }
};

function removeQuestion(index) {
  questionManager.removeQuestion(index);
  renderQuestions();
}

function editQuestion(index){
  const questions = questionManager.getQuestions();
  
  let editObject = questions[index];
  console.log(editObject)
  let {question,answers,answerCorrect} = editObject;

  $question.value = question;
  $answerA.value = answers[0];
  $answerB.value = answers[1];
  $answerC.value = answers[2];
  $answerD.value = answers[3];
  $answerCorrect.value = answerCorrect;

  $btnQuestion.innerHTML = "Confirmar edición"
  $btnQuestion.setAttribute("value", index)

}