// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDraW0CwVdsVJQ4zGuHbFr7wlxJzkgguXc",
    authDomain: "jpcineatualizado.firebaseapp.com",
    databaseURL: "https://jpcineatualizado-default-rtdb.firebaseio.com",
    projectId: "jpcineatualizado",
    storageBucket: "jpcineatualizado.firebasestorage.app",
    messagingSenderId: "516384258493",
    appId: "1:516384258493:web:795bad79eb4302cec87ad4",
    measurementId: "G-ZSCKBE3XTP"
  };

// Inicializa o Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();
// Referência ao Realtime Database
const database = firebase.database();

let filmes = [];

// Função para carregar os filmes do banco de dados
async function loadFilmes() {
    try {
        const snapshot = await database.ref('filmes').once('value');
        filmes = Object.values(snapshot.val());
        displayFilmes(filmes);
    } catch (error) {
        console.error('Erro ao carregar filmes:', error);
    }
}

// Função para exibir os filmes na página inicial
function displayFilmes(filmesParaExibir) {
    const movieContainer = document.getElementById('movie-container');
    const loading = document.getElementById('loading');
    loading.style.display = 'none';

    filmesParaExibir.forEach(filme => {
        const filmeElement = document.createElement('div');
        filmeElement.classList.add('filme');

        const logoImg = document.createElement('img');
        logoImg.src = filme.logo;
        logoImg.alt = filme.titulo;

        const tituloElement = document.createElement('h3');
        tituloElement.textContent = filme.titulo;

        filmeElement.addEventListener('click', function () {
            const videoUrlCodificada = btoa(filme.video); // Codifica a URL do vídeo
            window.location.href = `./projeto player/public/index.html?videoUrl=${encodeURIComponent(videoUrlCodificada)}`;
        });

        filmeElement.appendChild(logoImg);
        filmeElement.appendChild(tituloElement);

        movieContainer.appendChild(filmeElement);
    });
}

// Função para definir o vídeo no player
function definirVideoPlayer() {
    const params = new URLSearchParams(window.location.search);
    const videoUrlCodificada = params.get('videoUrl');

    if (videoUrlCodificada) {
        const videoUrl = atob(videoUrlCodificada); // Decodifica a URL
        const video = document.getElementById('videoPlayer');
        video.src = videoUrl;
        video.load();
        video.play().catch(error => console.error("Erro ao iniciar o vídeo:", error));
    } else {
        console.error("Nenhum link de vídeo encontrado.");
    }
}

// Carregar filmes ao iniciar a página
window.onload = function () {
    loadFilmes();
    definirVideoPlayer(); // Chama a função para carregar o vídeo
};
// Função para enviar o pedido
function enviarPedido() {
    const pedidoInput = document.getElementById("pedido").value.trim();

    if (pedidoInput) { // Verifica se o campo não está vazio
        const pedidosRef = db.ref("pedidos");
        pedidosRef.push({ pedido: pedidoInput })
            .then(() => {
                // Exibe o modal de confirmação
                const modal = document.getElementById("confirmacaoModal");
                modal.style.display = "block";

                // Esconde o modal após 0.9 segundos
                setTimeout(() => {
                    modal.style.display = "none";
                }, 900);
            })
            .catch((error) => {
                console.error("Erro ao enviar pedido:", error);
            });

        // Limpa o campo de input após enviar
        document.getElementById("pedido").value = "";
    } else {
        alert("Por favor, insira o nome do filme.");
    }
}

// Evento para o botão de envio
document.getElementById("botaopedido").addEventListener("click", enviarPedido);
document.addEventListener("DOMContentLoaded", () => {
    const hamburguerCheckbox = document.getElementById("hamburguer");
    const navMenu = document.getElementById("nav-menu");
    const searchOption = document.getElementById("search-option");
    const searchContainer = document.getElementById("search-container");
    const searchInput = document.getElementById("search-input");
    const menuItems = document.querySelectorAll("#nav-menu li");

    // Alterna a exibição do menu de navegação ao clicar no ícone do hambúrguer
    hamburguerCheckbox.addEventListener("change", () => {
        navMenu.style.display = hamburguerCheckbox.checked ? "block" : "none";
    });

    // Mostra o campo de pesquisa ao clicar em "Pesquisar" e oculta o menu
    searchOption.addEventListener("click", (event) => {
        event.preventDefault();
        navMenu.style.display = "none"; // Oculta o menu
        searchContainer.style.display = "block"; // Exibe o campo de pesquisa
        hamburguerCheckbox.checked = false; // Desmarca o ícone de menu
        searchInput.focus(); // Foca no campo de pesquisa
    });

    // Fecha o campo de pesquisa se o usuário clicar fora dele
    document.addEventListener("click", (event) => {
        if (!searchContainer.contains(event.target) && event.target !== searchOption && event.target !== hamburguerCheckbox) {
            searchContainer.style.display = "none";
        }
    });



});
const botao = document.getElementById('li');
botao.addEventListener('click', function () {
    alert('Essa opção está indisponivel estamos desenvolvendo.')
})

const pedidos = document.querySelector('#pedidos');
pedidos.addEventListener('click', function () {
    window.location.href = "pedido.html"
})