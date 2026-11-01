// --- JALANKAN OTOMATIS SAAT WEB DIBUKA ---
document.addEventListener("DOMContentLoaded", function() {
    setInterval(createElegantPetal, 1200);
    for(let i = 0; i < 6; i++) {
        setTimeout(createElegantPetal, i * 400);
    }
});

// --- FUNGSI BUNGA JATUH ELEGAN ---
function createElegantPetal() {
    const page1 = document.getElementById('page1');
    if (page1 && page1.style.display === 'none') return;

    const petal = document.createElement('div');
    petal.classList.add('elegant-petal');
    
    petal.style.left = Math.random() * 100 + 'vw';
    const size = Math.random() * 10 + 12; 
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    petal.style.animationDuration = (Math.random() * 6 + 9) + 's'; 
    
    document.body.appendChild(petal);
    setTimeout(() => { petal.remove(); }, 16000);
}

// --- FUNGSI VIDEO (Tombol 3) ---
function playVideo() {
    const overlay = document.getElementById('video-overlay');
    const video = document.getElementById('my-video');
    overlay.classList.add('active');
    setTimeout(() => { video.play(); }, 1500);
}

function closeVideo() {
    const overlay = document.getElementById('video-overlay');
    const video = document.getElementById('my-video');
    video.pause();
    overlay.classList.remove('active');
}

// ==========================================
// --- LOGIKA MINI GAME KUIS ---
// ==========================================
let currentQuestionIndex = 0;
let score = 0;
let activeQuizQuestions = [];

const quizAboutMe = [
    { question: "Apa makanan fav aku?", options: ["Seafood", "Nasi Goreng", "Mie Kuah", "MBG"], correct: 0 },
    { question: "Apa minuman supermarket fav aku?", options: ["Susu", "Teh kotak", "Teh pucuk", "Kopi"], correct: 1 },
    { question: "Apa warna fav aku?", options: ["Hitam pekat", "Biru navy", "Merah maroon", "Hijau tua"], correct: 1 },
    { question: "Apa hobi aku?", options: ["Ngobrol", "Olahraga", "Tidur", "Nonton film"], correct: 1 },
    { question: "Apa love language aku?", options: ["Words of affirmation", "Quality time", "Menyesuaikan kamu", "Physical touch"], correct: 2 },
    { question: "Aku lebih suka suasana ramai atau tenang?", options: ["Ramai dan seru", "Tenang", "Dua-duanya suka", "Biasa saja"], correct: 1 },
    { question: "Aku lebih suka liburan ke mana?", options: ["Pantai", "Gunung", "Air terjun", "Taman kota"], correct: 0 },
    { question: "Menurut kamu, apa sifat paling menonjol dari aku?", options: ["Pendiam", "Serius terus", "Random (bokem)", "Cuek banget"], correct: 2 },
    { question: "Aku lebih suka tidur dalam keadaan terang atau gelap?", options: ["Terang benderang", "Remang-remang", "Gelap", "Asal ada suara"], correct: 2 },
    { question: "Buah favorit aku?", options: ["Nanas", "Apel", "Semangka", "Durian"], correct: 3 }
];

const quizOurStory = [
    { question: "Kapan kita jadian?", options: ["10 September 2026", "10 October 2026", "11 October 2026", "10 November 2026"], correct: 1 },
    { question: "Kapan dan di mana kita pertama kali ketemu?", options: ["Di pecel ayam stasiun poncol semarang", "Di kedai kopi stasiun poncol semarang", "Di pecel lele stasiun tawang semarang", "Di pecel ayam stasiun tawang semarang"], correct: 0 },
    { question: "Di mana kita pertama kali voice chat berdua?", options: ["WhatsApp (WA)", "Instagram (IG)", "Discord", "Roblox"], correct: 2 }
];

function mulaiGameAboutMe() {
    activeQuizQuestions = quizAboutMe;
    jalankanGame();
}

function mulaiGameOurStory() {
    activeQuizQuestions = quizOurStory;
    jalankanGame();
}

