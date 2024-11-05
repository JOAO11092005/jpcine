from flask import Flask, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

@app.route('/getVideoLink', methods=['GET'])
def get_video_link():
    try:
        # Carregar o HTML e extrair o link original do vídeo
        with open('index.html', 'r', encoding='utf-8') as file:
            soup = BeautifulSoup(file, 'html.parser')
            video_src = soup.find('source')['src']  # Pega o link dentro da tag <source>
        
        # Fazer uma requisição para obter o link com token
        response = requests.get(video_src, allow_redirects=False)

        if response.status_code in [301, 302] and 'Location' in response.headers:
            # Captura o link redirecionado
            video_url = response.headers['Location']
        else:
            # Se não houver redirecionamento, usa o link original
            video_url = video_src

        return jsonify({'videoUrl': video_url})
    
    except Exception as e:
        print("Erro ao obter o link do vídeo:", e)
        return jsonify({'error': 'Não foi possível obter o link do vídeo'}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
