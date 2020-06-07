<?php
require_once __DIR__ . "/../Database.php";
class Provincia
{
    public $id_provincia;
    public $nome;
    public $idRegione;
    protected $conn;

    public function __construct()
    {
        $this->conn = ((new Database())->getPDO());
    }

    public function getProvince()
    {
        try {
            $sql = "SELECT * FROM provincia p";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            //Parsing risultati della query nella variabile $province
            $province = $stmt->fetchAll(PDO::FETCH_ASSOC);
            //Restituzione in formato json della var $province
            echo json_encode($province);
        } catch (PDOException $e) {
            echo json_encode($e->getMessage());
        }
    }
}
