<?php
// Verifica se a URL do vídeo foi fornecida como um parâmetro GET
if (!isset($_GET['url'])) {
    http_response_code(400);
    echo "URL do vídeo não especificada.";
    exit;
}

// Obtém a URL do vídeo
$url = $_GET['url'];

// Validação básica para permitir apenas domínios autorizados
$allowed_domains = ["s3-server.net"];
$parsed_url = parse_url($url);
if (!in_array($parsed_url['host'], $allowed_domains)) {
    http_response_code(403);
    echo "Acesso negado.";
    exit;
}

// Inicializa uma sessão cURL para fazer a requisição ao servidor do vídeo
$ch = curl_init($url);

// Configurações para cURL seguir redirecionamentos e retornar dados
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

// Define headers para simular uma requisição de navegador
$headers = [
    "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36"
];
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

// Executa a requisição e armazena o conteúdo do vídeo
$data = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$content_type = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);

// Verifica se a requisição foi bem-sucedida
if ($http_code !== 200) {
    http_response_code($http_code);
    echo "Erro ao obter o vídeo.";
    curl_close($ch);
    exit;
}

// Define headers para repassar o conteúdo de vídeo ao cliente
header("Content-Type: $content_type");
header("Content-Length: " . strlen($data));
header("Content-Disposition: inline");

// Envia o conteúdo do vídeo para o navegador
echo $data;
curl_close($ch);
