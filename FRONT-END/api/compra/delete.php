<?php

include_once "../enable-cors.php";
#include_once "../auth/validate-jwt.inc.php";
#include_once "../validate-admin-or-user.inc.php";

// Abrir a conexão
require_once('../db/connection.inc.php');
require_once('compra.dao.php');

// Insanciar o DAO
$compraDAO = new compraDAO($pdo);

$id = $_REQUEST['id'];

// Conteúdo de resposta para o cliente
$responseBody = '';

if (!$id) {
    http_response_code(400);
    $responseBody = '{ "message:" "ID não informado"}';
} else {
    $qtd = $compraDAO->delete($id);
    if ($qtd == 0) {
        $responseBody = '{ "message": "ID não existe"}';
    }
}

// Inserir o usuário no banco de dados
$compra = $compraDAO->delete($id);
$responseBody = json_encode($compra); // Transformar em compra JSON

// Gerar a resposta para o cliente
header("Content-type: application/json");
print_r($responseBody);

?>