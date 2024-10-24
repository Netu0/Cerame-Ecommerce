<?php

/**
 * Chamou o validate jwt, printou o usuário autenticado e checa se o usuário é adm
 */

// Abrir a conexão


include_once "../enable-cors.php";
#include_once "../auth/validate-jwt.inc.php";
#include("../validate-admin.inc.php");

require_once "../db/connection.inc.php";
require_once('categoria.dao.php');

// Insanciar o DAO
$categoriaDAO = new categoriaDAO($pdo);

// Receber os dados do cliente
$json = file_get_contents('php://input');

// Criar um objeto apartir do JSON
$categoria = json_decode($json);

// Conteúdo de resposta para o cliente
$responseBody = '';

// Inserir o usuário no banco de dados
$categoria = $categoriaDAO->insert($categoria);
$responseBody = json_encode($categoria); // Transformar em categoria JSON

// Gerar a resposta para o cliente
header("Content-type: application/json");
print_r($responseBody);

?>