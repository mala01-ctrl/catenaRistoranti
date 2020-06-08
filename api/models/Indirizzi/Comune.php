<?php
require_once __DIR__ . "/../Database.php";
class Comune
{
    public $id_comune;
    public $nome;
    public $idProvincia;
    protected $conn;

    public function __construct()
    {
        $this->conn = ((new Database())->getPDO());
    }

    public function getComuni()
    {
        try {
            $sql = "SELECT * FROM comune";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $comuni = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($comuni);
        } catch (PDOException $e) {
            echo json_encode($e->getMessage());
        }
    }
}
