<?php
    require_once __DIR__ . "/Database.php";
    class Feedback{
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

        public function addFeedback(){
            try{
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
                return $stmt->execute($data);
            }catch(PDOException $e){
                echo json_encode($e->getMessage());
            }
        }
    }
