
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

//AddEventListener
/*document.addEventListener('DOMContentLoaded',function(){
  questionManager = JSON.parse(localStorage.getItem('questionManager')) || questionManager;
  renderQuestions();
});

function addlocalStorage(){
  localStorage.setItem('questionManager', JSON.stringify(questionManager));
};*/

//Interacción con el DOM
const $questionForm = document.getElementById("question-form");

questionManager.addQuestion(new Question("¿Cuántos litros de sangre tiene una persona adulta?",
                                        "Tiene entre 2 y 4 litros",
                                        "Tiene entre 4 y 6 litros",
                                        "Tiene 10 litros",
                                        "Tiene 7 litros",
                                        "1"));
questionManager.addQuestion(new Question("¿Cuál es el libro más vendido en el mundo después de la Biblia?",
                                        "El Señor de los Anillos",
                                        "Don Quijote de la Mancha",
                                        "Cien años de Soledad",
                                        "Harry Potter",
                                        "1"));
questionManager.addQuestion(new Question("¿Cuáles son los representantes más destacados de la literatura renacentista?",
                                        "Miguel de Cervantes, William Shakespeare, Luis de Camões.",
                                        "Leonardo da Vinci, Miguel Angel Buonarroti, Sandro Boticelli",
                                        "Caravaggio, Bernini, Borromini", "Jorge Isaac, José Martí, Eduardo Blanco",
                                        "0"));

//Elementos del DOM
const $main = document.getElementById("make-quiz");
const $quiz = document.getElementById("resolve-quiz");

const $question = document.getElementById("question");
const $answerA = document.getElementById("answer_a");
const $answerB = document.getElementById("answer_b");
const $answerC = document.getElementById("answer_c");
const $answerD = document.getElementById("answer_d");

const $answerCorrect = document.getElementById("answer_correct");

const $questionsList = document.getElementById("quiz");
const $questionTest = document.getElementById("test");

const $btnQuestion = document.getElementById("btn-question");
const $linkViewMain = document.getElementById("link-main");
const $linkViewQuiz = document.getElementById("link-resolveQuiz");

const $btnSend = document.getElementById("btn-send");
const $btnRepeat = document.getElementById("btn-repeat");


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
      $answerCorrect.n = "Seleccionar respuesta";

    }else{
      alert("No ha seleccionado ninguna opción de respuesta.")
    };
    

});
//AddEventListener
$linkViewMain.addEventListener('click',(e)=>{
  e.preventDefault();
  $quiz.style.display = 'none';
  $main.style.display = 'flex';

});
$linkViewQuiz.addEventListener('click',(e)=>{
  e.preventDefault();
  //Ocultar cuestionario y preguntas
  $main.style.display = 'none';
  $quiz.style.display = 'block';

  $btnSend.style.display = 'block';
  $btnRepeat.style.display = 'none';

    
  renderQuiz();
});

$btnSend.addEventListener('click',(e)=>{
  e.preventDefault();
  $btnSend.style.display = 'none';
  $btnRepeat.style.display = 'block';

  const questions = questionManager.getQuestions();
  let contador = 0;
  questions.forEach((element,index)=>{
    let {answers,answerCorrect} = element;
    console.log(answers[Number(answerCorrect)]);

    let $answersSelect = document.getElementsByName(`${"select"+index}`);
    let $parent = document.getElementById(`${index}`);

    for (var i = 0; i < $answersSelect.length; i++){ 
      if ($answersSelect[i].checked) {
         break; 
     }
    }
    if(answers.length != i){
          if($answersSelect[i].value == answers[Number(answerCorrect)]){
            checkAnswers($parent,true);
            contador +=1;
          }else{
            checkAnswers($parent,false);
          };
    }else{
      let html =`<div class="alert alert-warning d-flex align-items-center" role="alert">
                <i class="bi bi-exclamation-triangle-fill"></i>
                <div> Pregunta sin responder </div>
              </div>`;
      $parent.insertAdjacentHTML('afterbegin',html)
    } 
    //Deshabilitar los botones después de responder 
    $answersSelect.forEach(e=>{e.disabled=true})
  
  });
  note(questions.length,contador);

});

