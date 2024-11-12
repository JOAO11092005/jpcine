// youtube.js

document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("videoPlayer");
  const videoTime = document.getElementById("videoTime");
  const videoSeek = document.getElementById("videoSeek");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const muteIcon = document.getElementById("muteIcon");
  const loader = document.getElementById("loader");

  let audioElement;

  // Função para carregar mídia a partir dos links
  function loadMedia() {
      const videoUrl = document.getElementById("videoUrl").value;
      const audioUrl = document.getElementById("audioUrl").value;

      if (videoUrl && audioUrl) {
          // Define o vídeo
          video.src = videoUrl;
          video.load();

          // Cria o elemento de áudio e carrega
          if (audioElement) {
              audioElement.remove(); // Remove o áudio anterior se existir
          }
          audioElement = new Audio(audioUrl);
          audioElement.load();

          video.addEventListener("play", () => audioElement.play());
          video.addEventListener("pause", () => audioElement.pause());
          video.addEventListener("seeked", () => audioElement.currentTime = video.currentTime);

          audioElement.addEventListener("timeupdate", synchronizeVideoAudio);

          video.play();
      } else {
          alert("Por favor, insira os links de vídeo e áudio.");
      }
  }

  // Função para reproduzir ou pausar o vídeo e o áudio ao mesmo tempo
  function togglePlayPause() {
      if (video.paused) {
          video.play();
          playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
          video.pause();
          playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      }
  }

  // Sincroniza o áudio com o vídeo
  function synchronizeVideoAudio() {
      const videoTime = video.currentTime;
      const audioTime = audioElement.currentTime;

      if (Math.abs(videoTime - audioTime) > 0.3) {
          loader.classList.remove("hidden");
          audioElement.currentTime = videoTime;
          loader.classList.add("hidden");
      }
  }

  // Configuração dos controles de volume e tela cheia
  function toggleMute() {
      video.muted = !video.muted;
      muteIcon.className = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
  }

  function toggleFullscreen() {
      if (video.requestFullscreen) {
          video.requestFullscreen();
      }
  }

  // Botão de play/pause no clique no vídeo
  video.addEventListener("click", togglePlayPause);
  video.addEventListener("timeupdate", () => {
      videoTime.textContent = `${Math.floor(video.currentTime / 60)}:${('0' + Math.floor(video.currentTime % 60)).slice(-2)}`;
      videoSeek.value = (video.currentTime / video.duration) * 100;
  });

  window.loadMedia = loadMedia;
  window.togglePlayPause = togglePlayPause;
  window.toggleMute = toggleMute;
  window.toggleFullscreen = toggleFullscreen;
});
