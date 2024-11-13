// Função para sanitizar o caminho do Firebase (remover caracteres inválidos)
function sanitizePath(path) {
    return path.replace(/[.#$\[\]]/g, '_'); // Substitui caracteres inválidos por '_'
}

// Inicialização do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBh1S9IfuLWEa3t3us47yye6NuY5DPCm8k",
    authDomain: "jpcine-b36ff.firebaseapp.com",
    databaseURL: "https://jpcine-b36ff-default-rtdb.firebaseio.com",
    projectId: "jpcine-b36ff",
    storageBucket: "jpcine-b36ff.appspot.com",
    messagingSenderId: "123637183843",
    appId: "1:123637183843:web:10b55a276c398408010f56",
    measurementId: "G-RWPZQ5G3CR"
};
firebase.initializeApp(firebaseConfig);

// Pega o agente do usuário (user agent) e sanitiza o caminho
let userAgent = navigator.userAgent;
let sanitizedPath = sanitizePath(userAgent);

// Referência ao vídeo
const videoPlayer = document.getElementById("videoPlayer");
const videoSeek = document.getElementById("videoSeek");
const videoTime = document.getElementById("videoTime");
const videoTimeRemaining = document.getElementById("videoTimeRemaining");

// Função para salvar o progresso
function salvarProgresso() {
    const progresso = videoPlayer.currentTime; // Tempo em segundos
    firebase.database().ref('progresso/' + sanitizedPath).set({
        progresso: progresso
    }).then(() => {
        console.log('Progresso salvo com sucesso');
    }).catch((error) => {
        console.error('Erro ao salvar o progresso:', error);
    });
}

// Função para carregar o progresso
function carregarProgresso() {
    firebase.database().ref('progresso/' + sanitizedPath).once('value')
        .then(snapshot => {
            if (snapshot.exists()) {
                let progresso = snapshot.val().progresso;
                videoPlayer.currentTime = progresso; // Define o progresso como o tempo salvo
                console.log('Progresso carregado: ' + progresso);
            }
        }).catch((error) => {
            console.error('Erro ao carregar o progresso:', error);
        });
}

// Event listener para salvar o progresso periodicamente
videoPlayer.addEventListener('timeupdate', () => {
    salvarProgresso();
});

// Carregar o progresso quando o vídeo for carregado
window.onload = function () {
    carregarProgresso();
};

// Funções de controle de vídeo
function togglePlayPause() {
    if (videoPlayer.paused) {
        videoPlayer.play();
    } else {
        videoPlayer.pause();
    }
}

function rewindVideo(seconds) {
    videoPlayer.currentTime -= seconds;
}

function forwardVideo(seconds) {
    videoPlayer.currentTime += seconds;
}

function toggleMute() {
    videoPlayer.muted = !videoPlayer.muted;
}

function toggleFullscreen() {
    if (videoPlayer.requestFullscreen) {
        videoPlayer.requestFullscreen();
    } else if (videoPlayer.mozRequestFullScreen) {
        videoPlayer.mozRequestFullScreen();
    } else if (videoPlayer.webkitRequestFullscreen) {
        videoPlayer.webkitRequestFullscreen();
    }
}

// Atualiza a interface do usuário (tempo atual e tempo restante)
setInterval(() => {
    videoTime.textContent = formatTime(videoPlayer.currentTime);
    videoTimeRemaining.textContent = formatTime(videoPlayer.duration - videoPlayer.currentTime);
    videoSeek.value = (videoPlayer.currentTime / videoPlayer.duration) * 100;
}, 1000);

// Função para formatar o tempo (segundos) em formato HH:MM:SS
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600); // Calcular horas
    const minutes = Math.floor((seconds % 3600) / 60); // Calcular minutos
    const secondsLeft = Math.floor(seconds % 60); // Calcular segundos restantes

    return `${hours > 0 ? hours + ":" : ""}${minutes < 10 ? "0" : ""}${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
}
