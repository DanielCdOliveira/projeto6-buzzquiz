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
    loadingScreen()
}

function quizDisplay(response) {
    const variavel = response.data;
    variavel.forEach(element => {
        allQuiz.innerHTML += `
        <li data-identifier="quizz-card" onclick="selectedQuiz(${element.id})" class="quiz" id="${element.id}">
            <img src="${element.image}" alt="">
            <h3>${element.title}</h3>
        </li>
        `
    });



    if (localStorage.length > 0) {
        let existQuiz = document.querySelector(".exist-quiz")
        existQuiz.classList.remove("hidden")
        for (let i = 0; i < localStorage.length; i++) {
            // pega o id do quiz
            let key = localStorage.key(i);
            // busca no servidor
            const promise = axios.get(`${QUIZ_API}/${key}`)
            promise.then(completeMyQuiz)

        }
    } else {
        let noQuiz = document.querySelector(".no-quiz")
        noQuiz.classList.remove("hidden")
    }
}

// gera os quiz criados pelo usuario
function completeMyQuiz(element) {
    let myQuiz = document.querySelector(".my-quiz").querySelector("ul")
    myQuiz.innerHTML += `
    <li data-identifier="quizz-card" onclick="selectedQuiz(${element.data.id})" class="quiz" id="${element.data.id}">
        <img src="${element.data.image}" alt="">
        <h3>${element.data.title}</h3>
    </li>
    `
}

searchQuiz()


/* Variáveis Globais*/
let object = [];
let score = 0;
let questionqntd = 0;
let levelsqntd = 0;
let index = 0;
let QuizID = "";
let allQuestions = "";
let questionTitle = "";
let answer = [];
let answerqntd = "";
let answerClicked = "";



/* SELECIONA O QUIZ CLICADO NA TELA INICIAL */

function selectedQuiz(idDoQuiz) {
    QuizID = idDoQuiz;
    homePage.classList.add("hidden");
    quizPage.classList.remove("hidden");
    const promise = axios.get(QUIZ_API + "/" + idDoQuiz);
    promise.then(mostrarQuizTopo);
    loadingScreen()
}

function refreshQuiz(idDoQuiz) {
    QuizID = idDoQuiz;
    homePage.classList.add("hidden");
    quizPage.classList.remove("hidden");
    const promise = axios.get(QUIZ_API + "/" + idDoQuiz);
    promise.then(mostrarQuizTopo);
}

/* MOSTRA O BANNER DO QUIZ */

function mostrarQuizTopo(APIData) {
    let data = APIData.data;
    levelsqntd = data.levels.length;
    for (let i = 0; i < levelsqntd; i++) {
        object[i] = data.levels[i];
    }
    allQuestions = data.questions;
    questionTitle = allQuestions;
    questionqntd = questionTitle.length;
    answer = [];
    answerqntd = "";
    answerClicked = "";
    quizPage.innerHTML += `
            <div class="quiz_title">
                <img src=${data.image}>
                <p>${data.title} do quiz</p>
            </div>
            <div class="quiz_questions_container">
            </div>
        `
    mostrarQuizQuestões();
}

/* MOSTRA AS QUESTÕES COM AS RESPOSTAS */

