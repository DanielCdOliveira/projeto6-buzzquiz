// API DO QUIZ
const QUIZ_API = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"

// VARIAVEIS DE CONTROLE DE PAGINA
const homePage = document.querySelector(".home-page")
const createPage = document.querySelector(".create-quiz")
const quizPage = document.querySelector(".quiz-page")

////////////////    PAGINA INICIAL  ////////////////

// lista dos quiz do servidor
const allQuiz = document.querySelector(".all-quiz .quiz-container")

// Adicionar quiz a pagina
function searchQuiz() {
    const promise = axios.get(QUIZ_API)
    promise.then(quizDisplay);

}

function quizDisplay(response) {
    console.log(response.data); //tirar depois
    const variavel = response.data;

    variavel.forEach(element => {
        allQuiz.innerHTML += `
        <li onclick="selectedQuiz(${element.id})" class="quiz" id="${element.id}">
            <img src="${element.image}" alt="">
            <h3>${element.title}</h3>
        </li>
        `
    });

    if (localStorage.length > 0) {
        let myQuiz = document.querySelector(".my-quiz").querySelector("ul")
        let existQuiz = document.querySelector(".exist-quiz")
        existQuiz.classList.remove("hidden")
        for (let i = 0; i < localStorage.length; i++) {

            let key = localStorage.key(i);
            

            const promise = axios.get(`${QUIZ_API}/${key}`)
            promise.then(completeMyQuiz)
            

            
        }
    } else {
        let noQuiz = document.querySelector(".no-quiz")
        noQuiz.classList.remove("hidden")
    }
}

// gera os quiz criados pelo usuario
function completeMyQuiz(element){
    let myQuiz = document.querySelector(".my-quiz").querySelector("ul")
    myQuiz.innerHTML += `
    <li onclick="selectedQuiz(${element.data.id})" class="quiz" id="${element.data.id}">
        <img src="${element.data.image}" alt="">
        <h3>${element.data.title}</h3>
    </li>
    `
}




searchQuiz()

function selectedQuiz(idDoQuiz) {
    //   console.log(idDoQuiz);
    homePage.classList.add("hidden");
    quizPage.classList.remove("hidden");
    const promise = axios.get(QUIZ_API + "/" + idDoQuiz);
    // promise.then(showTitleQuiz);
    promise.then(mostrarQuiz);
}

function mostrarQuiz(APIData) {
    const data = APIData.data;
    console.log(data)
    const allQuestions = data.questions;
    //console.log(allQuestions);
    let questionTitle = allQuestions;
    const questionqntd = questionTitle.length;
    let answer = "";
    let answerqntd = "";
    let answershuffle = [];
    console.log(questionTitle[0].answers[0].isCorrectAnswer);
    quizPage.innerHTML += `
            <div class="quiz_title">
                <img src=${data.image}>
                <p>${data.title} do quiz</p>
            </div>
        `
    for (let i = 0; i < questionqntd; i++) {
        answer = questionTitle[i].answers;
        answershuffle = answer;
        answershuffle.sort(comparador);
        console.log(answershuffle);
        answerqntd = answer.length;
        quizPage.innerHTML += `
            <div class="quiz_questions">
                <div class="question_text">
                    <p> ${questionTitle[i].title} </p>
                </div>
                <div class="question_options o${i}">
                </div>
            </div>
        `
        const lugarcerto = document.querySelector(".o" + i);
        // console.log (lugarcerto);

        for (let j = 0; j < answerqntd; j++) {
            let answerStatus = answershuffle[j].isCorrectAnswer;
            // console.log (answerStatus);
            lugarcerto.innerHTML += `
                <div onclick="selecionarQuestão('${answerStatus}','o${i}','image${j}','text${j}','${answerqntd}')" class="question_section_container image${j}">
                    <img src=${answer[j].image}>
                    <p class="text${j}">${answer[j].text}</p>
                </div>
            `
        }
    }
}

// Criar quiz
// Objeto que sera o quiz criado
let quizInCreation = {};
let quizTitle = null;
let quizUrl = null;
let quizNumQuestions = null;
let quizNumLevels = null;

// PAGINAS USADAS DURANTE A CRIAÇAO
let pageOne = document.querySelector(".create-page.one")
let pageTwo = document.querySelector(".create-page.two")
let pageThree = document.querySelector(".create-page.three")
let pageFour = document.querySelector(".create-page.four")

// ARRAYS COM PERGUNTAS E LEVELS
let questionsArray = [];
let levelsArray = [];
// ARRAY DE RESPOSTAS
let answerArray = [];

function createQuiz() {
    homePage.classList.add("hidden");
    createPage.classList.remove("hidden")
}


