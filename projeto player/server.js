// server.js
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/getVideoLink', async (req, res) => {
    try {
        // Faça uma solicitação ao link inicial para obter o redirecionamento com o token
        const response = await axios.get('http://s3-server.net:80/movie/876056/Pb9SYJ/20206.mp4', {
            maxRedirects: 0,
            validateStatus: status => status >= 200 && status < 400
        });

        // Retorna o link com o token para o front-end
        res.json({ videoUrl: response.headers.location });
    } catch (error) {
        console.error("Erro ao obter o link do vídeo:", error);
        res.status(500).json({ error: 'Não foi possível obter o link do vídeo' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
