<?php
require_once __DIR__ . "/Database.php";
class Ristorante
{
    public $id_ristorante;
    public $nome;
    public $num_tavoli;
    public $idIndirizzo;
    protected $conn;

    public function __construct()
    {
        $this->conn = ((new Database())->getPDO());
    }

    public function getRistoranti()
    {
        try {
            $sql = "SELECT r.nome, p.nome as provincia, i.via, i.num_civico, 
            p.id_provincia, r.id_ristorante
            FROM ristoranti r 
            INNER JOIN indirizzo i on i.id_indirizzo = r.idIndirizzo
            INNER JOIN comune c on c.id_comune = i.idComune
            INNER JOIN provincia p on p.id_provincia = c.idProvincia";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $ristoranti = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($ristoranti);
        } catch (PDOException $e) {
            echo json_encode($e->getMessage());
        }
    }

    public function getRistoranteIndirizzo()
    {
        try {
            $sql = "SELECT r.nome, r.num_tavoli, 
            i.via, i.num_civico, i.cap, c.nome as comune, p.nome as provincia
            FROM ristoranti r 
            INNER JOIN indirizzo i on i.id_indirizzo = r.idIndirizzo
            INNER JOIN comune c on c.id_comune = i.idComune
            INNER JOIN provincia p on p.id_provincia = c.idProvincia
            WHERE r.id_ristorante = :id_ristorante";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindValue("id_ristorante", $this->id_ristorante);
            $stmt->execute();
            $ristorante = $stmt->fetchObject();
            echo json_encode($ristorante);
        } catch (PDOException $e) {
            echo json_encode($e->getMessage());
        }
    }
}
