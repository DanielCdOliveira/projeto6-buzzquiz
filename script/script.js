// API DO QUIZ
const QUIZ_API = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"

// LISTA DOS QUIZ DO SERVIDOR
const allQuiz = document.querySelector(".all-quiz .quiz-container")


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