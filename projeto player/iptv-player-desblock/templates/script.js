const video = document.getElementById("videoPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const timeDisplay = document.getElementById("videoTime");
const seekBar = document.getElementById("videoSeek");
const muteIcon = document.getElementById("muteIcon");
const videoContainer = document.getElementById("videoContainer");
const loader = document.getElementById("loader");

// Função para alternar entre reproduzir e pausar o vídeo e atualizar o ícone
function togglePlayPause() {
    if (video.paused || video.ended) {
        video.play().catch(error => console.error("Erro ao iniciar o vídeo:", error));
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        video.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

// Função para avançar o vídeo em segundos
function forwardVideo(seconds) {
    video.currentTime = Math.min(video.duration || 0, video.currentTime + seconds);
}

// Função para retroceder o vídeo em segundos
function rewindVideo(seconds) {
    video.currentTime = Math.max(0, video.currentTime - seconds);
}

// Função para atualizar a barra de progresso e o display de tempo do vídeo
function updateProgress() {
    if (!isNaN(video.duration)) {
        seekBar.value = (video.currentTime / video.duration) * 100;
        const minutes = Math.floor(video.currentTime / 60);
        const seconds = Math.floor(video.currentTime % 60).toString().padStart(2, '0');
        timeDisplay.textContent = `${minutes}:${seconds}`;
    }
}

// Função para buscar para um ponto específico do vídeo
function seekVideo() {
    if (!isNaN(video.duration)) {
        video.currentTime = (seekBar.value / 100) * video.duration;
    }
}

// Função para alternar entre mudo e som e atualizar o ícone de volume
function toggleMute() {
    video.muted = !video.muted;
    muteIcon.className = video.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
}

// Função para alternar o modo de tela cheia
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen().catch(err => console.error(`Erro ao tentar ativar o fullscreen: ${err.message}`));
    } else {
        document.exitFullscreen();
    }
}

// Função para carregar o vídeo a partir do URL codificado
function loadVideo() {
    const params = new URLSearchParams(window.location.search);
    const videoUrlCodificada = params.get('videoUrl');

    if (videoUrlCodificada) {
        const videoUrl = atob(videoUrlCodificada);
        console.log("URL decodificada:", videoUrl);

        video.src = videoUrl;
        video.volume = 1.0;
        video.muted = false;
        video.load();

        video.addEventListener('canplay', () => {
            video.play().catch(error => console.error("Erro ao iniciar o vídeo:", error));
            loader.classList.add("hidden");
        });

        video.addEventListener('progress', updateLoadingProgress);
    } else {
        console.error("Nenhum link de vídeo encontrado.");
    }
}

// Função para atualizar o progresso do carregamento do vídeo
function updateLoadingProgress() {
    let buffered = video.buffered;
    if (buffered.length > 0) {
        let loaded = (buffered.end(0) / video.duration) * 100;
        loader.textContent = `Carregando... ${Math.round(loaded)}%`;
        loader.style.display = loaded < 100 ? 'block' : 'none';
    }
}

// Atualiza o progresso do vídeo e tempo durante a reprodução
video.addEventListener("timeupdate", updateProgress);
seekBar.addEventListener("input", seekVideo);

// Mostra o indicador de carregamento quando o vídeo está em espera para carregar
video.addEventListener("waiting", () => {
    loader.style.display = 'block';
});

// Oculta o indicador de carregamento quando o vídeo começa a reproduzir
video.addEventListener("playing", () => {
    loader.style.display = 'none';
});

// Inicializa o vídeo ao carregar a página
window.onload = loadVideo;
