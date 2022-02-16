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

    response.data.forEach(element => {
        allQuiz.innerHTML += `
        <li class="quiz" id="${element.id}">
            <img src="${element.image}" alt="">
            <h3>${element.title}</h3>
        </li>
        `
    });
}
searchQuiz()


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


function createQuiz() {
    homePage.classList.add("hidden");
    createPage.classList.remove("hidden")
}

function stepOne() {
    quizCreating = {};
    quizTitle = document.querySelector(".quiz-title:valid");
    quizUrl = document.querySelector(".quiz-url:valid");
    quizNumQuestions = document.querySelector(".quiz-number-questions:valid");
    quizNumLevels = document.querySelector(".quiz-number-levels:valid");

    if (quizTitle != null && quizUrl != null && quizNumQuestions != null && quizNumLevels != null) {
        createQuizPartOne(quizTitle.value, quizUrl.value, quizNumQuestions.value, quizNumLevels.value);
        pageOne.classList.add("hidden")
        pageTwo.classList.remove("hidden")

    } else {
        alert("Insira informaçoes válidas")
    }
}

function createQuizPartOne(title, url, nQuestions, nLevels) {
    quizInCreation = {
        title: title,
        image: url,
    }

    for (let i = 0; i < nQuestions; i++) {
        pageTwo.querySelector("ul").innerHTML += `
        <li class="question q${i} hide">
            <div class="hidden">
                <h2>Pergunta ${i+1}</h2>
                <input class="create-input" type="text" placeholder="Texto da pergunta">
                <input class="create-input" type="text" placeholder="Cor de fundo da pergunta">
             </div>
            <div class="hidden>
                <h2>Resposta correta</h2>
                <input class="create-input" type="text" placeholder="Resposta correta">
                <input class="create-input" type="text" placeholder="URL da imagem">
            </div>
            <div class="incorrects hidden">
                <h2>Respostas incorretas</h2>
                <input class="create-input" type="text" placeholder="Resposta correta">
                <input class="create-input" type="text" placeholder="URL da imagem">
                <input class="create-input" type="text" placeholder="Resposta correta">
                <input class="create-input" type="text" placeholder="URL da imagem">
                <input class="create-input" type="text" placeholder="Resposta correta">
                <input class="create-input" type="text" placeholder="URL da imagem">
        </div>
        <img onclick="editQuestion(this)" class="edit-question" src="assets/Vector.png" alt="">
    </li>
    `
    }

}





function editQuestion(element) {
    // Minimiza oq ta selecionado
    const question = document.querySelector(".question.selected");
    if (question != null) {
        question.classList.remove("selected");
        question.classList.add("hide");
        question.querySelector(".edit-question").style.display = "block"
    }

    // Maximiza o que foi clicado
    element.parentNode.classList.add("selected");
    element.parentNode.classList.remove("hide");
    element.style.display = "none";
}