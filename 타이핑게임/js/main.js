//사용변수
const GAME_TIME = 8;
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];
const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

init();

function init() { // 게임세팅용
    buttonChange('게임 로딩 중');
    getWords();
    wordInput.addEventListener('input', checkMatch);
}

//게임실행
function run() {
    if (isPlaying) {
        return;
    }
    isPlaying = true;
    time = GAME_TIME;
    wordInput.focus();
    scoreDisplay.innerTEXT = 0;
    timeInterval = setInterval(countDown, 1000); // 카운트다운을 1초마다 실행하도록
    checkInterval = setInterval(checkStatus, 50);
    buttonChange('게임중!');
}

function checkStatus() {
    if (!isPlaying && time === 0) {
        buttonChange('게임시작');
        clearInterval(checkInterval);
    }
}

//단어불러오기
function getWords() {
    axios.get('https://random-word-api.herokuapp.com/word?number=100')
        .then(function (response) {
            words = response.data;
        })
        .catch(function (error) {
            console.log(error);
        })

    buttonChange('게임시작');
}

// 단어일치 체크
function checkMatch() {
    if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
        wordInput.value = "";
        if (!isPlaying) {
            return
        }
        score++
        scoreDisplay.innerText = score;
        time = GAME_TIME;
        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.innerText = words[randomIndex];

    }
};




function countDown() {
    time > 0 ? time-- : isPlaying = false;  //3항연산자 (조건) ? 참일경우 : 거짓일경우
    if (!isPlaying) {
        clearInterval(timeInterval);
    }
    timeDisplay.innerText = time;
}

function buttonChange(text) {

    button.innerText = text;
    text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading');
}