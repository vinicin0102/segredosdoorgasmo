/* ============================================
   QUIZ - SEGREDOS DO ORGASMO
   JavaScript - Lógica do Quiz
   ============================================ */

const CONFIG = {
    // Link do Checkout - EDITAR AQUI
    checkoutUrl: "https://pay.kirvano.com/46a3c7a3-ea65-4e76-8026-e01fa8f55c56",

    // Número total de perguntas
    totalQuestions: 17,
    analysisTime: 5000,
    countdownTime: 15 * 60,
    fbPixelId: "SEU_PIXEL_ID_AQUI",
    utmParams: {}
};

let currentScreen = 0;
let answers = {};
let countdownInterval;

function initQuiz() {
    captureUTMParams();
    const ctaButton = document.getElementById('ctaButton');
    if (ctaButton) ctaButton.href = buildCheckoutUrl();
    updateProgress(0);
}

function confirmAge() {
    currentScreen = 1; showScreen(currentScreen); updateProgress(1);
    trackEvent('AgeConfirmed'); trackEvent('QuizStarted');
}

function selectOption(button, questionNumber) {
    const allOptions = button.parentElement.querySelectorAll('.option-btn-red, .card-option');
    allOptions.forEach(opt => opt.classList.remove('selected'));
    button.classList.add('selected');
    const optionText = button.textContent.trim();
    answers[questionNumber] = optionText;
    trackEvent('QuestionAnswered', { question: questionNumber, answer: optionText });
    setTimeout(() => { nextQuestion(questionNumber); }, 400);
}

function nextQuestion(currentQuestion) {
    if (currentQuestion === 1) { showScreen('new'); updateProgress(2); }
    else if (currentQuestion === 'new') { showScreen(2); updateProgress(3); }
    else if (currentQuestion === 4) { showScreen('s1'); updateProgress(6); }
    else if (currentQuestion === 's1') { showScreen('s2'); updateProgress(7); }
    else if (currentQuestion === 's2') { showScreen('s3'); updateProgress(8); }
    else if (currentQuestion === 's3') { showScreen('video'); updateProgress(9); }
    else if (currentQuestion === 'video') { showScreen('s4'); updateProgress(10); }
    else if (currentQuestion === 's4') { showScreen('s5'); updateProgress(11); }
    else if (currentQuestion === 's5') { showScreen('stats'); updateProgress(11); }
    else if (currentQuestion === 'stats') { showScreen('social'); updateProgress(12); }
    else if (currentQuestion === 'social') { showScreen('belief'); updateProgress(13); }
    else if (currentQuestion === 'belief') { showScreen(5); updateProgress(14); }
    else if (currentQuestion < 7) {
        let next = currentQuestion + 1; showScreen(next);
        if (next === 3) updateProgress(4);
        if (next === 4) updateProgress(5);
        if (next === 6) updateProgress(15);
        if (next === 7) updateProgress(16);
    } else { showAnalyzingScreen(); }
}

