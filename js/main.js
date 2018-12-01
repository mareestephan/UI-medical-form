//Questions array

const questions = [
    { question: ' Enter First Name' },
    { question: ' Enter Second Name' },
    { question: ' Enter Email', pattern: /\S+@\S+\.\S+/ },
    { question: 'Mobile Number' },
    { question: 'Male / Female' },
    { question: 'Date of Birth' }


    // { question: 'Create a Password', type: 'password' }

]


//Transition times

const shakeTime = 100; //Shake transition time
const switchTime = 200; // Transition between questions

//Position of the question/ which number/wuestions

let position = 0;

//Init DOM Elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

//EVENTS

//GET/show question on DOM Load
document.addEventListener('DOMContentLoaded', getQuestion);


nextBtn.addEventListener('click', validate);

// INput field use enter to submit

inputField.addEventListener('keyup', e => {
    if (e.keyCode == 13) {
        validate();
    }
});






//FUNCTIONs

//Retrieve question from array and populate input area

function getQuestion() {

    //Get the wuestion
    inputLabel.innerHTML = questions[position].question;

    //Answer/question type

    inputField.type = questions[position].type || 'text';

    //Get answer from input
    inputField.value = questions[position].answer || '';

    //focus on the element
    inputField.focus();

    //progress bar
    progress.style.width = (position * 100) / questions.length + '%';

    //Add icon to first question - user/back arrow
    prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

    showQuestion();


}

//Display questio with JS
function showQuestion() {
    inputGroup.style.opacity = 1;
    inputProgress.style.transition = 0;
    inputProgress.style.width = '100%';

}


//Hide question after is was completed

function hideQuestion() {
    inputGroup.style.opacity = 1;
    inputLabel.style.marginLeft = 0;

    inputProgress.style.width = 0
    inputProgress.style.transition = 'none';
    inputGroup.style.border = null;
}

//Transform to shake motion when failed

function transform(x, y) {


    formBox.style.transform = `translate(${x}px, ${y}px)`

}

//validate field function

function validate() {
    //check if pattern matches

    if (!inputField.value.match(questions[position].pattern || /.+/)
    ) {
        inputFail();

    } else {
        inputPass();
    }
}

//Field input fail

function inputFail() {

    formBox.className = 'error';
    //Loop shake motion - 'i' will be number of shakes/motions

    for (let i = 0; i < 6; i++) {
        setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
        setTimeout(transform, shakeTime * 6, 0, 0);
        inputField.focus();

    }


}

//Field input pass
function inputPass() {
    formBox.className = '';
    setTimeout(transform, shakeTime * 0, 0, 10);
    setTimeout(transform, shakeTime * 1, 0, 0);

    //Store answer in a n array
    questions[position].answer = inputField.value;

    // Increment the position which starts at 0
    position++;

    //If new question, HIde current and show next Q

    if (questions[position]) {
        hideQuestion();
        getQuestion();

    } else {
        //Remove array has run through
        hideQuestion();
        formBox.className = 'close';
        progress.style.width = '100%';

        //Form complete/FINISHED

        formComplete();
    }

}


//message after form is completed 

function formComplete() {
    console.log(questions)
    const h1 = document.createElement('h1');

    h1.classList.add('end');

    h1.appendChild(document.createTextNode(`Thanks ${questions[0].answer}. You are registered and will receive a notification shortly`))
    setTimeout(() => {
        formBox.parentElement.appendChild(h1);
        setTimeout(() => (h1.style.opacity = 1), 50);
    }, 1000);
}