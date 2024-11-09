import yt_dlp
import json

def obter_informacoes_completas(url):
    ydl_opts = {
        'format': 'bestvideo+bestaudio/best',  # Melhor qualidade de vídeo e áudio juntos
        'noplaylist': True,  # Ignora playlists, se presentes
        'quiet': True,       # Modo silencioso para reduzir logs
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info_dict = ydl.extract_info(url, download=False)  # Extrai todas as informações
            # Converte o dicionário de informações para JSON e exibe de maneira legível
            print("Informações completas do vídeo:")
            print(json.dumps(info_dict, indent=4, ensure_ascii=False))

    except Exception as e:
        print(f"Erro ao obter informações do vídeo: {e}")

# Solicita ao usuário a URL do vídeo ou do stream
url = input("Por favor, insira a URL do vídeo ou stream para obter todas as informações: ")
obter_informacoes_completas(url)
