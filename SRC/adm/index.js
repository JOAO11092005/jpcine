// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBh1S9IfuLWEa3t3us47yye6NuY5DPCm8k",
    authDomain: "jpcine-b36ff.firebaseapp.com",
    databaseURL: "https://jpcine-b36ff-default-rtdb.firebaseio.com",  // Adicione esta linha
    projectId: "jpcine-b36ff",
    storageBucket: "jpcine-b36ff.appspot.com",
    messagingSenderId: "123637183843",
    appId: "1:123637183843:web:10b55a276c398408010f56",
    measurementId: "G-RWPZQ5G3CR"
  };

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);

// Referências do Realtime Database
const database = firebase.database();

// Função para buscar detalhes do filme na API do TMDb
async function buscarDetalhesFilme(nomeFilme) {
    const apiKey = 'b973c7ca178790420b1b57f2e3ee0149';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(nomeFilme)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Falha ao buscar detalhes do filme');
        }
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const filmeEncontrado = data.results[0];
            const filmeInfo = {
                titulo: filmeEncontrado.title,
                logo: `https://image.tmdb.org/t/p/w500${filmeEncontrado.poster_path}`,
                video: '', // Será preenchido com o URL do vídeo se disponível
                descricao: '' // Você pode adicionar uma descrição padrão ou deixar vazio
            };
            return filmeInfo;
        } else {
            throw new Error('Filme não encontrado na API do TMDb');
        }
    } catch (error) {
        console.error('Erro ao buscar detalhes do filme:', error);
        throw error;
    }
}

// Função para adicionar um filme
async function adicionarFilme(title, videoURL) {
    try {
        const filmeInfo = await buscarDetalhesFilme(title);
        filmeInfo.video = videoURL; // Define o URL do vídeo
        await database.ref('filmes').push().set(filmeInfo);
        console.log('Filme adicionado com sucesso!');
        carregarListaFilmes();
    } catch (error) {
        console.error('Erro ao adicionar filme:', error);
        throw error;
    }
}

// Função para carregar os filmes
async function loadFilmes() {
    try {
        const snapshot = await database.ref('filmes').once('value');
        return snapshot.val();
    } catch (error) {
        console.error('Erro ao carregar filmes:', error);
        throw error;
    }
}

// Função para carregar e exibir a lista de filmes
async function carregarListaFilmes() {
    try {
        const filmes = await loadFilmes();
        const filmesContainer = document.getElementById('movie-list-container');
        filmesContainer.innerHTML = ''; // Limpa o conteúdo atual da lista

        for (const key in filmes) {
            if (Object.hasOwnProperty.call(filmes, key)) {
                const filme = filmes[key];
                const filmeElement = document.createElement('div');
                filmeElement.classList.add('movie-item');

                const logoImg = document.createElement('img');
                logoImg.src = filme.logo;
                logoImg.alt = filme.titulo;

                const tituloElement = document.createElement('h3');
                tituloElement.textContent = filme.titulo;

                const descricaoElement = document.createElement('p');
                descricaoElement.textContent = filme.descricao;

                const editButton = document.createElement('button');
                editButton.textContent = 'Editar';
                editButton.addEventListener('click', () => abrirModalEdicao(key, filme.video));

                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remover';
                removeButton.addEventListener('click', () => removerFilme(key));

                filmeElement.appendChild(logoImg);
                filmeElement.appendChild(tituloElement);
                filmeElement.appendChild(descricaoElement);
                filmeElement.appendChild(editButton);
                filmeElement.appendChild(removeButton);

                filmesContainer.appendChild(filmeElement);
            }
        }
    } catch (error) {
        console.error('Erro ao carregar lista de filmes:', error);
    }
}

// Função para remover um filme
async function removerFilme(key) {
    try {
        await database.ref('filmes/' + key).remove();
        console.log('Filme removido com sucesso!');
        carregarListaFilmes();
    } catch (error) {
        console.error('Erro ao remover filme:', error);
    }
}

// Função para abrir o modal de edição
function abrirModalEdicao(key, currentVideoURL, currentTitle, currentLogo) {
    const modal = document.getElementById('editModal');
    const closeModal = document.getElementsByClassName('close')[0];

    modal.style.display = 'block';

    const editVideoInput = document.getElementById('edit-video');
    editVideoInput.value = currentVideoURL;

    const editTitleInput = document.getElementById('edit-title');
    editTitleInput.value = currentTitle;

    const editLogoInput = document.getElementById('edit-logo');
    editLogoInput.value = currentLogo;

    const editForm = document.getElementById('edit-movie-form');
    editForm.onsubmit = async function(event) {
        event.preventDefault();
        const newVideoURL = editVideoInput.value;
        const newTitle = editTitleInput.value;
        const newLogo = editLogoInput.value;
        await editarFilme(key, newTitle, newLogo, newVideoURL);
        modal.style.display = 'none';
    };

    closeModal.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

// Função para editar um filme
async function editarFilme(key, newTitle, newLogo, newVideoURL) {
    try {
        await database.ref('filmes/' + key).update({ 
            titulo: newTitle,
            logo: newLogo,
            video: newVideoURL 
        });
        console.log('Filme editado com sucesso!');
        carregarListaFilmes();
    } catch (error) {
        console.error('Erro ao editar filme:', error);
    }
}
// Captura o evento de submissão do formulário de adicionar filme
const addMovieForm = document.getElementById('add-movie-form');
addMovieForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const videoURL = document.getElementById('video').value;

    // Adiciona o novo filme
    adicionarFilme(title, videoURL);

    // Limpa o formulário após adicionar o filme
    addMovieForm.reset();
});

