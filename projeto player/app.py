from flask import Flask, request, jsonify, render_template_string
import yt_dlp

app = Flask(__name__)

# Função para obter apenas o link direto do vídeo
def obter_link_reproduzivel(url):
    ydl_opts = {
        'format': 'best',  # Melhor formato disponível diretamente
        'quiet': True,
        'noplaylist': True,
        'geo_bypass': True,
        'extract_flat': False,  # Garante que não seja um link direto da playlist
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info_dict = ydl.extract_info(url, download=False)
            video_url = info_dict.get("url")  # Link direto para o vídeo
            titulo = info_dict.get("title", "Sem título")
            return {
                "url": video_url,
                "titulo": titulo,
                "site": info_dict.get("extractor", "Desconhecido"),
                "duracao": info_dict.get("duration", "Desconhecida")
            }
    except Exception as e:
        return {"error": str(e)}

# CSS estilizado inspirado no Ghostface
CSS_STYLE = """
<style>
    body {
        background-color: #000;
        color: #fff;
        font-family: 'Arial', sans-serif;
        text-align: center;
        margin: 0;
        padding: 0;
    }
    h1 {
        font-size: 3rem;
        margin: 20px 0;
        color: #ff0000;
        text-shadow: 2px 2px 10px #fff;
    }
    form {
        margin: 20px;
    }
    input[type="text"] {
        width: 50%;
        padding: 10px;
        border: 2px solid #ff0000;
        border-radius: 5px;
        font-size: 1rem;
        background-color: #000;
        color: #fff;
    }
    button {
        padding: 10px 20px;
        font-size: 1rem;
        color: #fff;
        background-color: #ff0000;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    button:hover {
        background-color: #ff4444;
    }
    #resultado {
        margin-top: 20px;
        padding: 10px;
        border-top: 2px solid #ff0000;
    }
    a {
        color: #00ff00;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
    video {
        margin-top: 20px;
        border: 2px solid #ff0000;
        border-radius: 10px;
    }
</style>
"""

# HTML dinâmico com CSS embutido
HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Obter Link de Vídeo</title>
    """ + CSS_STYLE + """
</head>
<body>
    <h1>JPCINE - Obter Link de Vídeo</h1>
    <form id="videoForm">
        <input type="text" id="url" name="url" placeholder="Cole o link do vídeo aqui" required>
        <button type="submit">Obter Link</button>
    </form>
    <div id="resultado"></div>

    <script>
        const form = document.getElementById('videoForm');
        const resultadoDiv = document.getElementById('resultado');

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const url = document.getElementById('url').value;

            try {
                const response = await fetch('/obter_video', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url })
                });
                const data = await response.json();
                if (data.error) {
                    resultadoDiv.innerHTML = `<p style="color: red;">Erro: ${data.error}</p>`;
                } else {
                    resultadoDiv.innerHTML = `
                        <h2>Informações do Vídeo</h2>
                        <p><strong>Título:</strong> ${data.titulo}</p>
                        <p><strong>Link Reproduzível:</strong> <a href="${data.url}" target="_blank">${data.url}</a></p>
                        <p><strong>Site:</strong> ${data.site}</p>
                        <p><strong>Duração:</strong> ${data.duracao} segundos</p>
                        <video width="640" height="360" controls>
                            <source src="${data.url}" type="video/mp4">
                            Seu navegador não suporta a reprodução de vídeo.
                        </video>
                    `;
                }
            } catch (error) {
                resultadoDiv.innerHTML = `<p style="color: red;">Erro ao processar a solicitação.</p>`;
            }
        });
    </script>
</body>
</html>
"""

# Rota principal para exibir o HTML
@app.route('/')
def index():
    return render_template_string(HTML_TEMPLATE)

# Rota para processar o vídeo
@app.route('/obter_video', methods=['POST'])
def obter_video():
    data = request.json
    url = data.get("url")
    if not url:
        return jsonify({"error": "URL é obrigatória"}), 400

    resultado = obter_link_reproduzivel(url)
    if "error" in resultado:
        return jsonify({"error": f"Erro ao processar a URL: {resultado['error']}"}), 500

    return jsonify(resultado)

if __name__ == '__main__':
    app.run(debug=True)
