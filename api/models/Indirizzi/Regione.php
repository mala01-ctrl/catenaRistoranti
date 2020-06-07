<?php
require_once __DIR__ . "/../Database.php";
class Regione
{
    public $id_regione;
    public $nome;
    protected $conn;

    public function __construct()
    {
        $this->conn = ((new Database())->getPDO());
    }

    public function getRegioni()
    {
        try {
            $sql = "SELECT * FROM regione r";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            //Parsing risultati della query nella variabile $province
            $regioni = $stmt->fetchAll(PDO::FETCH_ASSOC);
            //Restituzione in formato json della var $regioni
            echo json_encode($regioni);
        } catch (PDOException $e) {
            echo json_encode($e->getMessage());
        }
    }
}
