// ===== 퀴즈 데이터 =====
let currentQuestion = 0;
const questions = [
  { text: "Queena isn’t really into matcha.", image: "img/matcha f.png", answer: true },
  { text: "Queena totally loves dachshunds.", image: "img/dachshund.png", answer: true },
  { text: "Queena enjoys going on trips.", image: "img/travel.png", answer: true },
  { text: "Queena can’t deal with cilantro.", image: "img/cilantro.png", answer: true },
];

const qEl = document.getElementById("questionText");
const questionImg = document.getElementById("questionImage");
const profileImg = document.getElementById("profileImg");

const quizWindow = document.getElementById("quizWindow");
const profileWindow = document.getElementById("profileWindow");

const openQuizBtn = document.getElementById("openQuizBtn");
const openProfileBtn = document.getElementById("openProfileBtn");
const restartBtn = document.getElementById("restartBtn");
const closeQuizBtn = document.getElementById("closeQuizBtn");
const closeProfileBtn = document.getElementById("closeProfileBtn");

const btnO = document.getElementById("btnO");
const btnX = document.getElementById("btnX");

// ===== 퀴즈 함수 =====
function showQuestion(){
  if(currentQuestion < questions.length){
    qEl.textContent = questions[currentQuestion].text;
    questionImg.src = questions[currentQuestion].image;
  } else {
    qEl.textContent = "Try it again!";
    questionImg.src = "";
  }
}

function checkAnswer(choice){
  if(currentQuestion >= questions.length) return;
  const correct = questions[currentQuestion].answer;

  // profileWindow 안의 이미지 업데이트
  profileImg.src = choice === correct ? "img/o.png" : "img/x.png";

  currentQuestion++;
  setTimeout(showQuestion, 500);
}

function restartQuiz(){
  currentQuestion = 0;
  profileImg.src = "img/me.PNG";
  showQuestion();
}

// ===== 윈도우 열기/닫기 =====
openQuizBtn.addEventListener("click",()=>{
  quizWindow.style.display="block";
  quizWindow.style.top="50px";
  quizWindow.style.left="50px";
  openQuizBtn.style.display="none";
  showQuestion();
});

closeQuizBtn.addEventListener("click",()=>{
  quizWindow.style.display="none";
  openQuizBtn.style.display="inline-block";
});

openProfileBtn.addEventListener("click",()=>{
  profileWindow.style.display="block";
  profileWindow.style.top="50px";
  profileWindow.style.left="400px";
});

closeProfileBtn.addEventListener("click",()=>{
  profileWindow.style.display="none";
});

restartBtn.addEventListener("click", restartQuiz);

// 퀴즈 버튼
btnO.addEventListener("click",()=>checkAnswer(true));
btnX.addEventListener("click",()=>checkAnswer(false));

// ===== 드래그 기능 =====
function makeDraggable(win){
  const header = win.querySelector(".window-header");
  header.onmousedown = dragMouseDown;
  function dragMouseDown(e){
    e.preventDefault();
    let startX = e.clientX;
    let startY = e.clientY;
    const rect = win.getBoundingClientRect();
    const offsetX = startX - rect.left;
    const offsetY = startY - rect.top;

    function onMouseMove(e){
      win.style.left = (e.clientX - offsetX) + "px";
      win.style.top = (e.clientY - offsetY) + "px";
    }

    function onMouseUp(){
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }
}

makeDraggable(quizWindow);
makeDraggable(profileWindow);


// ===== 배경 구름/해/새 애니메이션 =====
function createSkyObject(type){
  const obj = document.createElement("div");
  obj.classList.add("sky-object", type);

  // 초기 위치
  obj.style.top = Math.random() * (window.innerHeight - 50) + "px";
  obj.style.left = -50 + "px"; // 왼쪽 밖에서 시작
  document.body.appendChild(obj);

  const speed = 0.2 + Math.random() * 0.5; // 속도
  function move(){
    let left = parseFloat(obj.style.left);
    left += speed;
    if(left > window.innerWidth){
      left = -50; // 다시 왼쪽에서 시작
      obj.style.top = Math.random() * (window.innerHeight - 50) + "px";
    }
    obj.style.left = left + "px";
    requestAnimationFrame(move);
  }
  move();
}

// 여러 개 생성
for(let i=0;i<5;i++) createSkyObject("cloud");
for(let i=0;i<2;i++) createSkyObject("bird");
createSkyObject("sun"); // 해는 하나

