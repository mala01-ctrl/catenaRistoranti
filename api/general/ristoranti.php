<?php
require("../models/Ristorante.php");

@header('Content-Type: application/json');
@header('Access-Control-Allow-Origin: http://localhost:3000');

$pathArray = explode('/', $_SERVER['REQUEST_URI']);
$param = $pathArray[4];
if (isset($pathArray[5]))
    $id = $pathArray[5];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $r = new Ristorante();
    if ($param === "ristoranti" && isset($id)) {
        $r->id_ristorante = $id;
        $r->getRistoranteIndirizzo();
    } else if ($param === "ristoranti")
        $r->getRistoranti();
}
