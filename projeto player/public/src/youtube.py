import yt_dlp

def get_youtube_playable_link(url):
    # Configuração para pegar informações do vídeo sem fazer o download
    ydl_opts = {
        'noplaylist': True,  # Pega apenas o vídeo individual, ignorando playlists
        'quiet': True,  # Desativa saídas desnecessárias
        'format': 'bestaudio/bestvideo'  # Tenta pegar o melhor áudio e o melhor vídeo juntos
    }
    
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        try:
            # Extrai as informações do vídeo sem fazer o download
            info_dict = ydl.extract_info(url, download=False)
            
            # Lista todos os formatos de vídeo disponíveis
            formats = info_dict.get("formats", [])
            
            # Filtra os formatos que têm áudio e vídeo
            available_formats = [f for f in formats if f.get("height") and f.get("acodec") != 'none']
            
            # Exibe as resoluções disponíveis para o usuário escolher
            if not available_formats:
                print("Não há formatos com áudio e vídeo disponíveis.")
                return None
            
            print("Qualidades disponíveis com áudio e vídeo:")
            for idx, f in enumerate(available_formats):
                resolution = f.get('height', 'Desconhecida')
                print(f"{idx + 1}. {resolution}p - URL: {f.get('url', 'Não disponível')}")
            
            # Solicita ao usuário escolher uma das opções
            choice = int(input("Escolha o número da resolução desejada: ")) - 1
            
            if 0 <= choice < len(available_formats):
                selected_format = available_formats[choice]
                video_url = selected_format.get("url")
                title = info_dict.get("title", "Título desconhecido")
                
                if video_url:
                    print(f"Título do vídeo: {title}")
                    print(f"URL reproduzível: {video_url}")
                    return video_url
                else:
                    print("Não foi possível obter o link do vídeo.")
                    return None
            else:
                print("Opção inválida.")
                return None

        except Exception as e:
            print(f"Ocorreu um erro: {e}")
            return None

# Solicita o link do usuário
youtube_url = input("Digite o link do vídeo do YouTube: ")
playable_link = get_youtube_playable_link(youtube_url)