function showScreen(screenNumber) {
    document.querySelectorAll('.quiz-screen').forEach(screen => { screen.classList.remove('active'); });

    let screenId;
    if (screenNumber === 0 || screenNumber === 'age') screenId = 'screen-age';
    else if (screenNumber === 'new') screenId = 'screen-new';
    else if (['s1', 's2', 's3', 's4', 's5', 'stats', 'social', 'belief', 'video'].includes(screenNumber)) screenId = `screen-${screenNumber}`;
    else if (typeof screenNumber === 'number') screenId = `screen-${screenNumber}`;
    else if (screenNumber === 'analyzing') screenId = 'screen-analyzing';
    else if (screenNumber === 'result') screenId = 'screen-result';

    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (screenId === 'screen-video') {
            const video = document.getElementById('quiz-video');
            if (video) video.play().catch(e => console.log('Autoplay blocked'));
        }
        if (screenId === 'screen-s1') {
            const video = document.getElementById('video-intro');
            if (video) video.play().catch(e => console.log('Autoplay intro blocked'));
        }

        // TIMER OFERTA ROBUSTO (Para Mobile) - 6 MIN 55 SEG
        if (screenId === 'screen-result') {
            // INJEÇÃO DINÂMICA DO VSL (Local Video)
            const vslPlaceholder = document.getElementById('vsl-placeholder');

            if (vslPlaceholder && !vslPlaceholder.querySelector('video')) {
                console.log("-> RESULTADO: Injetando Player VSL Local...");
                vslPlaceholder.innerHTML = `
                    <video id="vsl-video" width="100%" controls autoplay playsinline style="border-radius: 12px; box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);">
                        <source src="images/Ramon Pereira - Sexólogo.mp4" type="video/mp4">
                        Seu navegador não suporta vídeos.
                    </video>
                `;
            }

            const offerContent = document.getElementById('offer-content');
            console.log("-> RESULTADO: Iniciando timer robusto (415s / 6m55s)...");

            if (offerContent) {
                offerContent.style.display = 'none';
                offerContent.style.opacity = '0';

                // Tempo alvo: 470 segundos (7m 50s)
                const targetDelay = 470 * 1000;
                const startTime = Date.now();

                // Sistema de verificação contínua (Previne falha em suspensão mobile)
                const timerCheck = setInterval(() => {
                    const elapsed = Date.now() - startTime;

                    if (elapsed >= targetDelay) {
                        clearInterval(timerCheck); // Para a verificação
                        console.log("-> TIMER DISPAROU: Mostrando oferta agora!");

                        offerContent.style.display = 'block';
                        // Efeito fade-in
                        setTimeout(() => {
                            offerContent.style.opacity = '1';
                        }, 100);
                    }
                }, 1000); // Check a cada 1 segundo
            }
        }
    }
}

function updateProgress(step) {
    const progressBar = document.getElementById('progressBar');
    const totalSteps = CONFIG.totalQuestions + 2;
    if (progressBar) progressBar.style.width = `${(step / totalSteps) * 100}%`;
}

function showAnalyzingScreen() {
    showScreen('analyzing'); updateProgress(CONFIG.totalQuestions + 1); animateAnalysisSteps();
}

function animateAnalysisSteps() {
    const steps = document.querySelectorAll('.step');
    const stepDelay = CONFIG.analysisTime / (steps.length + 1);
    steps.forEach((step, index) => {
        setTimeout(() => { step.classList.add('completed'); const icon = step.querySelector('.step-icon'); if (icon) icon.textContent = '✅'; }, stepDelay * (index + 1));
    });
    setTimeout(() => { showResultScreen(); }, CONFIG.analysisTime);
}

function showResultScreen() {
    showScreen('result'); updateProgress(CONFIG.totalQuestions + 2); startCountdown(); trackEvent('QuizCompleted', { answers: answers }); captureLead();
}

function startCountdown() {
    let timeLeft = CONFIG.countdownTime;
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    function updateCountdown() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        if (timeLeft <= 0) { clearInterval(countdownInterval); countdownElement.textContent = "EXPIRADO"; }
        timeLeft--;
    }
    updateCountdown(); countdownInterval = setInterval(updateCountdown, 1000);
}

function captureUTMParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'src', 'fbclid'];
    utmKeys.forEach(key => {
        const value = urlParams.get(key);
        if (value) CONFIG.utmParams[key] = value;
    });
}
function buildCheckoutUrl() {
    let url = CONFIG.checkoutUrl;
    const params = new URLSearchParams(CONFIG.utmParams);
    if (params.toString()) url += (url.includes('?') ? '&' : '?') + params.toString();
    return url;
}
function trackEvent(eventName, params = {}) { console.log('Event:', eventName, params); }
function captureLead() { localStorage.setItem('quizLead', JSON.stringify({ answers: answers, timestamp: new Date() })); }

document.addEventListener('DOMContentLoaded', function () { initQuiz(); });
