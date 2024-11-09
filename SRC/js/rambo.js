// Função para ocultar filmes com o nome "Rambo"
function ocultarFilmesRambo() {
    const filmes = document.querySelectorAll('.filme h3'); // Seleciona todos os títulos dos filmes

    filmes.forEach((titulo) => {
        if (titulo.textContent.toLowerCase().includes('rambo')) {
            titulo.closest('.filme').style.display = 'none'; // Oculta o contêiner principal do filme
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
    const observer = new MutationObserver(ocultarFilmesRambo);

    observer.observe(movieContainer, {
        childList: true, // Observa a adição ou remoção de elementos-filhos
        subtree: true,   // Inclui os nós descendentes na observação
    });
}

// Inicia o observador ao carregar a página
window.addEventListener('load', () => {
    observarCarregamentoFilmes();
});
