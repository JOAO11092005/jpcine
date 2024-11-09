import requests
from urllib.parse import urlparse, parse_qs

def get_drive_direct_link(file_id):
    # Formatar a URL de download direto do Google Drive
    download_url = f'https://drive.google.com/uc?export=download&id={file_id}'
    
    # Fazer a requisição para o Google Drive
    session = requests.Session()
    response = session.get(download_url, stream=True)

    # Verificar se foi redirecionado (geralmente quando o link está disponível)
    if response.status_code == 200:
        # Procurar pelo link final após o redirecionamento
        if 'Content-Disposition' in response.headers:
            final_url = response.url  # O URL final após o redirecionamento
            return final_url
        else:
            print("Erro: Não foi possível encontrar o link de download direto.")
            return None
    else:
        print("Erro ao acessar o Google Drive.")
        return None

def extract_file_id(drive_url):
    # Usar urlparse para extrair o ID do arquivo do link fornecido
    parsed_url = urlparse(drive_url)
    query_params = parse_qs(parsed_url.query)
    
    # Tentar encontrar o 'file_id' no link
    if 'id' in query_params:
        return query_params['id'][0]
    else:
        print("Erro: O link fornecido não contém um ID válido do Google Drive.")
        return None

def main():
    # Perguntar ao usuário o link do Google Drive
    drive_url = input("Por favor, insira o link do Google Drive: ")
    
    # Extrair o ID do arquivo do link fornecido
    file_id = extract_file_id(drive_url)
    
    if file_id:
        # Obter o link direto para o vídeo
        direct_link = get_drive_direct_link(file_id)
        
        if direct_link:
            print(f"Link direto para o vídeo: {direct_link}")
        else:
            print("Não foi possível obter o link direto.")
    else:
        print("Link inválido. Tente novamente com um link do Google Drive válido.")

if __name__ == "__main__":
    main()
