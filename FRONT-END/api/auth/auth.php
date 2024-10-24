<?php

include_once ("../enable-cors.php");
require_once("../db/connection.inc.php");
require_once("../usuario/usuario.dao.php");
require_once("lib/jwtutil.inc.php");
require_once("config.php");

$usuarioDAO = new usuarioDAO($pdo);

// Obter o conteúdo do corpo da requisição
$json = file_get_contents('php://input');

// Transforma o JSON em um Objeto PHP
$credentials = json_decode($json);
//print_r($credentials);

$responseBody = ''; // Variável para armazenar a resposta para o cliente

// Busca um usuário no banco de dados a partir do USERNAME e PASSWORD passados por JSON.
$usuario = $usuarioDAO->getByEmailAndSenha(@$credentials->username, @$credentials->password);
//print_r($usuario);

/**
 * Se o usuário for válido, então gera o token.
 */
if ($usuario) {
    // Array de dados para ser carregado no token (aceita qualquer atributo e valor).
    $payload = [
        "id" => $usuario->id,
        "nome" => $usuario->nome,
        "email" => $usuario->email,
        "adm" => $usuario->adm
    ];

    // Gerar o token (codificar), usando a classe disponível no arquivo "jwtutil.class.php"
    $token = JwtUtil::encode($payload, JWT_SECRET_KEY);
    
    $objetoResposta = (object) [];
    $objetoResposta->token = $token;
    $objetoResposta->usuario = $usuario;

    // Gerando a mensagem de resposta para o cliente: um JSON contendo o token.
    $responseBody = json_encode($objetoResposta);
}
/*
 * Caso o usuário e senha sejam inválidos, então uma mensagem 
 * de não autorizado será gerada.
 */ else {
    // Muda o código de resposta HTTP para 'Unauthorized'
    http_response_code(401);
    // Mensagem JSON informando que a credencial é inválida
    $responseBody = '{ "message": "Credencial inválida" }';
}
-

// Defique que o conteúdo da resposta será um JSON (application/JSON)
header('Content-Type: application/json');

// Exibe a resposta

print_r($responseBody);
