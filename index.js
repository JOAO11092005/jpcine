// console.log(alert('Olá seja bem-vindo(a) a JPCINE o site esta em desenvolvimento então não espere muita coisa. Anteciosamente (JPN)'))


document.addEventListener("DOMContentLoaded", function() {
    // Adiciona um evento de clique para cada filme
    const filmes = document.querySelectorAll(".filme");
    filmes.forEach(filme => {
        filme.addEventListener("click", function(event) {
            event.preventDefault(); // Evita o comportamento padrão do link

            // Obtém a descrição e o link do filme clicado
            const descricao = this.querySelector(".descricao").innerText;
            const linkFilme = this.querySelector(".link-do-filme").getAttribute("href");

            // Redireciona para a página PG - FILME-REPRO, passando os detalhes do filme como parâmetros de consulta
            window.location.href = `./PG - FILME-REPRO/index.html?descricao=${encodeURIComponent(descricao)}&link=${encodeURIComponent(linkFilme)}`;
        });
    });
});