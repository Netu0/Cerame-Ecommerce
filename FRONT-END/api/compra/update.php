<?php

include_once "../enable-cors.php";
#include_once "../auth/validate-jwt.inc.php";
#include_once "../validate-admin-or-user.inc.php";


require_once "../db/connection.inc.php";
require_once "compra.dao.php";


// Insanciar o DAO
$compraDAO = new compraDAO($pdo);

// Conteúdo de resposta para o cliente
$responseBody = '';

//obtendo o parâmetro id vindo pela URP da requisição
$id = $_REQUEST["id"];

if (!$id) {
    $respondeBody = '{"message": "Usuário não informado"}';
    http_response_code(404);
} else {
    // Receber os dados do cliente
    $json = file_get_contents('php://input');

    // Criar um objeto apartir do JSON
    $compra = json_decode($json);

    // Inserir o usuário no banco de dados
    $compra = $compraDAO->update($id, $compra);
    $responseBody = json_encode($compra); // Transformar em compra JSON
}

// Gerar a resposta para o cliente
header("Content-type: application/json");
print_r($responseBody);

?>