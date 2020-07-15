<?php
require("../models/Persona/Dipendente.php");

use Firebase\JWT\JWT;

require "../vendor/autoload.php";

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");

$data = json_decode(file_get_contents("php://input"));

/*$pathArray = explode('/', $_SERVER['REQUEST_URI']);
$param = $pathArray[4];
if (isset($pathArray[5]))
    $id = $pathArray[5];*/

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $dipendente = new Dipendente();
    createDipendente($data, $dipendente);
    if ($dipendente->addDipendente())
        echo json_encode(array('status' => TRUE, 'message' => "Dipendente inserito"), true);
    else
        echo json_encode(array('status' => FALSE, 'message' => "Dipendente non inserito"), true);
} else
    http_response_code(400);

function createDipendente($data, $dipendente)
{
    $dipendente->nome = $data->nome;
    $dipendente->cognome = $data->cognome;
    $dipendente->username = $data->username;
    $dipendente->email = $data->email;
    $dipendente->password = $data->password;
    $dipendente->cellulare = $data->cellulare;
    $dipendente->idUnita = $data->idUnita;
}
