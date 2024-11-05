import os

# Criar diretório do projeto
project_name = "VideoPlayer"
os.makedirs(project_name, exist_ok=True)

# Conteúdo dos arquivos
html_content = '''<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reprodutor de Vídeo HTTP</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="video-container">
        <video id="videoPlayer" controls>
            <source id="videoSource" src="http://cdn.teambr.live:80/movie/iptv0887/19971460887/49856.mp4" type="video/mp4">
            Seu navegador não suporta o elemento de vídeo.
        </video>
        <p id="statusMessage"></p>
    </div>
    <input type="text" id="videoUrl" placeholder="Insira a URL do vídeo (HTTP)">
    <button id="loadVideo">Carregar Vídeo</button>
    <script src="script.js"></script>
</body>
</html>
'''

css_content = '''body {
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f0f0f0;
    padding: 20px;
}

.video-container {
    margin-bottom: 20px;
}

video {
    width: 600px;
    height: auto;
    border: 2px solid #333;
    border-radius: 5px;
}

input {
    padding: 10px;
    margin-bottom: 10px;
    width: 300px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

#statusMessage {
    margin-top: 10px;
    color: red;
}
'''

js_content = '''document.getElementById('loadVideo').addEventListener('click', function() {
    const videoUrl = document.getElementById('videoUrl').value;
    const videoPlayer = document.getElementById('videoPlayer');
    const videoSource = document.getElementById('videoSource');
    const statusMessage = document.getElementById('statusMessage');

    // Verifica se a URL começa com "http://"
    if (videoUrl.startsWith('http://')) {
        videoSource.src = videoUrl;
        videoPlayer.load(); // Recarrega o vídeo com a nova fonte
        videoPlayer.play(); // Inicia a reprodução
        statusMessage.textContent = ""; // Limpa mensagens anteriores
    } else {
        statusMessage.textContent = 'Por favor, insira uma URL válida que comece com "http://".';
    }
});

// Carregar o vídeo padrão ao abrir a página
window.onload = function() {
    const defaultVideoUrl = "http://cdn.teambr.live:80/movie/iptv0887/19971460887/49856.mp4";
    document.getElementById('videoSource').src = defaultVideoUrl;
    document.getElementById('videoPlayer').load();
};
'''

# Criar os arquivos
with open(os.path.join(project_name, "index.html"), "w") as html_file:
    html_file.write(html_content)

with open(os.path.join(project_name, "styles.css"), "w") as css_file:
    css_file.write(css_content)

with open(os.path.join(project_name, "script.js"), "w") as js_file:
    js_file.write(js_content)

print(f"Projeto '{project_name}' criado com sucesso!")
