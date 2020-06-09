<?php
require("../models/Feedback.php");

use Firebase\JWT;


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
    $feedback = new Feedback();
    createFeedback($feedback, $data);
    if ($feedback->addFeedback())
        echo json_encode(array('status' => TRUE, 'message' => "FeedBack inserito"), true);
    else
        echo json_encode(array('status' => FALSE, 'message' => "FeedBack non inserito"), true);
} else
    http_response_code(400);

function createFeedback($feedback, $data)
{
    $feedback->commento = $data->commento;
    $feedback->numeroStelle = $data->numeroStelle;
    $feedback->idCliente = $data->idCliente;
    $feedback->idRistorante = $data->idRistorante;
    $feedback->dataVisita = $data->dataVisita;
    $feedback->titolo = $data->titolo;
}
