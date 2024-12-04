function loadVideo() {
    const params = new URLSearchParams(window.location.search);
    const videoUrlCodificada = params.get('videoUrl');

    if (videoUrlCodificada) {
        const videoUrl = atob(videoUrlCodificada);
        console.log("URL decodificada:", videoUrl);

        const hiddenIframe = document.getElementById("hiddenIframe");

        if (videoUrl.includes("drive.google.com")) {
            const fileId = getDriveFileId(videoUrl);
            if (fileId) {
                // Gera o link de visualização do Google Drive
                const driveViewUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
                
                // Carrega no iframe oculto
                hiddenIframe.src = driveViewUrl;
                hiddenIframe.style.display = "none";

                // Configura o player com o mesmo link
                video.src = driveViewUrl;
                console.log("Link do Google Drive gerado:", driveViewUrl);
            } else {
                console.error("Não foi possível extrair o ID do arquivo do Google Drive.");
            }
        } else {
            // Caso não seja do Google Drive, usar o link direto
            video.src = videoUrl;
        }

        // Configurações do vídeo
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

// Função para extrair o ID do arquivo do Google Drive
function getDriveFileId(url) {
    const regex = /(?:drive\.google\.com.*(?:\/d\/|file\/d\/))([^\/?&]*)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}
