const ytdl = require('ytdl-core');

const videoUrl = 'https://youtu.be/p6aD2iNFZuc';  // Substitua pelo link do vídeo

ytdl.getInfo(videoUrl)
  .then(info => {
    console.log('Título do vídeo:', info.videoDetails.title);
    const formats = info.formats.filter(format => format.hasAudio && format.hasVideo);
    console.log('Escolha uma qualidade disponível:');
    formats.forEach((format, index) => {
      console.log(`${index + 1}. Resolução: ${format.height}p, Codec de Áudio: ${format.audioCodec}, Codec de Vídeo: ${format.videoCodec}`);
    });
  })
  .catch(error => {
    console.error('Erro ao obter informações do vídeo:', error);
  });
