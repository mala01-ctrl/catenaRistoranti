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
    createCliente($cliente, $data);
    if ($cliente->addClienteIndirizzo()) {
        $jwt = createJWT($cliente->username, $cliente->id_persona, "cliente");
        echo json_encode($jwt);
    } else
        echo json_encode(array('status' => FALSE, 'message' => "Cliente non inserito"), true);
} else
    http_response_code(400);

function createCliente($cliente, $data)
{
    $cliente->nome = $data->nome;
    $cliente->cognome = $data->cognome;
    $cliente->username = $data->username;
    $cliente->email = $data->email;
    $cliente->password = $data->password;
    $cliente->cellulare = $data->cellulare;
    $cliente->indirizzo->via = $data->via;
    $cliente->indirizzo->cap = $data->cap;
    $cliente->indirizzo->num_civico = $data->num_civico;
    $cliente->indirizzo->idComune = $data->id_comune;
}
