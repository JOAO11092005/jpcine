document.addEventListener("DOMContentLoaded", () => {
    const movieContainer = document.getElementById("movie-container");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    let currentIndex = 0; // índice do filme exibido atualmente

    // Função para atualizar a exibição dos filmes
    function showMovies() {
        const filmes = movieContainer.querySelectorAll(".filme");

        // Ocultar todos os filmes
        filmes.forEach(filme => filme.style.display = "none");

        // Exibir o filme atual
        if (filmes[currentIndex]) {
            filmes[currentIndex].style.display = "block";
        }

        // Controle da visibilidade dos botões
        prevButton.style.visibility = currentIndex === 0 ? "hidden" : "visible";
        nextButton.style.visibility = currentIndex === filmes.length - 1 ? "hidden" : "visible";
    }

    // Botão "Anterior"
    prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            showMovies();
        }
    });

    // Botão "Próximo"
    nextButton.addEventListener("click", () => {
        const filmes = movieContainer.querySelectorAll(".filme");
        if (currentIndex < filmes.length - 1) {
            currentIndex++;
            showMovies();
        }
    });

    // Carregar filmes e inicializar exibição
    showMovies();
});
