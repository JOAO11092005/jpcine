// mais-assistido.js

// Função para mostrar o filme mais assistido
function mostrarFilmeMaisAssistido() {
    const filmeContainer = document.querySelector('.filmes'); // Seleciona a div onde o filme será exibido
  
    // Dados do filme mais assistido
    const filme = {
      titulo: "Oppenheimer",
      descricao: "Um épico sobre a criação da bomba atômica e os dilemas morais enfrentados por J. Robert Oppenheimer e sua equipe.",
      logo: "https://link-da-imagem-do-filme.com/logo-oppenheimer.jpg", // Substitua com o link da imagem
      video: "https://link-do-video-do-filme.com/video-oppenheimer.mp4", // Substitua com o link do vídeo
    };
  
    // Criando a estrutura HTML do filme
    const filmeHTML = `
      <div class="filme-item">
        <h3>${filme.titulo}</h3>
        <p>${filme.descricao}</p>
        <a href="${filme.video}" target="_blank">Assistir Agora</a>
      </div>
    `;
  
    // Inserindo o conteúdo HTML no container
    filmeContainer.innerHTML = filmeHTML;
  }
  
  // Chama a função para mostrar o filme mais assistido
  mostrarFilmeMaisAssistido();
  