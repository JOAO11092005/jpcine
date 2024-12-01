// Extrai o ID do arquivo do URL do Google Drive
function extractDriveFileId(url) {
    const match = url.match(/\/file\/d\/(.+?)\//);
    return match ? match[1] : null;
}

// Gera um link direto usando a API do Google Drive
async function getDriveDirectLink(fileId, apiKey) {
    const apiUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`;
    try {
        const response = await fetch(apiUrl, { method: "GET" });

        if (!response.ok) {
            throw new Error(`Erro na resposta da API: ${response.status}`);
        }

        return response.url; // Link direto
    } catch (error) {
        console.error("Erro ao acessar a API do Google Drive:", error);
        throw error;
    }
}

// Configura o player de vídeo com o link gerado
function configureVideoPlayer(directLink) {
    const videoPlayer = document.getElementById("videoPlayer");
    if (!videoPlayer) {
        console.error("Elemento do player de vídeo não encontrado.");
        return;
    }

    videoPlayer.src = directLink;

    console.log("Link direto configurado no player:", directLink);

    videoPlayer.load();
    videoPlayer.play().catch((error) =>
        console.error("Erro ao iniciar a reprodução:", error)
    );
}

// Carrega o vídeo do Google Drive
async function loadDriveVideo(url, apiKey) {
    const fileId = extractDriveFileId(url);

    if (!fileId) {
        console.error("ID do arquivo do Google Drive não encontrado no URL.");
        return;
    }

    try {
        const directLink = await getDriveDirectLink(fileId, apiKey);
        configureVideoPlayer(directLink);
    } catch (error) {
        console.error("Não foi possível gerar o link direto do Google Drive.");
    }
}

// Processa o URL do vídeo e verifica se é do Google Drive
function processVideoUrl(apiKey) {
    const params = new URLSearchParams(window.location.search);
    const videoUrl = params.get("videoUrl");

    if (!videoUrl) {
        console.error("Nenhum URL de vídeo fornecido.");
        return;
    }

    const decodedUrl = decodeURIComponent(atob(videoUrl));
    console.log("URL decodificada:", decodedUrl);

    if (decodedUrl.includes("drive.google.com")) {
        loadDriveVideo(decodedUrl, apiKey);
    } else {
        console.log("O link fornecido não é um vídeo do Google Drive.");
    }
}

// Inicializa o processo ao carregar a página
window.onload = () => {
    const apiKey = "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"; // Substitua pela sua chave da API do Google
    processVideoUrl(apiKey);
};
