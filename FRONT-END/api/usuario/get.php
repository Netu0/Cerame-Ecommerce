<?php
/**
 * Método para entregar uma lista de usuarios para o cliente
 *
 *Formato de entrega: JSON
 */


include_once "../enable-cors.php";
#include_once "../auth/validate-jwt.inc.php";

require_once "../db/connection.inc.php";
require_once('usuario.dao.php');



$usuarioDAO = new usuarioDAO($pdo);

if (@$_REQUEST['id']) { // Retornar um único objeto pelo ID

    if ($res = $usuarioDAO->get($_REQUEST['id'])) {
        //include_once "../validate-admin-or-user.inc.php";
        validarUsuario($_REQUEST["id"]);

        $responseBody = json_encode($res);
    }
    else {
        http_response_code(404);
        $responseBody = '{ "message": "Usuário não existe" }';
    }
} else { // Retornar todos os objetos
    //include_once "../validate-admin.inc.php";

    $responseBody = json_encode(
        $usuarioDAO->getAll()
    );
}

header('Content-Type: application/json');
print_r($responseBody);

?>