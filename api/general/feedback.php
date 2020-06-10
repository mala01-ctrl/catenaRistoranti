<?php
require("../models/Feedback.php");

use Firebase\JWT\JWT;

require "../vendor/autoload.php";


header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");

$data = json_decode(file_get_contents("php://input"));

$pathArray = explode('/', $_SERVER['REQUEST_URI']);
$param = $pathArray[4];
if (isset($pathArray[5]))
    $id = $pathArray[5];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $feedback = new Feedback();
    createFeedback($feedback, $data);
    $feedback->addFeedback();
    if ($feedback->id_feedback)
        echo json_encode(array('status' => TRUE, 'id' => $feedback->id_feedback), true);
    else
        echo json_encode(array('status' => FALSE, 'message' => "Feedback non inserito"), true);
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($param === "ristorante" && isset($id)) {
        getFeedbackClient($id);
    }
    if ($param === "feedback" && isset($id)) {
        $feedback = new Feedback();
        $feedback->idRistorante = $id;
        $feedback->getAllFeedbackById();
    }
}

function createFeedback($feedback, $data)
{
    $feedback->commento = $data->commento;
    $feedback->numeroStelle = $data->numeroStelle;
    $feedback->idCliente = $data->idCliente;
    $feedback->idRistorante = $data->idRistorante;
    $feedback->dataVisita = $data->dataVisita;
    $feedback->titolo = $data->titolo;
}

function getFeedbackClient($id)
{
    $headers = apache_request_headers();
    $jwtSettings = file_get_contents(__DIR__ . '/../credentials/jwt-settings.json');
    $jwtSettings = json_decode($jwtSettings);

    if (isset($headers['Authorization'])) {
        $authHeader = $headers['Authorization'];
        $arr = explode(" ", $authHeader);
        $jwt = $arr[1];
        if ($jwt) {
            try {
                $decoded = JWT::decode($jwt, $jwtSettings->secretKey, array('HS256'));
                $feedback = new Feedback();
                $feedback->idCliente = $decoded->data->id_cliente;
                $feedback->idRistorante = $id;
                $feedback->getFeedbackByIdClient();
            } catch (Exception $e) {
                http_response_code(401);
                echo json_encode(array(
                    "message" => "Access denied.",
                    "error" => $e->getMessage()
                ));
            }
        }
    } else {
        header("HTTP/1.1 400 Bad Request");
    }
}
