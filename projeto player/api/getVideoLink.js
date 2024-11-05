const axios = require('axios');

module.exports = async (req, res) => {
    try {
        // Faz a requisição à URL para obter o link do vídeo
        const response = await axios.get('http://s3-server.net:80/series/876056/Pb9SYJ/91664.mp4', {
            maxRedirects: 0, // Captura o redirecionamento se houver
            validateStatus: status => status >= 200 && status < 400
        });

        // Checa se há um redirecionamento no cabeçalho `Location`
        const videoUrl = response.headers.location || 'http://s3-server.net:80/series/876056/Pb9SYJ/91664.mp4';
        res.status(200).json({ videoUrl });
    } catch (error) {
        console.error("Erro ao obter o link do vídeo:", error);
        res.status(500).json({ error: 'Não foi possível obter o link do vídeo' });
    }
};
