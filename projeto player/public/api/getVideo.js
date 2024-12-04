const express = require('express');
const app = express();
const axios = require('axios');

app.get('/stream', async (req, res) => {
    const { fileId } = req.query;
    const driveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    
    try {
        const response = await axios({
            url: driveUrl,
            method: 'GET',
            responseType: 'stream',
        });
        res.setHeader('Content-Type', 'video/mp4');
        response.data.pipe(res);
    } catch (error) {
        res.status(500).send('Erro ao carregar o vídeo');
    }
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
