<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Player de Vídeo</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <h1>Player de Vídeo</h1>
    
    <div class="video-container">
        <video id="videoPlayer" controls width="600">
            <!-- A URL do vídeo é fornecida através do proxy.php -->
            <source src="proxy.php?url=http://s3-server.net:80/movie/876056/Pb9SYJ/20207.mp4" type="video/mp4">
            Seu navegador não suporta a reprodução de vídeo.
        </video>
    </div>
    
</body>
</html>