$btnRepeat.addEventListener('click',(e)=>{
  e.preventDefault();
  $btnSend.style.display = 'block';
  $btnRepeat.style.display = 'none';


  renderQuiz();

});

function note(n,correctas){
  let html =`<div class="note p-3 text-primary-emphasis  border border-primary-subtle rounded-3">
              <div>Respuestas correctas: ${correctas+"/"+n}</div>
            </div><br>`;

  $questionTest.insertAdjacentHTML('afterbegin',html);
}
function checkAnswers(parentNode,state){
  if(state){
    let html =`<div class="alert alert-success d-flex align-items-center" role="alert">
                <i class="bi bi-check-circle-fill"></i>
                <div> ¡Respuesta correcta! </div>
              </div>`;
    parentNode.insertAdjacentHTML('afterbegin',html)
  }else{
    let html =`<div class="alert alert-danger d-flex align-items-center" role="alert">
                <i class="bi bi-exclamation-triangle-fill"></i>
                <div> Respuesta incorrecta </div>
              </div>`;
    parentNode.insertAdjacentHTML('afterbegin',html)
  }
}

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

    let html = `<div class="answersQuiz">
                <br><span>${(i+1)+"."+item.question}</span>
                <div class="form-check">
                <input value="A" class="form-check-input" type="radio"  disabled>
                <label class="form-check-label">${item.answers[0]}</label>
                </div>

                <div class="form-check">
                <input value="B"  class="form-check-input" type="radio" disabled  >
                <label class="form-check-label">${item.answers[1]}</label>
                </div>

                <div class="form-check">
                <input value="C" class="form-check-input" type="radio" disabled >
                <label class="form-check-label">${item.answers[2]}</label>
                </div>

                <div class="form-check">
                <input value="D" class="form-check-input" type="radio"  disabled >
                <label class="form-check-label">${item.answers[3]}</label>
                </div>
                <div class="botones">
                <button  class="btn btn-warning" onclick="editQuestion(${i})">Editar</button>
                <button  class="btn btn-danger" onclick="removeQuestion(${i})">Eliminar</button>
                </div>
                </div>
                `;
    $questionsList.insertAdjacentHTML('beforeend',html)
  }
};

function renderQuiz(){
  $questionTest.innerHTML=" ";
  let questions = questionManager.getQuestions();
  for(let i = 0; i < questions.length; i++){
    const item = questions[i];

    //Array desordenado
    let answers2 = shuffle(item.answers);
    let html = `<div class="answersQuiz" id="${i}">
                  <span>${(i+1)+". "+item.question}</span>

                  <div class="form-check">
                  <input value="${answers2[0]}" class="form-check-input" type="radio" name="${"select"+i}">
                  <label class="form-check-label">${answers2[0]}</label>
                  </div>

                  <div class="form-check">
                  <input value="${answers2[1]}"  class="form-check-input" type="radio" name="${"select"+i}"  >
                  <label class="form-check-label">${answers2[1]}</label>
                  </div>

                  <div class="form-check">
                  <input value="${answers2[2]}" class="form-check-input" type="radio" name="${"select"+i}"  >
                  <label class="form-check-label">${answers2[2]}</label>
                  </div>

                  <div class="form-check">
                  <input value="${answers2[3]}" class="form-check-input" type="radio" name="${"select"+i}"  >
                  <label class="form-check-label">${answers2[3]}</label>
                  </div>
                  <br>
                </div>
                `;

    $questionTest.insertAdjacentHTML('beforeend',html)
  }

  /*let html = `<div class="center">
              <button id="btn-send" type="btn" class="btn btn-primary">Enviar</button> 
              </div>`
  
  $questionTest.insertAdjacentHTML('beforeend',html)*/

  //addlocalStorage();

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