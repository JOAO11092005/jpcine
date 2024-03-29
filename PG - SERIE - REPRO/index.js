document.addEventListener("DOMContentLoaded", function() {
    // Extrair os parâmetros da URL
    const urlParams = new URLSearchParams(window.location.search);
    const serieId = urlParams.get('serieId');
    const serieNome = decodeURIComponent(urlParams.get('serieNome'));

    // Exibir o nome da série na página
    document.getElementById("nome-da-serie").innerText = serieNome;

    // Simular uma solicitação para obter os dados das temporadas e episódios correspondentes à série
    fetch(`temporadas_episodios.json`)
        .then(response => response.json())
        .then(data => {
            const serieData = data[serieId]; // Obter os dados da série com base no ID da série
            if (serieData) {
                const temporadasContainer = document.getElementById("temporadas-container");
                const numTemporadas = Math.min(serieData.temporadas.length, 5); // Limita a exibição a 5 temporadas ou menos
                for (let i = 0; i < numTemporadas; i++) {
                    const temporadaElement = document.createElement("div");
                    temporadaElement.classList.add("temporada");
                    temporadaElement.innerHTML = `<h2 onclick="toggleEpisodios(${i})">Temporada ${i + 1}</h2>`;
                    const episodiosList = document.createElement("div");
                    episodiosList.classList.add("episodios");
                    serieData.temporadas[i].episodios.forEach((episodio, episodioIndex) => {
                        const episodioElement = document.createElement("p");
                        episodioElement.innerText = `Ep ${episodioIndex + 1}`;
                        episodioElement.addEventListener("click", function() {
                            document.getElementById("serieIframe").src = episodio.link;
                        });
                        episodiosList.appendChild(episodioElement);
                    });
                    temporadaElement.appendChild(episodiosList);
                    temporadasContainer.appendChild(temporadaElement);
                }
            } else {
                console.error("Não foi possível encontrar informações para esta série.");
            }
        })
        .catch(error => console.error("Erro ao carregar dados:", error));
});

function toggleEpisodios(index) {
    const episodios = document.querySelectorAll('.episodios');
    episodios.forEach((episodio, i) => {
        if (i === index) {
            episodio.style.display = episodio.style.display === 'block' ? 'none' : 'block';
        } else {
            episodio.style.display = 'none';
        }
    });
}

// Seleciona o botão de mostrar temporadas
const mostrarTemporadasBtn = document.querySelector('#mostrar-temporadas');

// Seleciona o container das temporadas
const temporadasContainer = document.querySelector('.temporadas');

// Adiciona um evento de clique ao botão de mostrar temporadas
mostrarTemporadasBtn.addEventListener('click', () => {
    // Verifica se o container de temporadas está visível
    if (temporadasContainer.style.display === 'none' || temporadasContainer.style.display === '') {
        // Mostra o container de temporadas
        temporadasContainer.style.display = 'block';
        // Altera o texto do botão para "Sair"
        mostrarTemporadasBtn.textContent = 'Sair';
    } else {
        // Esconde o container de temporadas
        temporadasContainer.style.display = 'none';
        // Altera o texto do botão para "Mostrar"
        mostrarTemporadasBtn.textContent = 'Mostrar Temporadas da Série';
    }
});