function mostrarQuizQuestões() {
    for (let i = 0; i < questionqntd; i++) {
        answer = questionTitle[i].answers;
        answer.sort(comparador);
        answerqntd = answer.length;
        const placeQuestions = document.querySelector(".quiz_questions_container");
        placeQuestions.innerHTML += `
                <div class="quiz_questions">
                <div  class="question_text">
                    <p> ${questionTitle[i].title} </p>
                </div>
                <div class="question_options o${i}">
                </div>
                </div>
        `
        const quizAnswers = document.querySelector(".o" + i);
        for (let j = 0; j < answerqntd; j++) {
            answerClicked = answer[j].isCorrectAnswer;
            let resposta = "incorreta";
            if (answerClicked === true) {
                resposta = "correta";
            }
            quizAnswers.innerHTML += `
            <div onclick="selecionarQuestão('${answerClicked}','o${i}','image${j}','text${j}','${answerqntd}')" class="question_section_container image${j} ${resposta}"><img src=${answer[j].image}>
                    <p class="text${j} text">${answer[j].text}</p>
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
    createPage.classList.remove("hidden");
    loadingScreen()
}

function loadingScreen() {
    let loadingDisplay = document.querySelector(".loading")
    loadingDisplay.classList.remove("hidden")
    setTimeout(function () {
        loadingDisplay.classList.add("hidden")
    }, 2000)



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
                <h2>Pergunta ${i + 1}</h2>
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
    let parent = element.parentNode
    parent.classList.add("selected");
    parent.classList.remove("hide");
    element.style.display = "none";
    // focar no primeiro input
    parent.querySelector("input").focus()

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

        // verifica se os campos estao prenchidos 
        if (questionText != null && questionColor != null && correctAnswer != null && urlAnswer != null) {
            if (correctAnswer.value != "" && pattern.test(questionColor.value)) {

                // verifica quantas repostas erradas cada questao tem
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

        // verifica se tem ao menos uma resposta errada
        if (incorrectAnswers > 0) {

            // adicionar resposta errada
            answerArray.push({
                text: correctAnswer.value,
                image: urlAnswer.value,
                isCorrectAnswer: true
            })

            // adiciona as respostas erradas
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

            // objeto de cada pergunta
            let arrayContent = {
                title: questionText.value,
                color: questionColor.value,
                answers: answerArray
            }

            // array com todas perguntas
            questionsArray.push(arrayContent);
        } else {
            alert(`Preencha todos os campos da pergunta ${i + 1} (pelo menos uma resposta errada)`);
        }


    }

    // verifica se ta tudo ok e vai pra proxima pagina
    if (questionsComplete == quizNumQuestions.value) {
        pageTwo.classList.add("hidden");
        pageThree.classList.remove("hidden");
        quizInCreation.questions = questionsArray
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
            alert(`Preencha todos os campos do level ${i + 1}`)
        }


    }
    quizInCreation.levels = levelsArray

    if (minZero) {
        //   tudo deu certo envia pro servidor
        const promise = axios.post(QUIZ_API, quizInCreation)
        promise.then(send)
        promise.catch(notSend)


    } else {
        alert("Pelo menos um dos valores da porcentagem deve ser ZERO")
    }

}


// Conseguiu enviar o quiz
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

function notSend() {
    alert("ERRO")
}

// voltar para pagina inicial
function goToHomePage() {
    location.reload();
}



// EXIBIÇAO DO QUIZ


function comparador() {
    return Math.random() - 0.5;
}

/* FORMATA AS RESPOSTAS APÓS O CLIQUE */

function selecionarQuestão(answer, id, image, text, quantity) {

    // Desabilita todas as questões, deixas todas transparentes e com resposta errada

    for (let i = 0; i < quantity; i++) {
        const deselectImage = document.querySelector("." + id + " .image" + i)
        deselectImage.classList.add("opacity");
        deselectImage.classList.add("disable");
        const selectedText = document.querySelector("." + id + " .text" + i);
        selectedText.classList.add("wrong");
    }

    // Tira a transparência da resposta clicada, e corrige a formatação da resposta correta

    const selectImage = document.querySelector("." + id + " ." + image)
    selectImage.classList.remove("opacity");
    const selectCorrect = document.querySelector("." + id + " .correta")
    const aux = selectCorrect.querySelector(".text");
    aux.classList.remove("wrong");
    aux.classList.add("correct");
    //  scroll(selectImage);
    setTimeout(() => scrollQuestion(selectImage), 2000);
    calculateScore(answer);
}

/* CALCULA NO FRONT END O SCORE DO QUIZ */

function calculateScore(selectedAnswer) {

    if (selectedAnswer === "true") {
        score += 100 / questionqntd;
    }
    index++;
    if (index === questionqntd) {
        score = Math.ceil(score);
        readScore(score);
    } else {}
}

/* INTERPRETA O RESULTADO DO QUIZ PARA MOSTRAR A MENSAGEM CORRETA */

function readScore(score) {
    let questionLevels = [];
    let i = 0;
    let endQuiz = "showQuiz";
    while (i < levelsqntd) {
        questionLevels[i] = object[i].minValue;
        if (score === 0) {
            showQuizResults(0);
            setTimeout(scrollarTela, 2000);
            i = levelsqntd;
            endQuiz = "";
        } else if (score <= questionLevels[i]) {
            showQuizResults(i - 1);
            setTimeout(scrollarTela, 2000);
            i = levelsqntd;
            endQuiz = "";
        } else {
            i++;
        }
    }
    if (endQuiz === "showQuiz") {
        i = levelsqntd - 1;
        showQuizResults(i);
        setTimeout(scrollarTela, 2000);
    }
}

/* MOSTRA NO FINAL DA PÁGINA O RESULTADO DO QUIZ */

function showQuizResults(quizIndex) {
    const quizEnd = object[quizIndex];
    quizPage.innerHTML += `
        <div class="quiz_questions">
            <div class="result_title">
                <p> ${score}% de acerto: ${quizEnd.title} </p>
            </div>
            <img class="result_image"src=${quizEnd.image}>
            <p class="result_message">${quizEnd.text}</p>
        </div>
        <input onclick="restartQuiz(${QuizID})" class="final-button" type="button" value="Reiniciar Quizz">
        <input onclick="goToHomePage()" class="home-button final-margin" type="button" value="Voltar pra home">
    `
}


function scrollQuestion(questionPlace) {
    const ul = questionPlace;
    const lastScreen = ul.lastElementChild;
    lastScreen.scrollIntoView();
}

/* SCROLLA A PAGINA PARA O FINAL QUANDO FINALIZA O QUIZ */

function scrollarTela() {
    const ul = quizPage;
    const lastScreen = ul.lastElementChild;
    lastScreen.scrollIntoView();
}

/* RESETA O QUIZ QUANDO CLICAR NO BOTÃO DE RESET */

function restartQuiz(id) {
    quizPage.innerHTML = "";
    resetVariables();
    refreshQuiz(id);
}

/* ZERA AS VARIÁVEIS PARA RECOMEÇAR O QUIZ */

function resetVariables() {
    object = [];
    score = 0;
    questionqntd = 0;
    levelsqntd = 0;
    index = 0;
    QuizID = "";
    allQuestions = "";
    questionTitle = "";
    answer = [];
    answerqntd = "";
    answerClicked = "";
}