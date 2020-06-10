<?php
require_once __DIR__ . "/Database.php";
class Feedback
{
    public $id_feedback;
    public $commento;
    public $numeroStelle;
    public $num_like;
    public $idCliente;
    public $idRistorante;
    public $dataCreazione;
    public $dataVisita;
    public $titolo;
    protected $conn;

    public function __construct()
    {
        $this->conn = ((new Database())->getPDO());
    }

    public function addFeedback()
    {
        try {
            $sql = "INSERT INTO feedback(commento, numeroStelle, num_like, idCliente,
                idRistorante, dataCreazione, dataVisita, titolo)
                VALUES (:commento, :numeroStelle, :num_like, :idCliente, :idRistorante, 
                :dataCreazione, :dataVisita, :titolo)";
            $stmt = $this->conn->prepare($sql);
            $data = [
                'commento' => $this->commento,
                'numeroStelle' => $this->numeroStelle,
                'num_like' => 0,
                'idCliente' => $this->idCliente,
                'idRistorante' => $this->idRistorante,
                'dataCreazione' => date("Y/m/d"),
                'dataVisita' => $this->dataVisita,
                'titolo' => $this->titolo
            ];
            $stmt->execute($data);
            $this->id_feedback = $this->conn->lastInsertId();
        } catch (PDOException $e) {
            echo json_encode($e->getMessage());
        }
    }

    public function getFeedbackByIdClient()
    {
        try {
            $sql = "SELECT * from feedback 
                WHERE idCliente = :idCliente AND idRistorante = :idRistorante";
            $stmt = $this->conn->prepare($sql);
            $data = [
                'idCliente' => $this->idCliente,
                'idRistorante' => $this->idRistorante
            ];
            $stmt->execute($data);
            $feedback = $stmt->fetchObject();
            echo json_encode($feedback);
        } catch (PDOException $e) {
            echo json_encode($e->getMessage());
        }
    }

    public function getAllFeedbackById()
    {
        try {
            $sql = "SELECT f.*, p.username FROM feedback f
            INNER JOIN cliente c on c.id_cliente = f.idCliente
            INNER JOIN persona p on p.id_persona = c.id_cliente
            WHERE f.idRistorante = :idRistorante";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindValue("idRistorante", $this->idRistorante);
            $stmt->execute();
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        } catch (PDOException $e) {
            echo json_encode($e->getMessage());
        }
    }
}
