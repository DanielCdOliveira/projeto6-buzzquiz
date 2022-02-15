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

function createQuiz (){
    homePage.classList.add("hidden");
    createPage.classList.remove("hidden")
}