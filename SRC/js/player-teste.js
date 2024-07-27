// Função para carregar episódios a partir do JSON
function carregarEpisodios() {
    fetch('./Animes/episodios.json')
        .then(response => response.json())
        .then(data => {
            const episodiosList = document.getElementById('episodiosList');
            const serie = data['Dragon Ball Super'];
            episodiosList.innerHTML = ''; // Limpar lista de episódios
            let primeiroEpisodio = null;
            
            serie.episodios.forEach((episodio, index) => {
                const li = document.createElement('li');
                const linkText = episodio.link === "indisponível no momento" ? 'Indisponível' : `<a href="#" data-link="${episodio.link}">Assistir</a>`;
                li.innerHTML = `Ep ${episodio.numero}: ${episodio.titulo} - ${linkText}`;
                episodiosList.appendChild(li);
                
                // Armazena o primeiro episódio disponível
                if (!primeiroEpisodio && episodio.link !== "indisponível no momento") {
                    primeiroEpisodio = episodio.link;
                }
            });

            // Carregar o primeiro episódio disponível no player
            if (primeiroEpisodio) {
                const videoPlayer = document.getElementById('videoPlayer');
                videoPlayer.src = primeiroEpisodio;
                videoPlayer.play();
            }
        })
        .catch(error => console.error('Erro ao carregar episódios:', error));
}

// Inicializar
window.onload = function() {
    carregarEpisodios();
};

// Manipular clique no link de episódio
document.addEventListener('click', (event) => {
    if (event.target.tagName === 'A' && event.target.dataset.link) {
        event.preventDefault();
        const videoPlayer = document.getElementById('videoPlayer');
        videoPlayer.src = event.target.dataset.link;
        videoPlayer.play();
    }
});

const container = document.querySelector(".container");
const mainVideo = container.querySelector("video");
const videoTimeline = container.querySelector(".video-timeline");
const progressBar = container.querySelector(".progress-bar");
const volumeBtn = container.querySelector(".volume i");
const volumeSlider = container.querySelector(".left input");
const currentVidTime = container.querySelector(".current-time");
const videoDuration = container.querySelector(".video-duration");
const skipBackward = container.querySelector(".skip-backward i");
const skipForward = container.querySelector(".skip-forward i");
const playPauseBtn = container.querySelector(".play-pause i");
const speedBtn = container.querySelector(".playback-speed span");
const speedOptions = container.querySelector(".speed-options");
const pipBtn = container.querySelector(".pic-in-pic span");
const fullScreenBtn = container.querySelector(".fullscreen i");
const continuarBtn = document.getElementById('continuar-btn');
let timer;

const hideControls = () => {
    if(mainVideo.paused) return;
    timer = setTimeout(() => {
        container.classList.remove("show-controls");
    }, 3000);
}
hideControls();

container.addEventListener("mousemove", () => {
    container.classList.add("show-controls");
    clearTimeout(timer);
    hideControls();   
});

const formatTime = time => {
    let seconds = Math.floor(time % 60),
        minutes = Math.floor(time / 60) % 60,
        hours = Math.floor(time / 3600);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    if(hours == 0) {
        return `${minutes}:${seconds}`
    }
    return `${hours}:${minutes}:${seconds}`;
}

videoTimeline.addEventListener("mousemove", e => {
    let timelineWidth = videoTimeline.clientWidth;
    let offsetX = e.offsetX;
    let percent = Math.floor((offsetX / timelineWidth) * mainVideo.duration);
    const progressTime = videoTimeline.querySelector("span");
    offsetX = offsetX < 20 ? 20 : (offsetX > timelineWidth - 20) ? timelineWidth - 20 : offsetX;
    progressTime.style.left = `${offsetX}px`;
    progressTime.innerText = formatTime(percent);
});

videoTimeline.addEventListener("click", e => {
    let timelineWidth = videoTimeline.clientWidth;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
});

mainVideo.addEventListener("timeupdate", e => {
    let {currentTime, duration} = e.target;
    let percent = (currentTime / duration) * 100;
    progressBar.style.width = `${percent}%`;
    currentVidTime.innerText = formatTime(currentTime);

    // Exibir o botão "Continuar" quando o vídeo atingir 23:51
    if (currentTime >= 1431) {
        continuarBtn.style.display = 'block';
    } else {
        continuarBtn.style.display = 'none';
    }
});

mainVideo.addEventListener("loadeddata", () => {
    videoDuration.innerText = formatTime(mainVideo.duration);
});

const draggableProgressBar = e => {
    let timelineWidth = videoTimeline.clientWidth;
    progressBar.style.width = `${e.offsetX}px`;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
    currentVidTime.innerText = formatTime(mainVideo.currentTime);
}

volumeBtn.addEventListener("click", () => {
    if(!volumeBtn.classList.contains("fa-volume-high")) {
        mainVideo.volume = 0.5;
        volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
    } else {
        mainVideo.volume = 0.0;
        volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    volumeSlider.value = mainVideo.volume;
});

volumeSlider.addEventListener("input", e => {
    mainVideo.volume = e.target.value;
    if(e.target.value == 0) {
        return volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
});

speedOptions.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", () => {
        mainVideo.playbackRate = option.dataset.speed;
        speedOptions.querySelector(".active").classList.remove("active");
        option.classList.add("active");
    });
});

document.addEventListener("click", e => {
    if(e.target.tagName !== "SPAN" || e.target.className !== "material-symbols-rounded") {
        speedOptions.classList.remove("show");
    }
});

fullScreenBtn.addEventListener("click", () => {
    container.classList.toggle("fullscreen");
    if(document.fullscreenElement) {
        fullScreenBtn.classList.replace("fa-compress", "fa-expand");
        return document.exitFullscreen();
    }
    fullScreenBtn.classList.replace("fa-expand", "fa-compress");
    container.requestFullscreen();
});

speedBtn.addEventListener("click", () => speedOptions.classList.toggle("show"));
pipBtn.addEventListener("click", () => mainVideo.requestPictureInPicture());
skipBackward.addEventListener("click", () => mainVideo.currentTime -= 5);
skipForward.addEventListener("click", () => mainVideo.currentTime += 5);
mainVideo.addEventListener("play", () => playPauseBtn.classList.replace("fa-play", "fa-pause"));
mainVideo.addEventListener("pause", () => playPauseBtn.classList.replace("fa-pause", "fa-play"));
playPauseBtn.addEventListener("click", () => mainVideo.paused ? mainVideo.play() : mainVideo.pause());
videoTimeline.addEventListener("mousedown", () => videoTimeline.addEventListener("mousemove", draggableProgressBar));
document.addEventListener("mouseup", () => videoTimeline.removeEventListener("mousemove", draggableProgressBar));

// Manipular clique no botão "Continuar"
continuarBtn.addEventListener('click', function() {
    alert('Você clicou em Continuar!');
    // Adicione aqui a lógica que desejar para o botão "Continuar"
});
