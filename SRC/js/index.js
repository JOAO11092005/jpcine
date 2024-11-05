// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBh1S9IfuLWEa3t3us47yye6NuY5DPCm8k",
    authDomain: "jpcine-b36ff.firebaseapp.com",
    databaseURL: "https://jpcine-b36ff-default-rtdb.firebaseio.com",
    projectId: "jpcine-b36ff",
    storageBucket: "jpcine-b36ff.appspot.com",
    messagingSenderId: "123637183843",
    appId: "1:123637183843:web:10b55a276c398408010f56",
    measurementId: "G-RWPZQ5G3CR"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);

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

        filmeElement.addEventListener('click', function() {
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
window.onload = function() {
    loadFilmes();
    definirVideoPlayer(); // Chama a função para carregar o vídeo
};
