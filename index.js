//  console.log(alert('Olá seja bem-vindo(a) a JPCINE o site esta em desenvolvimento então não espere muita coisa. Anteciosamente (JPN)'))


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

document.addEventListener("DOMContentLoaded", function() {
    // Adiciona um evento de clique ao elemento .filme do Super Mario Bros.
    const posterMario = document.getElementById('filme4');
    posterMario.addEventListener("click", function(event) {
        event.preventDefault(); // Evita o comportamento padrão do link

        // Redireciona para a página do filme do Mario
        window.location.href = 'https://jpcine.vercel.app/PG%20-%20FILME-REPRO/index.html?descricao=%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20Super%20Mario%20Bros.%3A%20O%20Filme%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20Descri%C3%A7%C3%A3o%3A%20Mario%20e%20seu%20irm%C3%A3o%20Luigi%20s%C3%A3o%20encanadores%20do%20Brooklyn%2C%20em%20Nova%20York.%20Um%20dia%2C%20eles%20v%C3%A3o%20parar%20no%20reino%20dos%20cogumelos%2C%20governado%20pela%20Princesa%20Peach.%20O%20local%20%C3%A9%20amea%C3%A7ado%20por%20Bowser%2C%20rei%20dos%20Koopas%2C%20que%20faz%20de%20tudo%20para%20conseguir%20reinar%20em%20todos%20os%20lugares.%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20G%C3%AAnero%3A%20A%C3%A7%C3%A3o%2C%20Aventura%2C%20Com%C3%A9dia%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20Classifica%C3%A7%C3%A3o%3A%20Livre%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20&link=https%3A%2F%2Fdrive.google.com%2Ffile%2Fd%2F1Aph2Nq3c6pcUy67TIIC5R6wwSG17QqVw%2Fpreview';
    });
});

// index.js
document.addEventListener("DOMContentLoaded", function() {
    const series = document.querySelectorAll(".serie");
    series.forEach(serie => {
        serie.addEventListener("click", function(event) {
            event.preventDefault(); // Evita o comportamento padrão do link

            const serieId = this.id; // Obtém o ID da série clicada
            const serieNome = this.getAttribute("data-nome"); // Obtém o nome da série clicada

            // Redireciona para a página de reprodução da série com o ID e nome da série como parâmetros
            window.location.href = `./PG - SERIE - REPRO/reproducao_serie.html?serieId=${serieId}&serieNome=${encodeURIComponent(serieNome)}`;
        });
    });
});
