document.addEventListener("DOMContentLoaded", function() {
    const series = document.querySelectorAll(".serie");
    series.forEach(serie => {
        serie.addEventListener("click", function(event) {
            event.preventDefault(); // Evita o comportamento padrão do link

            const serieId = this.id; // Obtém o ID da série clicada
            const serieNome = this.getAttribute("data-nome"); // Obtém o nome da série clicada

            // Redireciona para a página de reprodução da série com o ID e nome da série como parâmetros
            window.location.href = `../PG - SERIE - REPRO/reproducao_serie.html?serieId=${serieId}&serieNome=${encodeURIComponent(serieNome)}`;
        });
    });
});
