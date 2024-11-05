document.addEventListener('DOMContentLoaded', function() {
    // Verifica se há um filme selecionado armazenado no sessionStorage
    const filmeSelecionado = sessionStorage.getItem('filmeSelecionado');
    
    if (filmeSelecionado) {
        const filme = JSON.parse(filmeSelecionado);

        // Atualiza o título da página com o título do filme
        document.title = filme.titulo;

        // Atualiza o texto do <h1> com o título do filme
        const tituloElement = document.querySelector('#movie-title');
        tituloElement.textContent = filme.titulo;

        // Atualiza o src do iframe com o link do vídeo do filme
        const iframeElement = document.querySelector('#movie-player');
        iframeElement.src = filme.video;

        // Adicionar evento quando o iframe terminar de carregar
        iframeElement.addEventListener('load', function() {
            // Verifica se o link do iframe começa com "http://s3-server.net"
            if (iframeElement.src.startsWith("http://s3-server.net")) {
                // Exibe o botão "Assistir o Filme"
                const assistirFilmeButton = document.querySelector('#assistirFilme');
                assistirFilmeButton.style.display = 'block';

                // Adiciona evento ao botão "Assistir o Filme"
                assistirFilmeButton.addEventListener('click', function() {
                    window.location.href = iframeElement.src;
                });
            }

            // Iniciar a reprodução do vídeo
            // iframeElement.play(); // Não é possível usar play() diretamente em iframes. Você pode precisar iniciar o vídeo manualmente.

            // Entrar em modo fullscreen
            if (iframeElement.requestFullscreen) {
                iframeElement.requestFullscreen();
            } else if (iframeElement.webkitRequestFullscreen) { /* Safari */
                iframeElement.webkitRequestFullscreen();
            } else if (iframeElement.msRequestFullscreen) { /* IE11 */
                iframeElement.msRequestFullscreen();
            }
        });

        // Adicionar evento ao botão de enviar erro do filme, se existir
        const enviarErroButton = document.querySelector('#enviarErro');
        if (enviarErroButton) {
            enviarErroButton.addEventListener('click', function() {
                enviarErro(filme);
            });
        }

    } else {
        // Caso não haja filme selecionado, redireciona de volta para index.html
        window.location.href = './index.html';
    }
});

// Função para enviar erro específico do filme ao Firebase
function enviarErro(filme) {
    const errosRef = firebase.database().ref('erros');

    errosRef.push({
        filmeId: filme.id,
        titulo: filme.titulo,
        mensagem: 'Ocorreu um erro neste filme. Por favor, verifique.'
    }).then(() => {
        // Mostrar mensagem de sucesso
        mostrarMensagem('Erro enviado com sucesso para o administrador.');

        // Limpar sessionStorage do filme selecionado após enviar o erro
        sessionStorage.removeItem('filmeSelecionado');
    }).catch(error => {
        console.error('Erro ao enviar erro:', error);
    });
}

// Função para exibir mensagem na tela
function mostrarMensagem(mensagem) {
    const mensagemElement = document.createElement('div');
    mensagemElement.classList.add('mensagem');
    mensagemElement.textContent = mensagem;

    document.body.appendChild(mensagemElement);

    setTimeout(() => {
        mensagemElement.remove();
    }, 3000); // Remove a mensagem após 3 segundos
}
