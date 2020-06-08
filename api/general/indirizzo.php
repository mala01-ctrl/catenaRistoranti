<?php
require("../models/Indirizzi/Regione.php");
require("../models/Indirizzi/Provincia.php");
require("../models/Indirizzi/Comune.php");

@header('Content-Type: application/json');
@header('Access-Control-Allow-Origin: http://localhost:3000');

$pathArray = explode('/', $_SERVER['REQUEST_URI']);
$param = $pathArray[4]; //es. regione

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($param === "regione") {
        $r = new Regione();
        $r->getRegioni();
    } else if ($param === "provincia") {
        $p = new Provincia();
        $p->getProvince();
    } else if ($param === "comune") {
        $c = new Comune();
        $c->getComuni();
    }
}