// FUNÇAO DO PRIMEIRO BOTAO DA PRIMEIRA TELA DE CRIAÇAO
function stepOne() {
    quizInCreation = {};
    quizTitle = document.querySelector(".quiz-title:valid");
    quizUrl = document.querySelector(".quiz-url:valid");
    quizNumQuestions = document.querySelector(".quiz-number-questions:valid");
    quizNumLevels = document.querySelector(".quiz-number-levels:valid");
    if (quizTitle != null && quizUrl != null && quizNumQuestions != null && quizNumLevels != null) {
        createQuestionsLevels(quizTitle.value, quizUrl.value, quizNumQuestions.value, quizNumLevels.value);
        pageOne.classList.add("hidden")
        pageTwo.classList.remove("hidden")

    } else {
        alert("Insira informaçoes válidas")
    }
}


// FUNÇAO QUE GERA O LAYOUT DA PAGINA 2 E 3 DE CRIAÇAO
function createQuestionsLevels(title, url, nQuestions, nLevels) {
    quizInCreation = {
        title: title,
        image: url,
        questions: questionsArray,
        levels: levelsArray
    }
    // CRIANDO LAYOUT DE INPUTS DAS QUESTIONS


    for (let i = 0; i < nQuestions; i++) {
        pageTwo.querySelector("ul").innerHTML += `
        <li class="question hide" id="q${i}">
            <div>
                <h2>Pergunta ${i+1}</h2>
                <input class="create-input question-text" type="text" minlength="20" placeholder="Texto da pergunta" required>
                <input class="create-input question-color" type="text" maxlength="7" placeholder="Cor de fundo da pergunta" required>
             </div>
            <div>
                <h2>Resposta correta</h2>
                <input class="create-input correct-answer" type="text" placeholder="Resposta correta" required>
                <input class="create-input url-answer" type="url" pattern="https://.*" placeholder="URL da imagem" required>
            </div>
            <div class="incorrects">
                <h2>Respostas incorretas</h2>
                <input class="create-input" type="text" placeholder="Resposta correta" required>
                <input class="create-input" type="url" pattern="https://.*" placeholder="URL da imagem" required>
                <input class="create-input" type="text" placeholder="Resposta correta" required >
                <input class="create-input" ttype="url" pattern="https://.*"" placeholder="URL da imagem" required>
                <input class="create-input" type="text" placeholder="Resposta correta">
                <input class="create-input" type="url" pattern="https://.*" placeholder="URL da imagem" required>
        </div>
        <img onclick="editQuestion(this,'question')" class="edit-question" src="assets/Vector.png" alt="" required> 
    </li>
    `
        // CRIANDO O LAYOUT DE INPUT DOS LEVELS
    }
    for (let i = 0; i < nLevels; i++) {
        pageThree.querySelector("ul").innerHTML += `
        <li class="level hide" id="l${i}">
            <div class="text-inputs">
                <h2>Nivel ${i + 1}</h2>
                <input class="create-input level-title"  type="text" minlength="10"
                placeholder="Título do nível" required>
                <input class="create-input level-hits" type="number" min="0" max="100" placeholder="% de acerto mínima" required>
                <input class="create-input level-url" type="url" pattern="https://.*"
                placeholder="URL da imagem do nível" required>
                <textarea class="create-input level-description" type="text" minlength="30" placeholder="Descrição do nível" required></textarea> 
        </div>
        <img onclick="editQuestion(this,'level')" class="edit-question" src="assets/Vector.png" alt="">
        </li>
    `
    }

}
// EDITA AS PERGUNTAS
function editQuestion(element, className) {
    // Minimiza o que ta selecionado
    const question = document.querySelector(`.${className}.selected`);
    if (question != null) {
        question.classList.remove("selected");
        question.classList.add("hide");
        question.querySelector(".edit-question").style.display = "block";
    }

    // Maximiza o que foi clicado
    element.parentNode.classList.add("selected");
    element.parentNode.classList.remove("hide");
    element.style.display = "none";
}