// Carrega a lista de filmes ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    carregarListaFilmes();
});

// Função para carregar os pedidos de filmes pendentes
async function loadPedidos() {
    try {
        const snapshot = await database.ref('pedidos').once('value');
        const pedidos = snapshot.val();
        displayPedidos(pedidos);
    } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
    }
}

// Função para exibir os pedidos na página de administração
function displayPedidos(pedidos) {
    const movieRequestsContainer = document.getElementById('movie-requests-container');
    movieRequestsContainer.innerHTML = '';

    if (pedidos) {
        Object.keys(pedidos).forEach(key => {
            const pedido = pedidos[key];
            const pedidoElement = document.createElement('div');
            pedidoElement.classList.add('pedido');

            const filmeElement = document.createElement('p');
            filmeElement.textContent = `Filme: ${pedido.filme}`;

            const statusElement = document.createElement('p');
            statusElement.textContent = `Status: ${pedido.status}`;

            const removerButton = document.createElement('button');
            removerButton.textContent = 'Remover';
            removerButton.addEventListener('click', () => removerPedido(key));

            pedidoElement.appendChild(filmeElement);
            pedidoElement.appendChild(statusElement);
            pedidoElement.appendChild(removerButton);

            movieRequestsContainer.appendChild(pedidoElement);
        });
    } else {
        const mensagemElement = document.createElement('p');
        mensagemElement.textContent = 'Não há pedidos pendentes.';
        movieRequestsContainer.appendChild(mensagemElement);
    }
}

// Função para remover pedido de filme
function removerPedido(key) {
    if (confirm('Tem certeza que deseja remover este pedido?')) {
        database.ref(`pedidos/${key}`).remove()
            .then(() => {
                mostrarMensagem('Pedido removido com sucesso!');
            })
            .catch(error => {
                console.error('Erro ao remover pedido:', error);
            });
    }
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

// Carregar pedidos ao carregar a página de administração
window.onload = function() {
    loadPedidos();
};

// Função para carregar os erros de filmes reportados
async function loadErrosFilmes() {
    try {
        const snapshot = await database.ref('erros').once('value');
        const erros = snapshot.val();
        displayErrosFilmes(erros);
    } catch (error) {
        console.error('Erro ao carregar erros de filmes:', error);
    }
}

// Função para exibir os erros de filmes na página de administração
function displayErrosFilmes(erros) {
    const errosContainer = document.getElementById('erros');
    errosContainer.innerHTML = '';

    if (erros) {
        Object.keys(erros).forEach(key => {
            const erro = erros[key];
            const erroElement = document.createElement('div');
            erroElement.classList.add('erro');

            const filmeElement = document.createElement('p');
            filmeElement.textContent = `Filme: ${erro.filme}`;

            const descricaoElement = document.createElement('p');
            descricaoElement.textContent = `Descrição do Erro: ${erro.descricao}`;

            const removerButton = document.createElement('button');
            removerButton.textContent = 'Remover';
            removerButton.addEventListener('click', () => removerErro(key));

            erroElement.appendChild(filmeElement);
            erroElement.appendChild(descricaoElement);
            erroElement.appendChild(removerButton);

            errosContainer.appendChild(erroElement);
        });
    } else {
        const mensagemElement = document.createElement('p');
        mensagemElement.textContent = 'Não há erros reportados.';
        errosContainer.appendChild(mensagemElement);
    }
}

// Função para remover um erro de filme
async function removerErro(key) {
    if (confirm('Tem certeza que deseja remover este erro?')) {
        try {
            await database.ref(`erros/${key}`).remove();
            console.log('Erro removido com sucesso!');
            loadErrosFilmes();
        } catch (error) {
            console.error('Erro ao remover erro:', error);
        }
    }
}

// Captura o evento de submissão do formulário de adicionar erro de filme
const addErrorForm = document.getElementById('add-error-form');
addErrorForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const movieName = document.getElementById('movie-name').value;
    const errorDescription = document.getElementById('error-description').value;

    // Adiciona o erro de filme
    adicionarErroFilme(movieName, errorDescription);

    // Limpa o formulário após adicionar o erro de filme
    addErrorForm.reset();
});

// Função para adicionar um erro de filme
async function adicionarErroFilme(movieName, errorDescription) {
    try {
        await database.ref('erros').push().set({
            filme: movieName,
            descricao: errorDescription
        });
        console.log('Erro de filme adicionado com sucesso!');
        loadErrosFilmes();
    } catch (error) {
        console.error('Erro ao adicionar erro de filme:', error);
    }
}

// Carregar os erros de filmes ao carregar a página
window.onload = function() {
    loadErrosFilmes();
};
editButton.addEventListener('click', () => abrirModalEdicao(key, filme.video, filme.titulo, filme.logo)); 

