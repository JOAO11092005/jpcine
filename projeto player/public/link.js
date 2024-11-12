// Definindo a URL base do vídeo
const videoURL = 'http://s3-server.net:80/movie/876056/Pb9SYJ/20207.mp4';

// Função principal para buscar o link do vídeo
async function fetchVideoLink(url) {
    try {
        // Realiza uma requisição para obter o HTML do site
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0',  // Simula um navegador
                'Accept': 'text/html'
            }
        });
        
        if (!response.ok) throw new Error(`Erro ao acessar o link: ${response.status}`);

        // Extrai o texto HTML da resposta
        const htmlText = await response.text();

        // Regex para encontrar possíveis links de vídeo (como .m3u8 ou mp4)
        const videoLinkMatch = htmlText.match(/(https?:\/\/.*?\.m3u8|https?:\/\/.*?\.mp4)/);

        if (videoLinkMatch && videoLinkMatch[0]) {
            const videoLink = videoLinkMatch[0];
            console.log(`Link do vídeo encontrado: ${videoLink}`);
            return videoLink;
        } else {
            console.log('Nenhum link de vídeo encontrado');
        }

    } catch (error) {
        console.error('Erro ao buscar o link do vídeo:', error);
    }
}

// Função para manipular o link e preparar para o player
async function setupPlayer() {
    const link = await fetchVideoLink(videoURL);
    if (link) {
        // Manipulação avançada: você pode adicionar parâmetros, autenticação, etc.
        console.log(`Link final para reprodução: ${link}`);
        document.getElementById('videoPlayer').src = link;
    }
}

setupPlayer();
