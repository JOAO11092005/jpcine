// Configuração do filme e dos intervalos para pular
const movieConfig = {
    url: 'https://jpcinefilmes.b-cdn.net/oppenheimer.mp4', // Substitua pelo link do filme que você deseja
    skipSegments: [
        { start: '00:23:13', end: '00:24:47' },
        { start: '00:74:41', end: '00:77:09' }, 
        
    ]
};

// Função para converter o tempo no formato HH:MM:SS para segundos
function timeToSeconds(time) {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
}

// Função para carregar e verificar o vídeo
function loadAndVerifyMovie() {
    const video = document.getElementById("videoPlayer");

    // Verifica se o vídeo do script.js corresponde ao link configurado em movieConfig
    const params = new URLSearchParams(window.location.search);
    const videoUrlCodificada = params.get('videoUrl');
    
    if (videoUrlCodificada) {
        const videoUrl = atob(videoUrlCodificada);

        // Se o link do vídeo corresponde ao link configurado, define o src e aplica os saltos
        if (videoUrl === movieConfig.url) {
            video.src = videoUrl;
            video.load();
            video.addEventListener('timeupdate', skipSegmentsIfNeeded);
        } else {
            console.warn("O link do vídeo não corresponde ao link configurado para pular partes.");
        }
    } else {
        console.error("Nenhum link de vídeo encontrado.");
    }
}

// Função para pular automaticamente os intervalos definidos
function skipSegmentsIfNeeded() {
    const video = document.getElementById("videoPlayer");

    // Converte os horários de cada segmento para segundos e verifica se o tempo atual está em algum intervalo
    movieConfig.skipSegments.forEach(segment => {
        const start = timeToSeconds(segment.start);
        const end = timeToSeconds(segment.end);

        if (video.currentTime >= start && video.currentTime < end) {
            video.currentTime = end; // Pula para o final do intervalo
        }
    });
}

// Inicializa o vídeo com verificação assim que a página estiver pronta
window.addEventListener('load', loadAndVerifyMovie);
