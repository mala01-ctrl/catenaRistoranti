<?php
require_once __DIR__ . "/../Database.php";
class Indirizzo
{
    public $id_indirizzo;
    public $via;
    public $num_civico;
    public $cap;
    public $residenza;
    public $idComune;
    protected $conn;

    public function __construct()
    {
        $this->conn = ((new Database())->getPDO());
    }

    public function addIndirizzo()
    {
        try {
            $sql = "INSERT INTO indirizzo(via, num_civico, 
                cap, residenza, idComune)
                VALUES (:via, :num_civico, :cap, :residenza, :idComune)";
            $stmt = $this->conn->prepare($sql);
            $data = [
                "via" => $this->via,
                "num_civico" => $this->num_civico,
                "cap" => $this->cap,
                "residenza" => 0,
                "idComune" => $this->idComune
            ];
            $esito = $stmt->execute($data);
            $this->id_indirizzo = $this->conn->lastInsertId();
            return $esito;
        } catch (PDOException $e) {
            echo json_encode($e->getMessage());
        }
    }
}
