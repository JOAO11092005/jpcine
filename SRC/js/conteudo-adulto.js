// video-de-mais-18.js

// Função para ocultar filmes com o nome "sexo"
function ocultarFilmesComPalavraProibida() {
    const filmes = document.querySelectorAll('.filme h3'); // Seleciona todos os títulos dos filmes

    filmes.forEach((titulo) => {
        if (titulo.textContent.toLowerCase().includes('sexo')) {
            titulo.closest('.filme').style.display = 'none'; // Oculta o contêiner principal do filme
            console.log(`Filme ocultado: ${titulo.textContent}`);
        }
    });
}

// Configuração do MutationObserver para monitorar alterações no contêiner de filmes
function observarCarregamentoFilmes() {
    const movieContainer = document.getElementById('movie-container');

    if (!movieContainer) {
        console.error("Contêiner de filmes não encontrado.");
        return;
    }

    // Configura o observador para observar adições de novos nós no contêiner de filmes
    const observer = new MutationObserver(ocultarFilmesComPalavraProibida);

    observer.observe(movieContainer, {
        childList: true, // Observa a adição ou remoção de elementos-filhos
        subtree: true,   // Inclui os nós descendentes na observação
    });
}

// Função principal para iniciar o observador e verificar o horário
function aplicarRegrasConteudoAdulto() {
    const dataAtual = new Date();
    const horaAtual = dataAtual.getHours();

    const inicioHoraPermitida = 23; // 22:00 (10 PM)
    const fimHoraPermitida = 6;     // 6:00 (6 AM)

    if (horaAtual >= inicioHoraPermitida || horaAtual < fimHoraPermitida) {
        console.log("Conteúdo adulto permitido neste horário.");
        observarCarregamentoFilmes(); // Inicia o observador para monitorar e ocultar filmes
        ocultarFilmesComPalavraProibida(); // Verificação inicial
    } else {
        console.log("Conteúdo adulto não permitido neste horário.");
        document.body.innerHTML = "<h2>Conteúdo não disponível neste horário.</h2>";
    }
}

// Executa a função ao carregar a página
window.addEventListener('load', aplicarRegrasConteudoAdulto);
