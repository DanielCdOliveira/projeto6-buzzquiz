<div align="center"><img style = "width:100%;"src="https://i.imgur.com/Rj9CzHT.png"></img></div>
<hr>
<h2 align=center>BuzzQuizz</h2>
<h3 align=center>Web development Project</h3>
<hr>
<h4 align=center>A quiz webapp made with HTML, CSS and JavaScript</h4>
<h4 align=center>First time programming in pairs an API for making HTTP requests, controlling data like users and messages.</h4>
<h4 align=center>Uses an API for making HTTP requests </h4>
<br>
<div align=center style="display:flex; justify-content: center; gap:5%">
    <img style = "height:250px;"src="https://i.imgur.com/A21iXAw.png">
    <img style = "height:250px;"src="https://i.imgur.com/TwbkUOf.png">
    <img style = "height:250px;"src="https://i.imgur.com/o7CIBG1.png">
</div>
<div align=center style="display:flex; justify-content: center; gap:5%">
    <img style = "height:250px;" align=center src="https://i.imgur.com/nT2oNak.png">
</div>

<br><hr>

## Features

- Users can create their own quiz (using localstorage to identify their own quiz)
- Each quiz must have at least:
  - three questions
  - each question must have at least one right and one wrong answer.
- Alternatives are shown in random order
- Visual response to user responses
- Uses a API to save and receive quizzes

### Deploy

- Deploy using [GitHub Pages](https://danielcdoliveira.github.io/projeto6-buzzquiz/)

## Requirements

- Layout

  - [x] Apply layout to mobile, following Figma below. It is not necessary to implement a desktop version.
  - [x] Layout should switch to mobile version when window width is less than 1100px

- Screen 1: List of Quizzes

    - [x] On this screen, the quizzes provided by the server must be listed, following the given layout
    - [x] The user's quiz list should show only his quizzes, while the bottom list should show all the quizzes received, without the user's. To differentiate user quizzes from others, see the **User Quizzes** requirement
    - [x] Quizzes must be displayed in a rectangular format (according to layout), with the image and title of the quiz. The image must be overlaid with a gradient from black to transparent as per the layout. When clicking on the quiz, this screen should disappear and give way to **Screen 2: Page of a quizz** of the quiz in question
    - [x] When clicking on "Create Quizz" or "+" this screen should disappear, giving way to the **Screen 3: Quiz Creation** screen

- Screen 2: Quiz page (quiz end)

    - [x] After answering all the questions, the quiz result box should appear at the bottom of the screen. As with passing the questions, you must wait 2 seconds after the last answer and then scroll the screen to display this result box
    - [x] The quiz score (percentage of hits over total questions) must be calculated on the front, without any communication with the server, as well as the rating of which level the user was based on that score
    - [x] The title, image and description of the level the user was at should be displayed
    - [x] The score must be rounded so that there are no decimal places
    - [x] When clicking on the "Reset Quizz" button, the screen should be scrolled back to the top, the answers reset to the initial state and the result box hidden again
    - [x] When clicking on the "Back to home" button, this screen should disappear and give place to **Screen 1: Quizzes List**

- Screen 3: Quiz Creation

    - [x] The process of creating a quizz will go through 4 screens, following the layout:
        - Screen 3.1: Basic Quiz Information
        - Screen 3.2: Quiz Questions
        - Screen 3.3: Quiz Levels
        - Screen 3.4: Quiz Success
    - [x] The step before proceeding to the next screen, validations must be carried out on the incorporated information, following the rules below:
        - Basic quiz information
            - [x] Quiz Title: Must have a minimum of 20 and a maximum of 65 characters
            - [x] Image URL: must have URL format
            - [x] Number of questions: at least 3 questions
            - [x] Number of levels: at least 2 levels
        - Quiz questions
            - [x] Question text: at least 20 characters
            - [x] Background color: must be a color in hexadecimal
            - [x] Answer texts: cannot be empty
            - [x] Response Images URL: Must have URL format
            - [x] It is mandatory to enter the correct answer and at least 1 wrong answer. Therefore, it is allowed to have questions with only 2 or 3 answers instead of 4.
        - Quiz levels
            - [x] Level Title: 10 characters minimum
            - [x] % of minimum hit: a number between 0 and 100
            - [x] Level Image URL: Must have URL format
            - [x] Level Description: 30 characters minimum
            - [x] There must be at least 1 level whose % hit is at least 0%
    - [x] some validation fails, a prompted alert should be displayed for the user to fill in the data correctly. For simplicity, do not inform which validation is mandatory.
    - [x] When finishing the creation of the quizz and saving it on the server, the user should see **Screen 3.4: Quiz Success**. On this screen he can click on the quiz (or the "Access Quizz" button) to view the quiz (Screen 2) or go back to home (Screen 1)
    - [x] will return to the user's home or later it should update the quizzes, when to include the created-quiz

- User Quizzes

    - [x] When creating a quiz on the server, it will return as a response the complete object of the created quiz, including the id (unique identifier) ​​that the server generated for this quiz
    - [x] In order to be able to differentiate a user-created quiz from other quizzes in the future, you can store these ids when creating the quiz        
    - [x] On Screen 1: List of Quizzes, you can compare the id of the quizzes coming from the server with those ids stored in the creation of the quizzes to check if a certain quizz was created by the user in question

## BONUS

- Loadings
    - [x] Add a loading screen (according to layout) in all interactions that require communication with the server:
        - Loading the quiz list
        - Loading a quiz
- Display validation errors
    - [x] Change the process of creating/editing quizzes so that, if there are validation problems in the inputs, the errors are indicated below the fields in which they occurred, following the layout provided

### Built with

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

### Contact

[![LinkedIn][linkedin-shield]][linkedin-url]

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=blue
[linkedin-url]: https://www.linkedin.com/in/danielcdoliveira/
