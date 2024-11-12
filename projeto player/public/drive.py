import requests
from bs4 import BeautifulSoup
import re

def fetch_video_link(url):
    try:
        # Envia uma requisição GET para a página
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
        }
        response = requests.get(url, headers=headers)
        
        # Verifica se a requisição foi bem-sucedida
        if response.status_code != 200:
            print(f"Erro ao acessar a página: {response.status_code}")
            return None
        
        # Analisa o HTML da página com BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Procura links de vídeo com regex (.m3u8 ou .mp4)
        video_links = re.findall(r'(https?://[^\s]+?\.(?:m3u8|mp4))', soup.prettify())
        
        if video_links:
            # Retorna o primeiro link encontrado
            print("Link do vídeo encontrado:", video_links[0])
            return video_links[0]
        else:
            print("Nenhum link de vídeo encontrado.")
            return None

    except Exception as e:
        print("Erro ao buscar o link do vídeo:", e)
        return None

# Solicita o link da página ao usuário
url = input("Digite o link da página IPTV: ")

# Captura o link do vídeo e exibe
video_link = fetch_video_link(url)
if video_link:
    print("Link final para reprodução:", video_link)
