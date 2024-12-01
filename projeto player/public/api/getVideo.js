const fetch = require("node-fetch");

const API_KEY = "AIzaSyDIHXZyMVKWV8EPorCIPcRvUm2bcSSszUI"; // Substitua pela sua API Key válida

module.exports = async (req, res) => {
    const { fileId } = req.query;

    if (!fileId) {
        return res.status(400).json({ error: "ID do arquivo não fornecido." });
    }

    const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            return res.status(response.status).json({ error: "Erro ao obter o arquivo." });
        }

        res.setHeader("Cache-Control", "public, max-age=3600"); // Cache de 1 hora
        res.redirect(response.url); // Redireciona para o link temporário do Google Drive
    } catch (error) {
        console.error("Erro ao acessar o Google Drive:", error);
        res.status(500).json({ error: "Erro interno do servidor." });
    }
};
