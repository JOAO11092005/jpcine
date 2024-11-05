const video = document.getElementById('videoPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const timeDisplay = document.getElementById('videoTime');
const seekBar = document.getElementById('videoSeek');
const muteIcon = document.getElementById('muteIcon');
const videoContainer = document.getElementById('videoContainer');
const videoControls = document.querySelector('.video-controls');
const loadingScreen = document.getElementById('loadingScreen');
const loadingPercentage = document.getElementById('loadingPercentage');

let mouseMoveTimeout;

// Função para ocultar controles
function hideControls() {
    videoControls.classList.add('hidden');
}

// Função para mostrar controles
function showControls() {
    videoControls.classList.remove('hidden');
}

// Atualiza o temporizador quando o mouse se move
function resetMouseMoveTimeout() {
    showControls();
    clearTimeout(mouseMoveTimeout);
    mouseMoveTimeout = setTimeout(hideControls, 3000);
}

document.addEventListener('mousemove', resetMouseMoveTimeout);

function togglePlayPause() {
    if (video.paused) {
        video.play().catch(error => console.error("Erro ao iniciar o vídeo:", error));
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        video.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function rewindVideo(seconds) {
    video.currentTime = Math.max(0, video.currentTime - seconds);
}

function forwardVideo(seconds) {
    video.currentTime = Math.min(video.duration || 0, video.currentTime + seconds);
}

function updateProgress() {
    if (!isNaN(video.duration)) {
        seekBar.value = (video.currentTime / video.duration) * 100;
        const minutes = Math.floor(video.currentTime / 60);
        const seconds = Math.floor(video.currentTime % 60).toString().padStart(2, '0');
        timeDisplay.textContent = `${minutes}:${seconds}`;
    }
}

function seekVideo() {
    if (!isNaN(video.duration)) {
        video.currentTime = (seekBar.value / 100) * video.duration;
    }
}

function toggleMute() {
    video.muted = !video.muted;
    muteIcon.className = video.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen().catch(err => console.error(`Erro ao tentar ativar o fullscreen: ${err.message}`));
    } else {
        document.exitFullscreen();
    }
}

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
            loadingScreen.style.display = 'none';
        });

        video.addEventListener('progress', updateLoadingProgress);
    } else {
        console.error("Nenhum link de vídeo encontrado.");
    }
}

function updateLoadingProgress() {
    let buffered = video.buffered;
    if (buffered.length > 0) {
        let loaded = (buffered.end(0) / video.duration) * 100;
        loadingPercentage.textContent = `${Math.round(loaded)}%`;
        loadingScreen.style.display = loaded < 100 ? 'block' : 'none';
    }
}

video.addEventListener('timeupdate', updateProgress);
seekBar.addEventListener('input', seekVideo);
resetMouseMoveTimeout();
window.onload = loadVideo;