//FUNÇAO DO BOTAO DA SEGUNDA TELA DE CRIAÇAO
function stepTwo() {

    let questionsComplete = 0;
    questionsArray = []

    for (let i = 0; i < quizNumQuestions.value; i++) {


        // array com as respostas do usuario
        answerArray = []

        // Pattern para verificar hexadecimal
        let pattern = /^#([0-9a-f]{6})$/i;

        // li da pergunta
        let question = document.querySelector(`#q${i}`);

        // texto da pergunta
        let questionText = question.querySelector(".question-text:valid")

        // cor da pergunta
        let questionColor = question.querySelector(".question-color:valid")

        // resposta certa
        let correctAnswer = question.querySelector(".correct-answer:valid")

        // url da imagem certa
        let urlAnswer = question.querySelector(".url-answer:valid")

        let incorrectAnswers = 0

        if (questionText != null && questionColor != null && correctAnswer != null && urlAnswer != null) {
            if (correctAnswer.value != "" && pattern.test(questionColor.value)) {

                for (let j = 0; j < 6; j++) {
                    let wrong = question.querySelector(".incorrects").querySelectorAll("input")[j].value
                    let wrongUrl = question.querySelector(".incorrects").querySelectorAll("input")[j + 1].value
                    if (wrong != "" && wrongUrl != "") {
                        incorrectAnswers++;
                    }
                    j++;
                }

            }
        }

        if (incorrectAnswers > 0) {

            answerArray.push({
                text: correctAnswer.value,
                image: urlAnswer.value,
                isCorrectAnswer: true
            })


            for (let i = 0; i < 6; i++) {
                wrong = question.querySelector(".incorrects").querySelectorAll("input")[i].value
                wrongUrl = question.querySelector(".incorrects").querySelectorAll("input")[i + 1].value
                if (wrong != "" && wrongUrl != "") {

                    answerArray.push({
                        text: wrong,
                        image: wrongUrl,
                        isCorrectAnswer: false
                    })



                }
                i++;

            }
            questionsComplete++;

            let arrayContent = {
                title: questionText.value,
                color: questionColor.value,
                answers: answerArray
            }

            questionsArray.push(arrayContent);
        } else {
            alert(`Preencha todos os campos da pergunta ${i+1} (pelo menos uma resposta errada)`);
        }


    }


    console.log(questionsComplete)
    if (questionsComplete == quizNumQuestions.value) {
        pageTwo.classList.add("hidden");
        pageThree.classList.remove("hidden");
        quizInCreation.questions = questionsArray
        console.log(quizInCreation)
    }
}




// FUNÇAO DO BOTAO DA TERCEIRA TELA DE CRIAÇAO
function stepThree() {

    // verificar se tem alguma porcentagem = 0
    let minZero = false
    // zerar o array caso de problema no preenchimento
    levelsArray = []


    for (let i = 0; i < quizNumLevels.value; i++) {
        // obejeto que ficara as resposta do usuario
        let answerObject = {};
        // li do level em questao
        let level = document.querySelector(`#l${i}`);
        // titulo do level
        let levelTitle = level.querySelector(".level-title:valid");
        // porcentagem do level
        let levelHits = level.querySelector(".level-hits:valid");
        // url da imagem do level
        let levelUrl = level.querySelector(".level-url:valid");
        // descriçao do level
        let levelDescription = level.querySelector(".level-description:valid");

        // verfica se os campos estao preenchidos
        if (levelTitle != null && levelHits != null && levelUrl != null && levelDescription != null) {
            console.log("entra aqui");
            answerObject = {
                title: levelTitle.value,
                image: levelUrl.value,
                text: levelDescription.value,
                minValue: parseInt(levelHits.value)
            }
            if (parseInt(levelHits.value) == 0) {
                minZero = true
            }
            levelsArray.push(answerObject)

        } else {
            alert(`Preencha todos os campos do level ${i+1}`)
        }


    }
    console.log(quizInCreation)
    quizInCreation.levels = levelsArray
    console.log(quizInCreation)

    if (minZero) {
        //   tudo deu certo envia pro servidor
        const promise = axios.post(QUIZ_API, quizInCreation)
        promise.then(send)
        promise.catch(notSend)


    } else {
        alert("Pelo menos um dos valores da porcentagem deve ser ZERO")
    }

}


// 
function send(response) {
    pageThree.classList.add("hidden");
    pageFour.classList.remove("hidden");
    const newQuizID = response.data.id;
    localStorage.setItem(newQuizID, newQuizID);

    // altera o layout da pagina 4
    pageFour.innerHTML = `
    <h2>Seu quizz está pronto!</h2>
        <div class="div-img">
            <img class="final-image" src="${quizInCreation.image}" alt="">
            <h3>${quizInCreation.title}</h3>
        </div>
        <input onclick="selectedQuiz(${newQuizID})" class="final-button" type="button" value="Acessar Quizz">
        <input onclick="goToHomePage()" class="home-button" type="button" value="Voltar pra home">
    `
}

function notSend(response) {
    console.log(response)
}

// voltar para pagina inicial
function goToHomePage() {
    location.reload();
}



































































































































































































































































function comparador() {
    return Math.random() - 0.5;
}

function selecionarQuestão(answer, id, image, text, quantity) {
    //  console.log (quantity);


    const selectedtext = document.querySelector("." + id + " ." + text);
    console.log(selectedtext);
    if (answer === "true") {
        selectedtext.classList.add("correct");
    } else {
        selectedtext.classList.add("wrong")
    }


    for (let i = 0; i < quantity; i++) {
        const deselectImage = document.querySelector("." + id + " .image" + i)
        console.log(deselectImage);
        deselectImage.classList.add("opacity");
    }
    const selectImage = document.querySelector("." + id + " ." + image)
    console.log(selectImage);
    selectImage.classList.remove("opacity");
}