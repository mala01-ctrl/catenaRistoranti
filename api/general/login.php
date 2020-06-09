<?php
require("../models/Persona/Cliente.php");
require_once __DIR__ . '/../lib/jwtCreator.php';
require "../vendor/autoload.php";


@header('Content-Type: application/json');
@header('Access-Control-Allow-Origin: *');
@header("Access-Control-Allow-Headers: *");
@header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTION')
    return;
$data = json_decode(file_get_contents("php://input"));
if (!isset($data)) {
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $cliente = new Cliente();
    $cliente->username = $data->username;
    $cliente->password = $data->password;
    if ($cliente->login()) {
        $jwt = createJWT($cliente->username, $cliente->id_persona, "cliente");
        echo json_encode($jwt);
    } else
        echo json_encode(array('status' => FALSE, 'message' => "Credenziali errate"), true);
} else
    http_response_code(400);
