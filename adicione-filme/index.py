def criar_div_filme(id_filme):
    nome_filme = input("Digite o nome do filme: ")
    link_imagem = input("Digite o link da imagem: ")
    link_filme = input("Digite o link do filme: ")

    html = f'''
    <div class="filme" id="{id_filme}">
        <a href="#">
            <img src="{link_imagem}" alt="{nome_filme}">
            <div class="descricao">
                <h2>{nome_filme}</h2>
                <p>Descrição: {nome_filme} é um filme que retrata a história de um menino que se torna amigo de outro menino em um campo de concentração durante a Segunda Guerra Mundial, sem saber da verdadeira natureza do local.</p>
                <p>Gênero: Drama, Histórico</p>
                <p>Classificação: 14+</p>
            </div>
            <a href="{link_filme}" class="link-do-filme">Assistir ao trailer</a>
        </a>
    </div>
    '''

    nome_arquivo = f"{nome_filme}.html"
    with open(nome_arquivo, "w") as arquivo:
        arquivo.write(html)

    print(f"Arquivo '{nome_arquivo}' salvo com sucesso!")

def obter_proximo_id(filme_atual):
    return "filme" + str(int(filme_atual[5:]) + 1)

id_filme = "filme13"  # Inicia a partir do ID "filme13"

while True:
    criar_div_filme(id_filme)
    continuar = input("Deseja adicionar outro filme? (s/n): ")
    if continuar.lower() != 's':
        break
    id_filme = obter_proximo_id(id_filme)