function jalankanGame() {
    const curtainLeft = document.getElementById('curtain-left');
    const curtainRight = document.getElementById('curtain-right');
    const page1 = document.getElementById('page1');
    const pageGame = document.getElementById('page-game');

    curtainLeft.classList.add('closed');
    curtainRight.classList.add('closed');

    setTimeout(() => {
        page1.style.display = 'none';
        pageGame.style.display = 'block';
        
        currentQuestionIndex = 0;
        score = 0;
        document.getElementById('quiz-container').style.display = 'block';
        document.getElementById('quiz-result').style.display = 'none';
        
        updateCharacterEmotion();
        muatPertanyaan();

        curtainLeft.classList.remove('closed');
        curtainRight.classList.remove('closed');
    }, 1200);
}

function muatPertanyaan() {
    const q = activeQuizQuestions[currentQuestionIndex];
    document.getElementById('question-text').innerText = `Quest ${currentQuestionIndex + 1} of ${activeQuizQuestions.length}: ${q.question}`;
    
    const optionsGroup = document.getElementById('options-group');
    optionsGroup.innerHTML = "";

    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.innerText = option;
        btn.onclick = () => cekJawaban(index, q.correct);
        optionsGroup.appendChild(btn);
    });
}

function cekJawaban(selectedIndex, correctIndex) {
    if (correctIndex === "ALL" || selectedIndex === correctIndex) {
        score++;
    }

    currentQuestionIndex++;
    updateCharacterEmotion();

    if (currentQuestionIndex < activeQuizQuestions.length) {
        muatPertanyaan();
    } else {
        tampilkanHasil();
    }
}

// --- FUNGSI MENGUBAH BENTUK WAJAH KARAKTER SECARA SMOOTH (SVG) ---
function updateCharacterEmotion() {
    const mouth = document.getElementById('char-mouth');
    const eyes = document.getElementById('char-eyes');
    if (!mouth) return;

    const ratio = score / (currentQuestionIndex || 1);

    if (currentQuestionIndex === 0) {
        // Netral
        mouth.setAttribute("d", "M 45 75 Q 60 82 75 75");
        eyes.innerHTML = '<circle cx="42" cy="50" r="5" fill="#4a5d4e"/><circle cx="78" cy="50" r="5" fill="#4a5d4e"/>';
    } else if (ratio >= 0.7) {
        // Sangat Senyum Lebar / Happy (> 70% benar)
        mouth.setAttribute("d", "M 40 70 Q 60 98 80 70");
        eyes.innerHTML = '<path d="M 37 48 Q 42 42 47 48" fill="none" stroke="#4a5d4e" stroke-width="3" stroke-linecap="round"/><path d="M 73 48 Q 78 42 83 48" fill="none" stroke="#4a5d4e" stroke-width="3" stroke-linecap="round"/>';
    } else if (ratio >= 0.4) {
        // Senyum Biasa
        mouth.setAttribute("d", "M 43 73 Q 60 88 77 73");
        eyes.innerHTML = '<circle cx="42" cy="50" r="5" fill="#4a5d4e"/><circle cx="78" cy="50" r="5" fill="#4a5d4e"/>';
    } else {
        // Sedih / Cemberut (< 40% benar)
        mouth.setAttribute("d", "M 45 82 Q 60 68 75 82");
        eyes.innerHTML = '<circle cx="42" cy="52" r="4" fill="#4a5d4e"/><circle cx="78" cy="52" r="4" fill="#4a5d4e"/>';
    }
}

function tampilkanHasil() {
    document.getElementById('quiz-container').style.display = 'none';
    const resultDiv = document.getElementById('quiz-result');
    const resultText = document.getElementById('result-text');
    
    resultDiv.style.display = 'block';

    let pesanUlasan = "";
    if (score >= activeQuizQuestions.length - 1) {
        pesanUlasan = `Score: ${score}/${activeQuizQuestions.length} (Amazing! 🎉)<br>Kamu benar-benar mengenal aku dengan sangat baik! ❤️`;
    } else {
        pesanUlasan = `Score: ${score}/${activeQuizQuestions.length}<br>Seru banget kan? Nanti kita bahas lagi ya! ✨`;
    }

    resultText.innerHTML = pesanUlasan;
}

function keluarGame() {
    const curtainLeft = document.getElementById('curtain-left');
    const curtainRight = document.getElementById('curtain-right');
    const page1 = document.getElementById('page1');
    const pageGame = document.getElementById('page-game');

    curtainLeft.classList.add('closed');
    curtainRight.classList.add('closed');

    setTimeout(() => {
        pageGame.style.display = 'none';
        page1.style.display = 'block';
        curtainLeft.classList.remove('closed');
        curtainRight.classList.remove('closed');
    }, 1200);
}