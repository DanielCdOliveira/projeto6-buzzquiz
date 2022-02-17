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
        <li onclick="showSelectedQuiz(${element.id})" class="quiz" id="${element.id}">
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
            let quizStorage = JSON.parse(localStorage.getItem(key));
          



            myQuiz.innerHTML += `
            <li onclick="showSelectedQuiz(${quizStorage.id})" class="quiz" id="${quizStorage.id}">
                <img src="${quizStorage.image}" alt="">
                <h3>${quizStorage.title}</h3>
            </li>
            `
        }
    } else{
        let noQuiz = document.querySelector(".no-quiz")
        noQuiz.classList.remove("hidden")
    }
}

searchQuiz()

function showSelectedQuiz(idDoQuiz) {
    console.log(idDoQuiz);
    homePage.classList.add("hidden");
    quizPage.classList.remove("hidden");
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
    quizTitle = document.querySelector(".quiz-title:valid").value;
    quizUrl = document.querySelector(".quiz-url:valid").value;
    quizNumQuestions = document.querySelector(".quiz-number-questions:valid").value;
    quizNumLevels = document.querySelector(".quiz-number-levels:valid").value;
    if (quizTitle != "" && quizUrl != "" && quizNumQuestions != "" && quizNumLevels != "") {
        createQuestionsLevels(quizTitle, quizUrl, quizNumQuestions, quizNumLevels);
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
                <input class="create-input question-text" type="text" minlength="20" placeholder="Texto da pergunta">
                <input class="create-input question-color" type="text" placeholder="Cor de fundo da pergunta">
             </div>
            <div>
                <h2>Resposta correta</h2>
                <input class="create-input correct-answer" type="text"  minlength="1" placeholder="Resposta correta">
                <input class="create-input url-answer" type="url" pattern="https://.*" placeholder="URL da imagem">
            </div>
            <div class="incorrects">
                <h2>Respostas incorretas</h2>
                <input class="create-input" type="text" placeholder="Resposta correta">
                <input class="create-input" type="url" pattern="https://.*" placeholder="URL da imagem">
                <input class="create-input" type="text" placeholder="Resposta correta">
                <input class="create-input" ttype="url" pattern="https://.*"" placeholder="URL da imagem">
                <input class="create-input" type="text" placeholder="Resposta correta">
                <input class="create-input" type="url" pattern="https://.*" placeholder="URL da imagem">
        </div>
        <img onclick="editQuestion(this,'question')" class="edit-question" src="assets/Vector.png" alt="">
    </li>
    `
        // CRIANDO O LAYOUT DE INPUT DOS LEVELS
    }
    for (let i = 0; i < nLevels; i++) {
        pageThree.querySelector("ul").innerHTML += `
        <li class="level hide" id="l${i}">
            <div class="text-inputs">
                <h2>Nivel ${i+1}</h2>
                <input class="create-input level-title"  type="text" minlength="10"
                placeholder="Título do nível">
                <input class="create-input level-hits" type="number" min="0" max="100" placeholder="% de acerto mínima">
                <input class="create-input level-url" type="url" pattern="https://.*"
                placeholder="URL da imagem do nível">
                <textarea class="create-input level-description" type="text" minlength="30" placeholder="Descrição do nível"></textarea> 
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
    pageTwo.classList.add("hidden");
    pageThree.classList.remove("hidden");


    for (let i = 0; i < quizNumQuestions; i++) {
        // li da pergunta
        let question = document.querySelector(`#q${i}`);
        answerArray = []
        // texto da pergunta
        let questionText = question.querySelector(".question-text").value
        // cor da pergunta
        let questionColor = question.querySelector(".question-color").value

        // resposta certa
        let correctAnswer = question.querySelector(".correct-answer").value

        // url da imagem certa
        let urlAnswer = question.querySelector(".url-answer").value


        answerArray.push({
            text: correctAnswer,
            image: urlAnswer,
            isCorrectAnswer: true
        })


        for (let i = 0; i < 6; i++) {
            let wrong = question.querySelector(".incorrects").querySelectorAll("input")[i].value
            let wrongUrl = question.querySelector(".incorrects").querySelectorAll("input")[i + 1].value
            if (wrong != "" && wrongUrl != "") {
                answerArray.push({
                    text: wrong,
                    image: wrongUrl,
                    isCorrectAnswer: false
                })

            }
            i++;
        }

        let arrayContent = {
            title: questionText,
            color: questionColor,
            answers: answerArray
        }

        questionsArray.push(arrayContent)

    }

}

// FUNÇAO DO BOTAO DA TERCEIRA TELA DE CRIAÇAO
function stepThree() {


    console.log(quizNumLevels)
    for (let i = 0; i < quizNumLevels; i++) {

        let answerObject = {};

        let level = document.querySelector(`#l${i}`);
        console.log(level);

        let levelTitle = level.querySelector(".level-title").value;
        console.log(levelTitle);

        let levelHits = parseInt(level.querySelector(".level-hits").value);
        console.log(levelHits);

        let levelUrl = level.querySelector(".level-url").value;
        console.log(levelUrl);

        let levelDescription = level.querySelector(".level-description").value;
        console.log(levelDescription);



        answerObject = {
            title: levelTitle,
            image: levelUrl,
            text: levelDescription,
            minValue: levelHits
        }



        levelsArray.push(answerObject)
    }



    console.log(levelsArray)

    console.log(quizInCreation);
    const promise = axios.post(QUIZ_API, quizInCreation)
    promise.then(send)
    promise.catch(notSend)


    let finalImage = pageFour.querySelector(".div-img")
    finalImage.innerHTML = `
    <img class="final-image" src="${quizInCreation.image}" alt="">
    <h3>${quizInCreation.title}</h3>
    `

}

function send(response) {
    pageThree.classList.add("hidden");
    pageFour.classList.remove("hidden");
    console.log(response)

    const newQuizString = JSON.stringify(response.data);
    const newQuizID = response.data.id;
    console.log(newQuizID);
    localStorage.setItem(newQuizID, newQuizString);

    const quizString = localStorage.getItem(newQuizID)

    currentQuiz = JSON.parse(quizString)

    console.log(currentQuiz)





}

function notSend(response) {
    console.log(response)
}









































































































































































































































































function questionSelected(image, text) {
    // Habilita o texto em verde 
    const deselectedtext = document.querySelector(".question-options-2 .green")
    // console.log (deselectedtext);
    if (deselectedtext !== null) {
        deselectedtext.classList.remove("green");
    }
    const selectedtext = document.querySelector(".question-options-2 ." + text)
    // console.log (selectedtext);
    selectedtext.classList.add("green");
    for (let i = 1; i < 5; i++) {
        const deselectImage = document.querySelector(".question-options-2 .image" + i)
        console.log(deselectImage);
        deselectImage.classList.add("opacity");
    }
    const selectImage = document.querySelector(".question-options-2 ." + image)
    console.log(selectImage);
    selectImage.classList.remove("opacity");
}